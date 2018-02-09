﻿var app = angular.module('FinderApp'); // -> _Layout.cshtml <html ng-app="TemplateApp">

app.controller("ExampleController", ExampleController);

ExampleController.$inject = ["$scope", "$http", "UrlService"];

function ExampleController($scope, $http, UrlService)
{
    $scope.exampleText = 'Please wait';

    $scope.getExampleText = function()
    {
        $http.get(UrlService.forApi('Finder')).then(function(response)
        {
            if (!response.data)
            {
                alert('Something went wrong!');
            }

            $scope.exampleText = response.data;
        }, function(error)
        {
            alert('Error!');
        });
    };

    $scope.getExampleText();
}