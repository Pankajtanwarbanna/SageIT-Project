/*
    API written by - Pankaj Tanwar
*/
let auth = require('../auth/authPermission');
var User = require('../models/user');
var Course = require('../models/course');
var Workshop = require('../models/workshop');
var Workstation = require('../models/workstation');
var CourseRequest = require('../models/courseRequest');
var Department = require('../models/department');
var Project = require('../models/project');
var Notice = require('../models/notice');
var Attendance = require('../models/attendance');
var Asset = require('../models/asset');
var jwt = require('jsonwebtoken');
var secret = 'pankaj';
var nodemailer = require('nodemailer');
let multer = require('multer');
var mongoose = require('mongoose');

var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + '/public/assets/uploads/')
    },
    filename: function (req, file, cb) {

        if(!file.originalname.match(/\.(jpeg|png|jpg|JPG)$/)) {
            let err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null,Date.now() + '_' + file.originalname.replace(/ /g,'')) // replace - to remove all white spaces
        }
    }
});

var fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + '/public/assets/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '_' + file.originalname.replace(/ /g,'')) // replace - to remove all white spaces
    }
});

var upload = multer({
    storage: imageStorage,
    limits : { fileSize : 100000000000000 }
}).single('thumbnail');

var fileUpload = multer({
    storage: fileStorage,
    limits : { fileSize : 100000000000000 }
}).single('myfile');


