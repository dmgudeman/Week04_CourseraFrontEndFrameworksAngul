// David M Gudeman
// Assignment 3 - Single Page Applications
// September 28, 2016

'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );


    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };



        $scope.submitComment = function () {
            console.log("hi there");
            $scope.mycomment.date = new Date().toISOString();
              console.log($scope.mycomment + " first");
            $scope.dish.comments.push($scope.mycomment);
   console.log($scope.mycomment + "second");
            menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
             console.log($scope.mycomment + "third");
            $scope.commentForm.$setPristine();
            $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
        };
    }])
    // Task 2
    // implement the IndexController and About Controller here
    // my comment: IndexController will supply data for home.html template
    // my comment: AboutController will supply data for aboutus.html template


    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {

       // var promotion = menuFactory.getPromotion(0);
     //   $scope.promotion = promotion;

         $scope.promotion = {};
        $scope.showPromotion = false;
        $scope.message = "Loading ...";
        $scope.promotion = menuFactory.getPromotion().get({ id: 0 })
            .$promise.then(
            function (response) {
                console.log($scope.promotion.name);
                $scope.promotion = response;
                $scope.showPromtion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );


        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({ id: 0 })
            .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        var leader = corporateFactory.getLeader(3);
        $scope.leader = leader;

    }])

    .controller('AboutController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {
        var leadership = corporateFactory.getLeaders();
        $scope.leadership = leadership;
    }])

    ;