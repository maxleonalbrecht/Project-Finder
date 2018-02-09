﻿var root = $('#rootPath').val();
var rootViewTemplates = $('#rootPath').val();

if (root == '/')
{
    root = '';
    rootViewTemplates = '..';
}

var app = angular.module('FinderApp', ['ngRoute']);

function config($routeProvider)
{
    $routeProvider
        .when(
            '/',
            {
                redirectTo: '/Example'
            })
        .when(
            '/Example',
            {
                templateUrl: rootViewTemplates + '/Frontend/Templates/Example.html',
                controller: 'ExampleController'
            })
        .otherwise(
            {
                redirectTo: '/'
            });
}

app.config(["$routeProvider", config]);