module.exports = function (router){

    // Nodemailer stuff
    var client = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'tejamarella.33jj@gmail.com',
            pass: 'Saiteja1!'
        }
    });

    // Upload Profile Picture
    router.post('/uploadImage', function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                if(err.code === 'LIMIT_FILE_SIZE') {
                    res.json({
                        success : false,
                        message : 'File is too large.'
                    })
                } else if(err.code === 'filetype') {
                    res.json({
                        success : false,
                        message : 'File type invalid.'
                    })
                } else {
                    console.log(err);
                    res.json({
                        success : false,
                        message : 'File was not able to be uploaded'
                    })
                }
            } else {

                if(!req.file) {
                    res.json({
                        success: false,
                        message: 'File missing.'
                    })
                } else {
                    console.log(req.file);
                    res.json({
                        success : true,
                        message : 'File Uploaded successfully.',
                        filename : req.file.filename
                    })
                }
            }
        })
    });

    // Upload Profile Picture
    router.post('/upload', function (req, res) {
        fileUpload(req, res, function (err) {
            if (err) {
                if(err.code === 'LIMIT_FILE_SIZE') {
                    res.json({
                        success : false,
                        message : 'File is too large.'
                    })
                } else if(err.code === 'filetype') {
                    res.json({
                        success : false,
                        message : 'File type invalid.'
                    })
                } else {
                    console.log(err);
                    res.json({
                        success : false,
                        message : 'File was not able to be uploaded'
                    })
                }
            } else {

                if(!req.file) {
                    res.json({
                        success: false,
                        message: 'File missing.'
                    })
                } else {
                    console.log(req.file);
                    res.json({
                        success : true,
                        message : 'File Uploaded successfully.',
                        filename : req.file.filename
                    })
                }
            }
        })
    });

    // User login API
    router.post('/authenticate', function (req,res) {

        if(!req.body.username || !req.body.password) {
            res.json({
                success : false,
                message : 'Ensure you fill all the entries.'
            });
        } else {

            User.findOne({ username : req.body.username }).select('email username password active').exec(function (err, user) {

                if(err) throw err;

                if(!user) {
                    res.json({
                        success : false,
                        message : 'User not found. Please Signup!'
                    });
                } else if(user) {

                    if(!user.active) {
                        res.json({
                            success : false,
                            message : 'Account is not activated yet.Please check your email for activation link.',
                            expired : true
                        });
                    } else {

                        var validPassword = user.comparePassword(req.body.password);

                        if (validPassword) {
                            var token = jwt.sign({
                                email: user.email,
                                username: user.username
                            }, secret, {expiresIn: '24h'});
                            res.json({
                                success: true,
                                message: 'User authenticated.',
                                token: token
                            });
                        } else {
                            res.json({
                                success: false,
                                message: 'Incorrect password. Please try again.'
                            });
                        }
                    }
                }
            });
        }

    });

    router.put('/activate/:token', function (req,res) {

        if(!req.params.token) {
            res.json({
                success : false,
                message : 'No token provided.'
            });
        } else {

            User.findOne({temporarytoken: req.params.token}, function (err, user) {
                if (err) throw err;

                var token = req.params.token;

                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Activation link has been expired.'
                        })
                    }
                    else if (!user) {
                        res.json({
                            success: false,
                            message: 'Activation link has been expired.'
                        });
                    } else {

                        user.temporarytoken = false;
                        user.active = true;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {

                                var email = {
                                    from: 'Sage IT Registration, support@sageit.com',
                                    to: user.email,
                                    subject: 'Activation activated',
                                    text: 'Hello ' + user.name + 'Your account has been activated.Thank you Pankaj Tanwar CEO, Sage IT',
                                    html: 'Hello <strong>' + user.name + '</strong>,<br><br> Your account has been activated.<br><br>Thank you<br>Pankaj Tanwar<br>CEO, Sage IT'
                                };

                                client.sendMail(email, function (err, info) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log('Message sent: ' + info.response);
                                    }
                                });

                                res.json({
                                    success: true,
                                    message: 'Account activated.'
                                })

                            }
                        });
                    }
                });
            })
        }
    });

    // Resend activation link
    router.post('/resend', function (req,res) {

        if(!req.body.username || !req.body.password) {
            res.json({
                success : false,
                message : 'Ensure you fill all the entries.'
            });
        } else {

            User.findOne({ username : req.body.username }).select('name username email password active temporarytoken').exec(function (err,user) {

                if(!user) {
                    res.json({
                        success : false,
                        message : 'User is not registered with us.Please signup!'
                    });
                } else {
                    if(user.active) {
                        res.json({
                            success : false,
                            message : 'Account is already activated.'
                        });
                    } else {

                        var validPassword = user.comparePassword(req.body.password);

                        if(!validPassword) {
                            res.json({
                                success : false,
                                message : 'Incorrect password.'
                            });
                        } else {
                            res.json({
                                success : true,
                                user : user
                            });

                        }
                    }
                }
            })
        }
    });

    // router to update temporary token in the database
    router.put('/sendlink', function (req,res) {

        User.findOne({username : req.body.username}).select('email username name temporarytoken').exec(function (err,user) {
            if (err) throw err;

            user.temporarytoken = jwt.sign({
                email: user.email,
                username: user.username
            }, secret, {expiresIn: '24h'});

            user.save(function (err) {
                if(err) {
                    console.log(err);
                } else {

                    var email = {
                        from: 'Sage IT Registration, support@sageit.com',
                        to: user.email,
                        subject: 'Activation Link request - Sage IT Registration',
                        text: 'Hello '+ user.name + 'You requested for the new activation link.Please find the below activation link Activation link Thank you Pankaj Tanwar CEO, Sage IT',
                        html: 'Hello <strong>'+ user.name + '</strong>,<br><br>You requested for the new activation link.Please find the below activation link<br><br><a href="http://localhost:3500/activate/'+ user.temporarytoken+'">Activation link</a><br><br>Thank you<br>Pankaj Tanwar<br>CEO, Sage IT'
                    };

                    client.sendMail(email, function(err, info){
                        if (err ){
                            console.log(err);
                        }
                        else {
                            console.log('Message sent: ' + info.response);
                        }
                    });

                    res.json({
                        success : true,
                        message : 'Link has been successfully sent to registered email.'
                    });

                }
            })
        });


    });

    // Forgot username route
    router.post('/forgotUsername', function (req,res) {

        if(!req.body.email) {
            res.json({
                success : false,
                message : 'Please ensure you fill all the entries.'
            });
        } else {
            User.findOne({email : req.body.email}).select('username email name').exec(function (err,user) {
                if(err) throw err;

                if(!user) {
                    res.json({
                        success : false,
                        message : 'Email is not registered with us.'
                    });
                } else if(user) {

                    var email = {
                        from: 'Sage IT, support@sageit.com',
                        to: user.email,
                        subject: 'Forgot Username Request',
                        text: 'Hello '+ user.name + 'You requested for your username.You username is ' + user.username + 'Thank you Pankaj Tanwar CEO, Sage IT',
                        html: 'Hello <strong>'+ user.name + '</strong>,<br><br>You requested for your username.You username is <strong>'+ user.username + '</strong><br><br>Thank you<br>Pankaj Tanwar<br>CEO, Sage IT'
                    };

                    client.sendMail(email, function(err, info){
                        if (err ){
                            console.log(err);
                        }
                        else {
                            console.log('Message sent: ' + info.response);
                        }
                    });

                    res.json({
                        success : true,
                        message : 'Username has been successfully sent to your email.'
                    });
                } else {
                    res.send(user);
                }

            });
        }

    });

    // Send link to email id for reset password
    router.put('/forgotPasswordLink', function (req,res) {

        if(!req.body.username) {
            res.json({
                success : false,
                message : 'Please ensure you filled the entries.'
            });
        } else {

            User.findOne({ username : req.body.username }).select('username email temporarytoken name').exec(function (err,user) {
                if(err) throw err;

                if(!user) {
                    res.json({
                        success : false,
                        message : 'Username not found.'
                    });
                } else {

                    console.log(user.temporarytoken);

                    user.temporarytoken = jwt.sign({
                        email: user.email,
                        username: user.username
                    }, secret, {expiresIn: '24h'});

                    console.log(user.temporarytoken);

                    user.save(function (err) {
                        if(err) {
                            res.json({
                                success : false,
                                message : 'Error accured! Please try again. '
                            })
                        } else {

                            var email = {
                                from: 'Sage IT Registration, support@sageit.com',
                                to: user.email,
                                subject: 'Forgot Password Request',
                                text: 'Hello '+ user.name + 'You request for the forgot password.Please find the below link Reset password Thank you Pankaj Tanwar CEO, Sage IT',
                                html: 'Hello <strong>'+ user.name + '</strong>,<br><br>You requested for the forgot password. Please find the below link<br><br><a href="http://localhost:3500/forgotPassword/'+ user.temporarytoken+'">Reset password</a><br><br>Thank you<br>Pankaj Tanwar<br>CEO, Sage IT'
                            };

                            client.sendMail(email, function(err, info){
                                if (err ){
                                    console.log(err);
                                }
                                else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });

                            res.json({
                                success : true,
                                message : 'Link to reset your password has been sent to your registered email.'
                            });

                        }
                    });

                }

            })

        }
    });

    // router to change password
    router.post('/forgotPassword/:token', function (req,res) {

        if(!req.params.token) {
            res.json({
                success : false,
                message : 'No token provied.'
            });
        } else {

            User.findOne({ temporarytoken : req.params.token }).select('username temporarytoken').exec(function (err,user) {

                if(err) throw err;

                if(!user) {
                    res.json({
                        success : false,
                        message : 'Link has been expired.'
                    });
                } else {
                    res.json({
                        success : true,
                        user : user
                    });
                }
            });
        }
    });

    // route to reset password
    router.put('/resetPassword/:token', function (req,res) {


        if(!req.body.password) {
            res.json({
                success : false,
                message : 'New password is missing.'
            })
        } else {

            User.findOne({ temporarytoken : req.params.token }).select('name password').exec(function (err,user) {

                if(err) throw err;

                if(!user) {
                    res.json({
                        success : false,
                        message : 'Link has been expired.'
                    })
                } else {

                    user.password = req.body.password;
                    user.temporarytoken = false;

                    user.save(function (err) {
                        if(err) {
                            res.json({
                                success : false,
                                message : 'Password must have one lowercase, one uppercase, one special character, one number and minimum 8 and maximum 25 character.'
                            });
                        } else {

                            var email = {
                                from: 'Sage IT, support@sageit.com',
                                to: user.email,
                                subject: 'Password reset',
                                text: 'Hello '+ user.name + 'You request for the reset password.Your password has been reset. Thank you Pankaj Tanwar CEO, Sage IT',
                                html: 'Hello <strong>'+ user.name + '</strong>,<br><br>You requested for the reset password. Your password has been reset.<br><br>Thank you<br>Pankaj Tanwar<br>CEO, Sage IT'
                            };

                            client.sendMail(email, function(err, info){
                                if (err ){
                                    console.log(err);
                                }
                                else {
                                    console.log('Message sent: ' + info.response);
                                }
                            });

                            res.json({
                                success : true,
                                message : 'Password has been changed successfully.'
                            })

                        }
                    })
                }
            })
        }
    });

    // Middleware to verify token
    router.use(function (req,res,next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token) {
            // verify token
            jwt.verify(token, secret, function (err,decoded) {
                if (err) {
                    res.json({
                        success : false,
                        message : 'Token invalid.'
                    })
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            res.json({
                success : false,
                message : 'No token provided.'
            });
        }
    });

    // API User profile
    router.post('/me', function (req,res) {

        //console.log(req.decoded.email);
        // getting profile of user from database using email, saved in the token in localStorage
        User.findOne({ email : req.decoded.email }).select('_id email username name address contact_no alternate_contact_no position branch department dob address profile_url').exec(function (err, user) {
            if(err) throw err;

            if(!user) {
                res.status(500).send('User not found.');
            } else {
                res.send(user);
            }
        });
    });

    // get permission of user
    router.get('/permission', function (req,res) {

        User.findOne({ username : req.decoded.username }).select('permission').exec(function (err,user) {

            if(err) throw err;

            if(!user) {
                res.json({
                    success : false,
                    message : 'User not found.'
                })
            } else {
                res.json({
                    success : true,
                    permission : user.permission
                })
            }
        })
    });

    // get all users
    router.get('/management', function (req, res) {

        User.find({}, function (err, users) {

            if(err) throw err;
            User.findOne({ username : req.decoded.username }, function (err,mainUser) {

                if(err) throw err;
                if(!mainUser) {
                    res.json({
                        success : false,
                        message : 'User not found.'
                    });
                } else {
                    if(!users) {
                        res.json({
                            success : false,
                            message : 'Users not found.'
                        });
                    } else {
                        res.json({
                            success : true,
                            users : users,
                            permission : mainUser.permission
                        })
                    }
                }
            })
        })
    });

    // get user courses
    router.get('/getCourses',auth.ensureUser, function (req, res) {
        User.findOne({ email : req.decoded.email }).select('department').lean().exec(function (err, user) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                Course.find({ department : user.department }, function (err, courses) {
                    if(err) {
                        res.json({
                            success : false,
                            message : 'Something went wrong!'
                        })
                    } else {
                        res.json({
                            success : true,
                            courses : courses
                        })
                    }
                })
            }
        })
    });

    // get upcoming workshops
    router.get('/getUpcomingWorkshops', function (req, res) {
        User.findOne({ email : req.decoded.email }).select('department').lean().exec(function (err, user) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                Workshop.find({ department : user.department , time_date : { $gt : new Date() } }, function (err, workshops) {
                    if(err) {
                        res.json({
                            success : false,
                            message : 'Something went wrong!'
                        })
                    } else {
                        res.json({
                            success : true,
                            workshops : workshops
                        })
                    }
                })
            }
        })
    });

    // get course details
    router.get('/getCourseDetails/:courseID', auth.ensureUser, function (req, res) {
        Course.findOne({ _id : req.params.courseID }, function (err, course) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                res.json({
                    success : true,
                    course : course
                })
            }
        })
    });

    // save my work
    router.post('/saveMyWork', auth.ensureUser, function (req, res) {

        let workstation = new Workstation();

        workstation.work = req.body.work;
        workstation.user_email = req.decoded.email;
        if(req.body.work_url) {
            workstation.work_url = req.body.work_url;
        }
        workstation.timestamp = new Date();

        workstation.save(function (err) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong'
                })
            } else {
                res.json({
                    success : true,
                    message : 'Your work saved.'
                })
            }
        })
    });

    // save my work
    router.get('/getMyWork', auth.ensureUser, function (req, res) {

        Workstation.find({ user_email : req.decoded.email }, function (err, work) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                res.json({
                    success : true,
                    work : work
                });
            }
        })
    });

    // post course request
    router.post('/postNewCourseRequest', auth.ensureUser, function (req, res) {
        let courseRequest = new CourseRequest();

        courseRequest.course = req.body.course;
        courseRequest.username = req.decoded.username;
        courseRequest.department = req.body.department;
        courseRequest.description = req.body.description;
        courseRequest.preferred_format = req.body.preferred_format;
        courseRequest.timestamp = new Date();

        courseRequest.save(function (err) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                res.json({
                    success : true,
                    message : 'Course Request successfully posted.'
                })
            }
        })
    });

    // update user details
    router.post('/updateProfile', function (req, res) {
        console.log(req.body);
        User.findByIdAndUpdate({ _id : req.body.userID }, req.body, function (err) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Following changes can not be made!'
                })
            } else {
                res.json({
                    success : true,
                    message : 'Profile successfully updated.'
                })
            }
        })
    });

    // update profile picture
    router.post('/updateProfilePictureURL', function (req, res) {
        if(!req.decoded.username) {
            res.json({
                success : false,
                message : 'Please login.'
            })
        } else {
            User.findOne({ username : req.decoded.username }).select('profile_url').exec(function (err, user) {
                if(err) {
                    res.json({
                        success : false,
                        message : 'Something went wrong!'
                    })
                } else {
                    user.profile_url = req.body.filename;

                    user.save(function (err) {
                        if(err) {
                            res.json({
                                success : false,
                                message : 'Something went wrong!'
                            })
                        } else {
                            res.json({
                                success : true,
                                message : 'Profile picture successfully updated. Please Refresh to view changed.'
                            })
                        }
                    })
                }
            })
        }
    });

    // get all assets
    router.get('/getProject/:projectID', function (req, res) {
        console.log(req.params.projectID);
        Project.aggregate([
            {   $match : {
                    _id : mongoose.Types.ObjectId(req.params.projectID)
                }
            },
            { $lookup : {
                    from : "departments",
                    localField : "department_id",
                    foreignField : "_id",
                    as : "department_info"
                }
            },
            { $lookup : {
                    from : "users",
                    localField : "members",
                    foreignField : "email",
                    as : "users_info"
                }
            },
            { $lookup : {
                    from : "users",
                    localField : "created_by",
                    foreignField : "email",
                    as : "author"
                }
            },
            { $lookup : {
                    from : "users",
                    localField : "chat.user_email",
                    foreignField : "email",
                    as : "chat_info"
                }
            }
        ]).exec(function (err, project) {
            if(err) {
                console.log(err);
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {

                res.json({
                    success : true,
                    project : project
                })
            }
        })
    });

    // add comment
    router.post('/addComment', function (req, res) {
        Project.findOne({ _id : req.body.projectID }).select('chat').exec(function (err, project) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!project) {
                    res.json({
                        success : false,
                        message : 'Project not found.'
                    })
                } else {
                    let chat = {};

                    chat.message = req.body.message;
                    chat.user_email = req.decoded.email;
                    chat.timestamp = new Date();

                    project.chat.push(chat);

                    project.save(function (err) {
                        if(err) {
                            console.log(err);
                            res.json({
                                success : false,
                                message : 'Something went wrong!'
                            })
                        } else {
                            res.json({
                                success : true,
                                message : 'Message post.'
                            })
                        }
                    })
                }
            }
        })
    });

    // get user assets
    router.get('/getMyAssets', auth.ensureUser, function(req, res) {
        Asset.find({ employee_email: req.decoded.email }).select('item employee_email issue_date return_date status received_on').lean().exec(function (err, assets) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!assets) {
                    res.json({
                        success : false,
                        message : 'Assets not found.'
                    })
                } else {
                    res.json({
                        success : true,
                        assets : assets
                    })
                }
            }
        })
    });

    // get all projects
    router.get('/getMyProjects', auth.ensureUser, function (req, res) {
        Project.aggregate([
            {
                $match : {
                    "$expr":
                        {
                            "$in": [ req.decoded.email , "$members"]
                        }
                }
            },
            { $lookup : {
                    from : "departments",
                    localField : "department_id",
                    foreignField : "_id",
                    as : "department_info"
                }
            },
            { $lookup : {
                    from : "users",
                    localField : "members",
                    foreignField : "email",
                    as : "users_info"
                }
            },
            { $lookup : {
                    from : "users",
                    localField : "created_by",
                    foreignField : "email",
                    as : "author"
                }
            }
        ]).exec(function (err, projects) {
            if(err) {
                console.log(err);
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                res.json({
                    success : true,
                    projects : projects
                })
            }
        })
    });

    // get all projects
    router.get('/getMyNotices', auth.ensureUser, function (req, res) {

        User.findOne({ email : req.decoded.email }).select('department').lean().exec(function (err, user) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!user) {
                    res.json({
                        success : false,
                        message : 'User not found.'
                    })
                } else {
                    Department.findOne({ department : user.department }).lean().exec(function (err, department) {
                        if(err) {
                            res.json({
                                success : false,
                                message : 'Something went wrong!'
                            })
                        } else {
                            if(!department) {
                                res.json({
                                    success : false,
                                    message : 'Department not found.'
                                })
                            } else {
                                Notice.find({ department_id : department._id }).lean().exec(function (err, notices) {
                                    if(err) {
                                        console.log(err);
                                        res.json({
                                            success : false,
                                            message : 'Something went wrong!'
                                        })
                                    } else {
                                        res.json({
                                            success : true,
                                            notices : notices,
                                            department : department.department
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        });
    });

    //get all users attendance
    router.get('/getMyAttendances', function (req, res) {
        Attendance.find({ employee_email: req.decoded.email }).lean().exec(function (err, attendances) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!attendances) {
                    res.json({
                        success : false,
                        message : 'Attendance not found.'
                    })
                } else {
                    res.json({
                        success : true,
                        attendances : attendances
                    })
                }
            }
        })
    });

    return router;
};

