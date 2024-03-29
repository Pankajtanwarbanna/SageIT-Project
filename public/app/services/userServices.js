/*
    Services written by - Pankaj tanwar
*/
angular.module('userServices',[])

.factory('user', function ($http) {
    var userFactory = {};

    // user.create(regData);
    userFactory.create = function (regData) {
        return $http.post('/api/register' , regData);
    };

    // user.activateAccount(token);
    userFactory.activateAccount = function (token) {
        return $http.put('/api/activate/'+token);
    };

    // user.resendLink(logData);
    userFactory.checkCredientials = function (logData) {
        return $http.post('/api/resend',logData);
    };

    // user.resendEmail(username);
    userFactory.resendEmail = function (username) {
        return $http.put('/api/sendlink', username);
    };

    // user.forgotUsername(email);
    userFactory.forgotUsername = function (email) {
        return $http.post('/api/forgotUsername', email);
    };

    // user.forgotPasswordLink(username);
    userFactory.forgotPasswordLink = function (username) {
        return $http.put('/api/forgotPasswordLink', username);
    };

    // user.forgotPasswordCheckToken(token);
    userFactory.forgotPasswordCheckToken = function (token) {
        return $http.post('/api/forgotPassword/'+token);
    };

    // user.resetPassword(token,password);
    userFactory.resetPassword = function (token,password) {
        return $http.put('/api/resetPassword/'+token, password);
    };

    // user.getPermission();
    userFactory.getPermission = function () {
        return $http.get('/api/permission');
    };

    // get users from database
    userFactory.getUsers = function () {
        return $http.get('/api/management/');
    };

    // get user from id
    userFactory.getUser = function(id) {
        return $http.get('/api/edit/' + id);
    };

    //delete user from database
    userFactory.deleteUser = function (username) {
        return $http.delete('/api/management/'+username);
    };

    // edit details of user
    userFactory.editUser = function (id) {
        return $http.put('/api/edit/', id);
    };

    // get all categories
    userFactory.getCategories = function () {
        return $http.get('/api/getCategories')
    };

    // get courses for user
    userFactory.getCourses = function () {
        return $http.get('/api/getCourses')
    };

    // get upcoming workshops
    userFactory.getUpcomingWorkshops = function () {
        return $http.get('/api/getUpcomingWorkshops')
    };

    // get course details
    userFactory.getCourseDetails = function (courseID) {
        return $http.get('/api/getCourseDetails/' + courseID);
    };

    // save my work
    userFactory.saveMyWork = function (workData) {
        return $http.post('/api/saveMyWork', workData);
    };

    // get my work
    userFactory.getMyWork = function () {
        return $http.get('/api/getMyWork');
    };

    // post new course request
    userFactory.postNewCourseRequest = function (courseRequetData) {
        return $http.post('/api/postNewCourseRequest', courseRequetData);
    };

    // update user details
    userFactory.updateProfile = function (profileData) {
        return $http.post('/api/updateProfile', profileData);
    };

    // update profile picture
    userFactory.updateProfilePictureURL = function (profilePictureData) {
        console.log(profilePictureData);
        return $http.post('/api/updateProfilePictureURL', profilePictureData);
    };

    // get project
    userFactory.getProject = function (projectID) {
        return $http.get('/api/getProject/' + projectID);
    };

    // add comment
    userFactory.addComment = function (commentData) {
        return $http.post('/api/addComment', commentData);
    };

    //get my assets
    userFactory.getMyAssets = function () {
        return $http.get('/api/getMyAssets');
    };

    //get my projects
    userFactory.getMyProjects = function () {
        return $http.get('/api/getMyProjects');
    };

    //get my notices
    userFactory.getMyNotices = function () {
        return $http.get('/api/getMyNotices');
    };

    //get my attendances
    userFactory.getMyAttendances = function () {
        return $http.get('/api/getMyAttendances');
    };

    return userFactory;
});
