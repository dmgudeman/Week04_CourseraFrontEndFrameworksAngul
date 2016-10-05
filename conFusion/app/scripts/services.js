// David M Gudeman
// Assignment 3 - Single Page Applications
// September 28, 2016

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
    ;