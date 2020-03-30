/*
    Controller written by - Pankaj tanwar
*/
angular.module('managementController', ['adminServices','fileModelDirective','uploadFileService'])
    
.controller('manageCategoryCtrl', function (admin) {
    var app = this;

    // All Department Functions
    function getAllDepartments() {
        admin.getAllDepartments().then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.departments = data.data.departments;
            }
        });
    }

    getAllDepartments();

    // add new department
    app.addDepartmentSuccessMsg = '';
    app.addDepartmentErrorMsg = '';

    app.addNewDepartment = function (departmentData) {
        admin.addNewDepartment(app.departmentData).then(function (data) {
            if(data.data.success) {
                app.addDepartmentSuccessMsg = data.data.message;
                getAllDepartments();
            } else {
                app.addDepartmentErrorMsg = data.data.message;
            }
        })
    };

    // remove Department
    app.removeDepartment = function (departmentID) {
        admin.removeDepartment(departmentID).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.removeDepartmentSuccessMsg = data.data.message;
                getAllDepartments();
            } else {
                app.removeDepartmentErrorMsg = data.data.message;
            }
        })
    }


    // All Position Functions
    function getAllPositions() {
        admin.getAllPositions().then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.positions = data.data.positions;
            }
        });
    }

    getAllPositions();

    // add new category
    app.addPositionSuccessMsg = '';
    app.addPositionErrorMsg = '';

    app.addNewPosition = function (positionData) {
        admin.addNewPosition(app.positionData).then(function (data) {
            if(data.data.success) {
                app.addPositionSuccessMsg = data.data.message;
                getAllPositions();
            } else {
                app.addPositionErrorMsg = data.data.message;
            }
        })
    };

    // remove position
    app.removePosition = function (positionID) {
        admin.removePosition(positionID).then(function (data) {
            //console.log(data);
            if(data.data.success) {
                app.removePositionSuccessMsg = data.data.message;
                getAllPositions();
            } else {
                app.removePositionErrorMsg = data.data.message;
            }
        })
    }
})

.controller('courseManagementCtrl', function (admin, $routeParams, $timeout,$scope,uploadFile) {

    let app = this;

    // get all course
    function getAllCourses() {
        admin.getAllCourses().then(function (data) {
            if(data.data.success) {
                app.courses = data.data.courses;
            }
        })
    }

    getAllCourses();

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    // Add New Course
    app.addNewCourseLoading = false;

    app.addNewCourse = function (courseData) {
        app.addNewCourseLoading = true;

        if($scope.file) {
            uploadFile.uploadImage($scope.file).then(function (data) {
                if(data.data.success) {
                    app.courseData.poster = data.data.filename;
                    uploadFile.upload($scope.file).then(function (data) {
                        if(data.data.success) {
                            app.courseData.course_file_url = data.data.filename;
                            admin.addNewCourse(app.courseData).then(function (data) {
                                if(data.data.success) {
                                    app.addNewCourseSuccessMsg = data.data.message;
                                    app.addNewCourseLoading = false;
                                } else {
                                    app.addNewCourseErrorMsg = data.data.message;
                                    app.addNewCourseLoading = false;
                                }
                            });
                        } else {
                            app.editCourseErrorMsg = 'Course files uploading error : ' + data.data.message;
                        }
                    });
                } else {
                    app.editCourseErrorMsg = 'Course poster uploading error : ' + data.data.message;
                }
            });
        } else {
            admin.addNewCourse(app.courseData).then(function (data) {
                if(data.data.success) {
                    app.addNewCourseSuccessMsg = data.data.message;
                    app.addNewCourseLoading = false;
                } else {
                    app.addNewCourseErrorMsg = data.data.message;
                    app.addNewCourseLoading = false;
                }
            });
        }
    };

    // get current course
    admin.getCourse($routeParams.courseID).then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.courseData = data.data.course;
        }
    });

    // edit course
    app.editCourse = function (courseData) {
        console.log(app.courseData);

        if($scope.file) {
            uploadFile.uploadImage($scope.file).then(function (data) {
                if(data.data.success) {
                    app.courseData.poster = data.data.filename;

                    admin.editCourse(app.courseData).then(function (data) {
                        console.log(data);
                        if(data.data.success) {
                            app.editCourseSuccessMsg = data.data.message;
                            $timeout(function () {
                                app.editCourseSuccessMsg = '';
                            }, 2000)
                        } else {
                            app.editCourseErrorMsg = data.data.message;
                        }
                    })
                } else {
                    app.editCourseErrorMsg = data.data.message;
                }
            });
        } else {
            admin.editCourse(app.courseData).then(function (data) {
                console.log(data);
                if(data.data.success) {
                    app.editCourseSuccessMsg = data.data.message;
                    $timeout(function () {
                        app.editCourseSuccessMsg = '';
                    }, 2000)
                } else {
                    app.editCourseErrorMsg = data.data.message;
                }
            })
        }
    };

    // remove course
    app.removeCourse = function (courseID) {
        admin.removeCourse(courseID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.removeCourseSuccessMsg = data.data.message;
                getAllCourses();
                $timeout(function () {
                    app.removeCourseSuccessMsg = '';
                }, 3000);
            } else {
                app.removeCourseErrorMsg = data.data.message;
            }
        })
    }
})


