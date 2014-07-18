var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'profile.html',
            controller: 'userController'
        })
        .when('/findFriends', {
            templateUrl: 'findFriends.html',
            controller: 'userController'
        })
}]);






myApp.controller('userController', ['$scope', '$http', function ($scope, $http) {

    $scope.yoUsers;
    $scope.friendList;

    $http.get('/user')
        .success(function (users) {
            $scope.yoUsers = users;
        })
        .error(function (error) {
            console.log('Unable to load users data: ' + error.message);
        });

    $scope.getFriends = function () {
        $http.get("/getUser").success(function (curruser) {
            $http.get("/user/" + curruser.email).success(function (user) {
                $scope.friendList = user.friends;
            })
        })
            .error(function (error) {
                console.log('Unable to load friends: ' + error.message);
            });
    };

    $scope.addFriend = function (index) {
        var param = {
            email: $scope.yoUsers[index].email
        };
        $http.get("/getFriendData/" + param.email).success(function (friend) {
            $http.get("/getUser").success(function (user) {
                $http.put("/user/" + user.email, friend).success(function (data) {
                    console.log(data);
                })
                    .error(function (error) {
                        console.log(error);
                    });
            }).error(function (error) {
                console.log(error);
            });
        }).error(function (error) {
            console.log('Unable to add friend: ' + error.message);
        });
    };

    $scope.addNewUser = function () {
        var param = {
            email: jQuery('#email').val(),
            nickName: jQuery('#nickname').val(),
            password: jQuery('#password').val(),
            friendList: []
        };
        $http.post("/user", param).success(function () {
            console.log("user saved successfully");
        });
        alert("New User added");

    };

    $scope.login = function () {
        var email = jQuery('#login_email').val();
        var pass = jQuery('#reg_pwd').val();
        $http.post("/isValidUser",{email:email,pass:pass}).success(function (data) {
            if (data.isUserValid) {
                window.location.href = "profile.html";
            }
            else {
                alert("Email or Password not matched");
            }
        });
    }

}]);
