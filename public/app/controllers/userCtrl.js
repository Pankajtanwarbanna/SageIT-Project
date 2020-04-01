/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices','fileModelDirective','uploadFileService'])

.controller('regCtrl', function ($scope, $http, $timeout, $location,user,admin) {

    var app = this;

    // get all positions
    admin.getAllPositions().then(function (data) {
        if(data.data.success) {
            app.positions = data.data.positions;
        }
    });

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    this.regUser = function (regData) {

        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;

        user.create(app.regData).then(function (data) {

            //console.log(data);
            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message;
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
})

.controller('usersCtrl', function (user) {
    var app = this;

    user.getUsers().then(function (data) {

        if(data.data.success) {
            console.log(app.users);
            app.users = data.data.users;
        } else {
            app.errorMsg = data.data.message;
        }
    });
})

.controller('courseCtrl', function (user) {

    let app = this;

    user.getCourses().then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.courses = data.data.courses;
        }
    })
})

.controller('workshopCtrl', function (user) {

    var app = this;

    user.getUpcomingWorkshops().then(function (data) {
        if(data.data.success) {
            app.upcomingWorkshops = data.data.workshops;
        }
    })
})

.controller('coursePageCtrl', function (user,$routeParams, $sce) {
    var app = this;

    user.getCourseDetails($routeParams.courseID).then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.course = data.data.course;
            app.course.course_url = $sce.trustAsResourceUrl(app.course.course_url)
            app.course.course_file_url = $sce.trustAsResourceUrl(app.course.course_file_url)
        }
    })
})

.controller('workstationCtrl', function (user, $scope,uploadFile) {
    let app = this;

    function getMyWork() {
        user.getMyWork().then(function (data) {
            if(data.data.success) {
                app.work = data.data.work;
            }
        });
    }

    getMyWork();

    // save work space
    app.saveMyWork = function (workData) {

        if($scope.file) {
            uploadFile.upload($scope.file).then(function (data) {
                if(data.data.success) {
                    app.workData.work_url = data.data.filename;

                    user.saveMyWork(app.workData).then(function (data) {
                        if(data.data.success) {
                            app.workSavedSuccessMsg = data.data.message;
                            getMyWork();
                        } else {
                            app.workSavedErrorMsg = data.data.message;
                        }
                    })
                } else {
                    app.workSavedErrorMsg = data.data.message;
                }
            })
        } else {
            user.saveMyWork(app.workData).then(function (data) {
                if(data.data.success) {
                    app.workSavedSuccessMsg = data.data.message;
                    getMyWork();
                } else {
                    app.workSavedErrorMsg = data.data.message;
                }
            })
        }
    }
})

.controller('courseRequestCtrl', function (user, admin) {
    let app = this;

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    // add new course request
    app.postNewCourseRequest = function (courseRequestData) {
        user.postNewCourseRequest(app.courseRequestData).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.postNewCourseRequestSuccessMsg = data.data.message;
            } else {
                app.postNewCourseRequestErrorMsg = data.data.message;
            }
        });
    }
})

.controller('settingsCtrl', function (user, $timeout, $scope,uploadFile) {

    var app = this;

    app.profileData = {};

    // update profile
    app.updateProfile = function (mainData) {
        app.successMsg = '';
        app.errorMsg = '';
        if(mainData.contact_no === mainData.alternate_contact_no) {
            app.errorMsg = 'Both contact no can not be same!'
        } else {
            user.updateProfile(mainData).then(function (data) {
                if(data.data.success) {
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        app.successMsg = '';
                    }, 2000);
                } else {
                    app.errorMsg = data.data.message;
                }
            })
        }
    };

    // profile picture update
    app.updateProfilePicture = function () {
        uploadFile.uploadImage($scope.file).then(function (data) {
            if(data.data.success) {
                let profilePicObj = {};
                profilePicObj.filename = data.data.filename;
                user.updateProfilePictureURL(profilePicObj).then(function (data) {
                    console.log(data);
                    if(data.data.success) {
                        app.profilePictureUpdateSuccessMsg = data.data.message;
                    } else {
                        app.profilePictureUpdateErrorMsg = data.data.message;
                    }
                });
            }
        })
    }
})