.controller('workshopManagementCtrl', function (admin, $routeParams, uploadFile,$scope) {
    var app = this;

    // get all workshops
    function getWorkshops() {
        admin.getWorkshops().then(function (data) {
            if(data.data.success) {
                app.workshops = data.data.workshops;
            }
        })
    }

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    getWorkshops();

    // add new workshop
    app.addNewWorkshop = function (workshopData) {

        if($scope.file) {
            uploadFile.uploadImage($scope.file).then(function (data) {
                console.log(data);
                if(data.data.success) {
                    app.workshopData.poster = data.data.filename;
                    admin.addNewWorkshop(app.workshopData).then(function (data) {
                        if(data.data.success) {
                            app.addNewWorkshopSuccessMsg = data.data.message;
                        } else {
                            app.addNewWorkshopErrorMsg = data.data.message;
                        }
                    })
                } else {
                    app.addNewWorkshopErrorMsg = data.data.message;
                }
            });
        } else {
            admin.addNewWorkshop(app.workshopData).then(function (data) {
                if(data.data.success) {
                    app.addNewWorkshopSuccessMsg = data.data.message;
                } else {
                    app.addNewWorkshopErrorMsg = data.data.message;
                }
            })
        }
    };

    // edit workshop
    admin.getWorkshopDetails($routeParams.workshopID).then(function (data) {
        if(data.data.success) {
            app.workshopData = data.data.workshop;
            app.workshopData.time_date = new Date(app.workshopData.time_date);
        }
    });

    app.updateWorkshop = function (workshopData) {

        if($scope.file) {
            uploadFile.uploadImage($scope.file).then(function (data) {
                if(data.data.success) {
                    app.workshopData.poster = data.data.filename;

                    admin.updateWorkshop(app.workshopData).then(function (data) {
                        console.log(data);
                        if(data.data.success) {
                            app.updateWorkshopSuccessMsg = data.data.message;
                        } else {
                            app.updateWorkshopErrorMsg = data.data.message;
                        }
                    })
                } else {
                    app.updateWorkshopErrorMsg = data.data.message;
                }
            });
        } else {
            admin.updateWorkshop(app.workshopData).then(function (data) {
                console.log(data);
                if(data.data.success) {
                    app.updateWorkshopSuccessMsg = data.data.message;
                } else {
                    app.updateWorkshopErrorMsg = data.data.message;
                }
            })
        }
    }
})

.controller('courseRequestManagementCtrl', function (admin) {

    let app = this;

    // function to get all course requests
    function getNewCourseRequests() {
        admin.getNewCourseRequests().then(function (data) {
            if(data.data.success) {
                app.courseRequests = data.data.courseRequests;
            }
        });
    }

    getNewCourseRequests();

    // remove course request
    app.removeCourseRequest = function (courseRequestID) {
        admin.removeCourseRequest(courseRequestID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.courseRequestRemovedSuccessMsg = data.data.message;
                getNewCourseRequests();
            } else {
                app.courseRequestRemovedErrorMsg = data.data.message;
            }
        })
    }
})

.controller('userManagementCtrl', function (admin) {

    let app = this;

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

    // get all users
    admin.getUsers().then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.users = data.data.users;
        }
    })
})

// asset management ctrl
.controller('assetsManagementCtrl', function (admin) {

    var app = this;

    // get all usres
    admin.getUsers().then(function (data) {
        if(data.data.success) {
            app.employees = data.data.users;
        }
    });
    
    // add new asset
    app.addAsset = function (assetData) {
        admin.addAsset(app.assetData).then(function (data) {
            if(data.data.success) {
                app.addAssetSuccessMsg = data.data.message;
            } else {
                app.addAssetErrorMsg = data.data.message;
            }
        })
    };

    function getAllAssets() {
        // get all assets
        admin.getAllAssets().then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.assets = data.data.assets;
            }
        });
    }

    getAllAssets();
    
    // received item
    app.receivedItem = function (assetID) {
        admin.receivedItem(assetID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                getAllAssets();
            }
        })
    }
})

