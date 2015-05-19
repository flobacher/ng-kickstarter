require('angular')
    .module('kickstart', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'ProjectListController as projectList',
                templateUrl:'list.html',
                resolve: {
                    projects: function (Projects) {
                        return Projects.fetch();
                    }
                }
            })
            .when('/edit/:projectId', {
                controller:'EditProjectController as editProject',
                templateUrl:'detail.html'
            })
            .when('/new', {
                controller:'NewProjectController as editProject',
                templateUrl:'detail.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    })
;
