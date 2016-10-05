// David M Gudeman
// Assignment 3 - Single Page Applications
// September 28, 2016

'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    //    var promotions = [
      //      {
        ///        _id: 0,
           ///     name: 'Weekend Grand Buffet',
              //  image: 'images/buffet.png',
             //   label: 'New',
              //  price: '19.99',
    //            description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
    //        }

      //  ];

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });
        };


      //  this.getPromotion = function (item) {
     //       return promotions[item];
    //    }

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