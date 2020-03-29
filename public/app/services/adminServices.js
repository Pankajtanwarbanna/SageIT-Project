/*
    Services written by - Pankaj tanwar
*/
angular.module('adminServices',[])

.factory('admin', function ($http) {
    let adminFactory = {};

    // get departments
    adminFactory.getAllDepartments = function () {
        return $http.get('/api/getAllDepartments');
    };

    // add new department
    adminFactory.addNewDepartment = function (departmentData) {
        return $http.post('/api/addNewDepartment', departmentData);
    };

    // remove department
    adminFactory.removeDepartment = function (departmentID) {
        return $http.delete('/api/removeDepartment/' + departmentID);
    };

    // get categories
    adminFactory.getAllPositions = function () {
        return $http.get('/api/getAllPositions');
    };

    // add new category
    adminFactory.addNewPosition = function (positionData) {
        return $http.post('/api/addNewPosition', positionData);
    };

    // remove category
    adminFactory.removePosition = function (positionID) {
        return $http.delete('/api/removePosition/' + positionID);
    };

    // add new course
    adminFactory.addNewCourse = function (courseData) {
        return $http.post('/api/addNewCourse', courseData);
    };

    // get all courses
    adminFactory.getAllCourses = function () {
        return $http.get('/api/getAllCourses');
    };

    // get current course
    adminFactory.getCourse = function (courseID) {
        return $http.get('/api/getCourse/' + courseID);
    };

    // edit course
    adminFactory.editCourse = function (courseData) {
        return $http.post('/api/editCourse', courseData);
    };

    // add new workshop
    adminFactory.addNewWorkshop = function (workshopData) {
        return $http.post('/api/addNewWorkshop',workshopData);
    };

    // get all workshops
    adminFactory.getWorkshops = function () {
        return $http.get('/api/getWorkshops');
    };

    // get workshop details
    adminFactory.getWorkshopDetails = function (workshopID) {
        return $http.get('/api/getWorkshopDetails/' +workshopID);
    };

    // update workshop details
    adminFactory.updateWorkshop = function (workshopData) {
        return $http.post('/api/updateWorkshop' , workshopData);
    };

    // admin get course requests
    adminFactory.getNewCourseRequests = function () {
        return $http.get('/api/getNewCourseRequests');
    };

    // remove course request
    adminFactory.removeCourseRequest = function (courseRequestID) {
        return $http.delete('/api/removeCourseRequest/' + courseRequestID);
    };

    // get users
    adminFactory.getUsers = function () {
        return $http.get('/api/getUsers')
    };

    // remove course
    adminFactory.removeCourse = function (courseID) {
        return $http.delete('/api/removeCourse/' + courseID);
    };

    // add new asset
    adminFactory.addAsset = function (assetData) {
        return $http.post('/api/addAsset', assetData);
    };

    // get all assets
    adminFactory.getAllAssets = function () {
        return $http.get('/api/getAllAssets');
    };

    // received item
    adminFactory.receivedItem = function (assetID) {
        return $http.post('/api/receivedItem/' + assetID);
    };

    // add new asset
    adminFactory.addNotice = function (noticeData) {
        return $http.post('/api/addNotice', noticeData);
    };

    // get all assets
    adminFactory.getAllNotices = function () {
        return $http.get('/api/getAllNotices');
    };

    // get notice
    adminFactory.getNotice = function (noticeID) {
        return $http.get('/api/getNotice/' + noticeID);
    };

    // update notice details
    adminFactory.updateNotice = function (noticeData) {
        return $http.post('/api/updateNotice' , noticeData);
    };

    // add new project
    adminFactory.addProject = function (projectData) {
        return $http.post('/api/addProject' , projectData);
    };

    // get all projects
    adminFactory.getAllProjects = function () {
        return $http.get('/api/getAllProjects');
    };

    // update project details
    adminFactory.editProject = function (projectData) {
        return $http.post('/api/editProject' , projectData);
    };

    return adminFactory;
});
