var app = angular.module('userRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            /*.when('/login', {
                templateUrl : '/app/views/users/authentication/login.html',
                authenticated : false
            })*/

            .when('/logout', {
                templateUrl : '/app/views/users/authentication/logout.html',
                authenticated : false,
                controller : 'editCtrl',
                controllerAs : 'edit'
            })

            .when('/activate/:token', {
                templateUrl : '/app/views/users/authentication/activation/activate.html',
                authenticated : false,
                controller : 'emailCtrl',
                controllerAs : 'email'
            })

            .when('/resend', {
                templateUrl : '/app/views/users/authentication/activation/resend.html',
                authenticated : false,
                controller : 'resendCtrl',
                controllerAs : 'resend'
            })

            .when('/forgot', {
                templateUrl : '/app/views/users/authentication/forgot.html',
                authenticated : false,
                controller : 'forgotCtrl',
                controllerAs : 'forgot'
            })

            .when('/forgotPassword/:token', {
                templateUrl : 'app/views/users/authentication/resetPassword.html',
                authenticated : false,
                controller : 'resetCtrl',
                controllerAs : 'reset'
            })

            .when('/settings', {
                templateUrl : 'app/views/users/authentication/settings.html',
                authenticated : true,
                controller : 'settingsCtrl',
                controllerAs : 'settings'
            })

            // User Dashboard
            .when('/courses', {
                templateUrl : '/app/views/users/dashboard/courses.html',
                authenticated : true,
                permission : 'user',
                controller : 'courseCtrl',
                controllerAs : 'course'
            })

            .when('/workshops', {
                templateUrl : '/app/views/users/dashboard/workshops.html',
                authenticated : true,
                permission : 'user',
                controller : 'workshopCtrl',
                controllerAs : 'workshop'
            })

            .when('/work-station', {
                templateUrl : '/app/views/users/dashboard/workstation.html',
                authenticated : true,
                permission : 'user',
                controller : 'workstationCtrl',
                controllerAs : 'workstation'
            })

            .when('/request-course', {
                templateUrl : '/app/views/users/dashboard/course-request.html',
                authenticated : true,
                permission : 'user',
                controller : 'courseRequestCtrl',
                controllerAs : 'courseRequest'
            })

            .when('/course/:courseID', {
                templateUrl : '/app/views/users/dashboard/course-page.html',
                authenticated : true,
                permission : 'user',
                controller : 'coursePageCtrl',
                controllerAs : 'coursePage'
            })

            .when('/my-assets', {
                templateUrl : '/app/views/users/dashboard/my-assets.html',
                controller : 'assetsCtrl',
                controllerAs : 'assets',
                authenticated : true,
                permission : 'user'
            })

            .when('/my-projects', {
                templateUrl : '/app/views/users/dashboard/my-projects.html',
                controller : 'myProjectsCtrl',
                controllerAs : 'myProjects',
                authenticated : true,
                permission : 'user'
            })

            .when('/my-notices', {
                templateUrl : '/app/views/users/dashboard/my-notices.html',
                controller : 'myNoticesCtrl',
                controllerAs : 'myNotices',
                authenticated : true,
                permission : 'user'
            })

            .when('/my-attendance', {
                templateUrl : '/app/views/users/dashboard/my-attendance.html',
                controller : 'myAttendanceCtrl',
                controllerAs : 'myAttendance',
                authenticated : true,
                permission : 'user'
            })


            // admin dashboard
            .when('/manage-assets', {
                templateUrl : '/app/views/admin/dashboard/manage-assets.html',
                controller : 'assetsManagementCtrl',
                controllerAs : 'assetsManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/add-asset', {
                templateUrl : '/app/views/admin/dashboard/add-asset.html',
                controller : 'assetsManagementCtrl',
                controllerAs : 'assetsManagement',
                authenticated : true,
                permission : 'admin'
            })

            // Project Admin Stuffs
            .when('/add-project', {
                templateUrl : '/app/views/admin/dashboard/add-project.html',
                controller : 'projectManagementCtrl',
                controllerAs : 'projectManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/editProject/:projectID', {
                templateUrl : '/app/views/admin/dashboard/editProject.html',
                controller : 'projectManagementCtrl',
                controllerAs : 'projectManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/manage-projects', {
                templateUrl : '/app/views/admin/dashboard/manage-projects.html',
                controller : 'projectManagementCtrl',
                controllerAs : 'projectManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/project/:projectID', {
                templateUrl : '/app/views/users/dashboard/project.html',
                controller : 'projectCtrl',
                controllerAs : 'project',
                authenticated : true
            })

            .when('/manage-attendance', {
                templateUrl : '/app/views/admin/dashboard/manage-attendance.html',
                authenticated : true,
                controller : 'attendanceManagementCtrl',
                controllerAs : 'attendanceManagement',
                permission : 'admin'
            })

            .when('/add-attendance', {
                templateUrl : '/app/views/admin/dashboard/add-attendance.html',
                authenticated : true,
                controller : 'addAttendanceCtrl',
                controllerAs : 'addAttendance',
                permission : 'admin'
            })

            .when('/add-notice', {
                templateUrl : '/app/views/admin/dashboard/add-notice.html',
                controller : 'noticeManagementCtrl',
                controllerAs : 'noticeManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/editNotice/:noticeID', {
                templateUrl : '/app/views/admin/dashboard/editNotice.html',
                controller : 'noticeManagementCtrl',
                controllerAs : 'noticeManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/manage-notice-board', {
                templateUrl : '/app/views/admin/dashboard/manage-notice-board.html',
                controller : 'noticeManagementCtrl',
                controllerAs : 'noticeManagement',
                authenticated : true,
                permission : 'admin'
            })

            .when('/create-new-user', {
                templateUrl : '/app/views/users/authentication/register.html',
                controller : 'regCtrl',
                controllerAs : 'register',
                authenticated : true,
                permission : 'admin'
            })


            .when('/add-new-course', {
                templateUrl : '/app/views/admin/dashboard/add-new-course.html',
                authenticated : true,
                permission : 'admin',
                controller : 'courseManagementCtrl',
                controllerAs : 'courseManagement'
            })

            .when('/manage-courses', {
                templateUrl : '/app/views/admin/dashboard/manage-courses.html',
                authenticated : true,
                permission : 'admin',
                controller : 'courseManagementCtrl',
                controllerAs : 'courseManagement'
            })

            .when('/editCourse/:courseID', {
                templateUrl : '/app/views/admin/dashboard/editCourse.html',
                authenticated : true,
                permission : 'admin',
                controller : 'courseManagementCtrl',
                controllerAs : 'courseManagement'
            })

            .when('/new-course-requests', {
                templateUrl : '/app/views/admin/dashboard/new-course-requests.html',
                authenticated : true,
                permission : 'admin',
                controller : 'courseRequestManagementCtrl',
                controllerAs : 'courseRequestManagement'
            })

            .when('/add-new-workshop', {
                templateUrl : '/app/views/admin/dashboard/add-new-workshop.html',
                authenticated : true,
                permission : 'admin',
                controller : 'workshopManagementCtrl',
                controllerAs : 'workshopManagement'
            })

            .when('/manage-workshops', {
                templateUrl : '/app/views/admin/dashboard/manage-workshops.html',
                authenticated : true,
                permission : 'admin',
                controller : 'workshopManagementCtrl',
                controllerAs : 'workshopManagement'
            })


            .when('/editWorkshop/:workshopID', {
                templateUrl : '/app/views/admin/dashboard/editWorkshop.html',
                authenticated : true,
                permission : 'admin',
                controller : 'workshopManagementCtrl',
                controllerAs : 'workshopManagement'
            })

            .when('/manage-users', {
                templateUrl : '/app/views/admin/dashboard/manage-users.html',
                authenticated : true,
                permission : 'admin',
                controller : 'userManagementCtrl',
                controllerAs : 'userManagement'
            })

            .when('/manage-category', {
                templateUrl : '/app/views/admin/dashboard/manage-category.html',
                authenticated : true,
                permission : 'admin',
                controller : 'manageCategoryCtrl',
                controllerAs : 'manageCategory'
            })


            .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
    });

app.run(['$rootScope','auth','$location', 'user', function ($rootScope,auth,$location,user) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if(next.$$route) {

            if(next.$$route.authenticated === true) {

                if(!auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if(next.$$route.permission) {

                    user.getPermission().then(function (data) {

                        if(next.$$route.permission !== data.data.permission) {
                            event.preventDefault();
                            $location.path('/');
                        }

                    });
                }

            } else if(next.$$route.authenticated === false) {

                if(auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }

            } /*else {
                console.log('auth doesnot matter');
            }
            */
        } /*else {
            console.log('Home route is here');
        }
*/
    })
}]);

// filter
app.filter('dateFilter', function () {
    return function (items, date) {
        console.log(items);
        console.log(date);
        return 'pankaj'
    }

})