// notice management controller
.controller('noticeManagementCtrl', function(admin, $routeParams){

    let app = this;

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    // get all notices
    admin.getAllNotices().then(function (data) {
        console.log(data.data.notices);
        if(data.data.success) {
            app.notices = data.data.notices;
        }
    });

    // add notice function
    app.addNotice = function (noticeData) {
        admin.addNotice(app.noticeData).then(function (data) {
            if(data.data.success) {
                app.addNoticeSuccessMsg = data.data.message;
            } else {
                app.addNoticeErrorMsg = data.data.message;
            }
        })
    };

    // get notice
    if($routeParams.noticeID) {
        admin.getNotice($routeParams.noticeID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.noticeData = data.data.notice;
            } else {
                app.editNoticeErrorMsg = data.data.message;
            }
        });
    }

    // update notice
    app.updateNotice = function (noticeData) {
        admin.updateNotice(app.noticeData).then(function (data) {
            if(data.data.success) {
                app.editNoticeSuccessMsg = data.data.message;
            } else {
                app.editNoticeErrorMsg = data.data.message;
            }
        })
    }

})

// attendance management ctrl
.controller('attendanceManagementCtrl', function (admin,$scope) {

    let app = this;

    // today date
    $scope.todayDate = new Date();

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

    // get all users
    admin.getUsersAttendance($scope.todayDate).then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.usersAttendances = data.data.attendances;
        }
    });

    // filter date
    $scope.changeFilterDate = function (date) {
        app.result = [];
        app.usersAttendances.forEach(function (attendance) {
            console.log((new Date(attendance.date).getDate()));
            if((new Date(date)).getDate() === (new Date(attendance.date).getDate()) && (new Date(date)).getMonth() === (new Date(attendance.date).getMonth()) && (new Date(date)).getFullYear() === (new Date(attendance.date).getFullYear())) {
                app.result.push(attendance);
                console.log(attendance);
            }
        });

        app.usersAttendances = app.result;
    }
})

// add attendance management ctrl
.controller('addAttendanceCtrl', function (admin,$scope) {

    let app = this;

    // today date
    $scope.todayDate = new Date();
    //app.attendanceData.date = new Date();

    // get all users
    admin.getUsers().then(function (data) {
        if(data.data.success) {
            app.employees = data.data.users;
        }
    });

    // add attendance
    app.addAttendanceFunction = function (attendanceData) {
        admin.addAttendanceFunction(app.attendanceData).then(function (data) {
            if(data.data.success) {
                app.addAttendanceSuccessMsg = data.data.message;
            } else {
                app.addAttendanceErrorMsg = data.data.message;
            }
        })
    }


})

// project management ctrl admin
.controller('projectManagementCtrl', function (admin,$routeParams, user) {

    let app = this;

    //get all departments
    admin.getAllDepartments().then(function (data) {
        if(data.data.success) {
            app.departments = data.data.departments;
        }
    });

    // get all users
    admin.getUsers().then(function (data) {
        if(data.data.success) {
            app.members = data.data.users;
        }
    });

    // get all projects
    if(!$routeParams.projectID) {
        admin.getAllProjects().then(function (data) {
            if(data.data.success) {
                app.projects = data.data.projects;
            } else {
                app.errorMsg = data.data.message;
            }
        });
    }

    // add new project
    app.addProject = function (projectData) {
        app.addProjectSuccessMsg = '';
        app.addProjectErrorMsg = '';
        admin.addProject(app.projectData).then(function (data) {
            if(data.data.success) {
                app.addProjectSuccessMsg = data.data.message;
            } else {
                app.addProjectErrorMsg = data.data.message;
            }
        })
    };

    // get project to edit
    if($routeParams.projectID) {
        user.getProject($routeParams.projectID).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.projectData = data.data.project[0];
                app.projectData.start_date = new Date(app.projectData.start_date);
                app.projectData.deadline = new Date(app.projectData.deadline);
            }
        });
    }

    // admin updating project
    app.editProject = function (projectData) {
        admin.editProject(app.projectData).then(function (data) {
            if(data.data.success) {
                app.editProjectSuccessMsg = data.data.message;
            } else {
                app.editProjectErrorMsg = data.data.message;
            }
        })
    }


});
