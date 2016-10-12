// David M Gudeman
// Coursera Front-End JavaScript Frameworks: AngularJS
// Assignment 4 - Client-Server Communication 
// October 9, 2016
'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });
        };

        this.getPromotion = function () {
            return $resource(baseURL + "promotions/:id", null, { 'update': { method: 'PUT' } });
        };
    }])

    .service('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getLeaderShip = function () {
            return $resource(baseURL + "leaderShip/:id", null, { 'update': { method: 'PUT' } });
        };
    }])
    
    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "feedback/:id");
    }])
    ;