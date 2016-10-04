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
        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
            function (response) {
                $scope.dishes = response.data;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );


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
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
            function (response) {
                $scope.dish = response.data;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('DishCommentController', ['$scope', function ($scope) {

        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);

            $scope.commentForm.$setPristine();

            $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
        };
    }])
    // Task 2
    // implement the IndexController and About Controller here
    // my comment: IndexController will supply data for home.html template
    // my comment: AboutController will supply data for aboutus.html template


    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function ($scope, $stateParams, menuFactory, corporateFactory) {

        var promotion = menuFactory.getPromotion(0);

        $scope.promotion = promotion;

        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";

        menuFactory.getDish(0)
            .then(
            function (response) {
                $scope.dish = response.data;
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