.controller('projectCtrl', function ($routeParams,user, admin) {

    let app = this;

    // get today date
    app.currentDate = new Date();

    function getProject() {
        // get project
        user.getProject($routeParams.projectID).then(function (data) {
            if(data.data.success) {

                for(let i=0;i<data.data.project[0].chat.length;i++) {
                    for(let j=0;j<data.data.project[0].chat_info.length;j++) {
                        if(data.data.project[0].chat_info[j].email === data.data.project[0].chat[i].user_email) {
                            data.data.project[0].chat[i].name = data.data.project[0].chat_info[j].name;
                            data.data.project[0].chat[i].profile_url = data.data.project[0].chat_info[j].profile_url;
                            break;
                        }
                    }
                }

                app.projectData = data.data.project[0];
            } else {
                app.errorMsg = data.data.message;
            }
        });
    }

    getProject();

    // add comment
    app.addComment = function (commentData) {
        app.commentData.projectID = $routeParams.projectID;
        user.addComment(app.commentData).then(function (data) {
            if(data.data.success) {
                getProject();
                app.commentData = '';
            }
        })
    }

})

// assets controller
.controller('assetsCtrl', function (user) {

    let app = this;

    // get my assets
    user.getMyAssets().then(function (data) {
        console.log(data)
        if(data.data.success) {
            app.assets = data.data.assets;
        }
    })

})

// my projects controller
.controller('myProjectsCtrl', function (user) {

    let app = this;

    // get my project
    user.getMyProjects().then(function (data) {
        console.log(data.data.projects)
        if(data.data.success) {
            app.projects = data.data.projects;
        }
    })
})

// my projects controller
.controller('myNoticesCtrl', function (user) {

    let app = this;

    // get my project
    user.getMyNotices().then(function (data) {
        if(data.data.success) {
            app.notices = data.data.notices;
            app.department = data.data.department;
        }
    })
})

// my attendance controller
.controller('myAttendanceCtrl', function (user, $scope) {

    let app = this;

    $scope.todayDate = new Date();

    function getMyAttendanceFunction(date) {
        //get user attendance
        user.getMyAttendances().then(function (data) {
            if(data.data.success) {
                app.myAttendances = [];
                data.data.attendances.forEach(function (attendance) {
                    /*console.log((new Date(date).getDate()));
                    console.log((new Date(attendance.date).getDate()));

                    console.log((new Date(date).getMonth()));
                    console.log((new Date(attendance.date).getMonth()));

                    console.log((new Date(date).getFullYear()));
                    console.log((new Date(attendance.date).getFullYear()));*/
                    if((new Date(date)).getDate() === (new Date(attendance.date).getDate()) && (new Date(date)).getMonth() === (new Date(attendance.date).getMonth()) && (new Date(date)).getFullYear() === (new Date(attendance.date).getFullYear())) {
                        app.myAttendances.push(attendance);
                    }
                });
            } else {
                app.errorMsg = data.data.message;
            }
        })
    }

    // function to get attendance
    getMyAttendanceFunction($scope.todayDate)


    // filter function
    $scope.changeFilterDate = function (date) {
        app.myAttendances = [];
        user.getMyAttendances().then(function (data) {
            if(data.data.success) {
                app.myAttendances = [];
                data.data.attendances.forEach(function (attendance) {
                    /*console.log((new Date(date).getDate()));
                    console.log((new Date(attendance.date).getDate()));

                    console.log((new Date(date).getMonth()));
                    console.log((new Date(attendance.date).getMonth()));

                    console.log((new Date(date).getFullYear()));
                    console.log((new Date(attendance.date).getFullYear()));*/
                    if((new Date(date)).getDate() === (new Date(attendance.date).getDate()) && (new Date(date)).getMonth() === (new Date(attendance.date).getMonth()) && (new Date(date)).getFullYear() === (new Date(attendance.date).getFullYear())) {
                        app.myAttendances.push(attendance);
                    }
                });
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };
});
