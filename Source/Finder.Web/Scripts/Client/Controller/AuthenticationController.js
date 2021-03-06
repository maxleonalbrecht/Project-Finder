﻿var app = angular.module('FinderApp');

app.controller("AuthenticationController", AuthenticationController);

AuthenticationController.$inject = ["$scope", "$http", "UrlService"];

function AuthenticationController($scope, $http, UrlService) {

    $scope.user = {
        userName: null,
        firstName: null,
        lastName: null,
        eMail: null,
        password :null
    };

    $scope.showError = false;

    $scope.showRegisterForm = true;

    $scope.showSucess = false;

    $scope.showPasswortAlert = false;

    $scope.showNotLoggedIn = false;

    $scope.checkboxModel = {
        value1: true
    };

    $scope.SubmitUser = function()
    {
        $scope.showError = false;
        $scope.showUserError = false;

        if (!$scope.Validate()) {

            return;
        }

        $scope.WriterUserToDB();
    }

    $scope.Validate = function ()
    {
        var userMailValid = /\S+@\S+\.\S+/.test($scope.user.eMail);

        if ($scope.user.eMail != null) {
            if (!userMailValid)
            {
                $scope.showError = true;
                return false;
            }
        }

        if (pw1.value !== pw2.value)
        {
            $scope.showError = true;
            return false;
        }

        if ($scope.checkboxModel.value1 == false)
        {
            $scope.showError = true;
            return false;
        }

        return true;
    }

    $scope.WriterUserToDB = function()
    {
        $http(
            {
                method: 'POST',
                url: UrlService.forApi('Authentication'),
                data: JSON.stringify($scope.user)
            }).then(
            function success(response)
            {
                $scope.showRegisterForm = false;
                $scope.showSucess = true;
            },
            function error(response) {
                $scope.showUserError = true;
            });
    }

    $scope.CheckUser = function()
    {
        $scope.showPasswortAlert = false;
        var url = UrlService.forRoot('#!/User');
        $http(
            {
                method: 'PATCH',
                url: UrlService.forApi('Authentication'),
                data: JSON.stringify($scope.user)
            }).then(
            function success(response)
            {
                sessionStorage.loggedInUser = $scope.user.userName;
                document.getElementById('logout').style.visibility = 'visible';
                document.getElementById('login').style.visibility = 'hidden';
                window.location.replace(url);
            },
            function error(response) {
                $scope.showPasswortAlert = true;

                $scope.user = {
                    userName: null,
                    firstName: null,
                    lastName: null,
                    eMail: null,
                    password: null
                };
            });
    }

    $scope.LogoutUser = function()
    {
        $scope.showNotLoggedIn = false;
        if (sessionStorage.loggedInUser !== "")
        {
            sessionStorage.loggedInUser = "";
            var url = UrlService.forRoot('#!/Login');
            window.location.replace(url);
            document.getElementById('logout').style.visibility = 'hidden';
            document.getElementById('login').style.visibility = 'visible';
        }
        else
        {
            $scope.showNotLoggedIn = true;
        }
    }

    $scope.CheckIfUserIsLoggedOn = function()
    {
        if (sessionStorage.loggedInUser !== "") {
            var url = UrlService.forRoot('#!/User');
            window.location.replace(url);
        }
    }
}