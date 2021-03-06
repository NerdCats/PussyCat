(function () {
    'use strict';

    angular
        .module('app')
        .directive('jobActivity', jobActivity);

    function jobActivity() {
        // Usage:
        // 
        // Creates:
        //

        /* @ngInject */
        var jobAcitivityDirectiveController = ['$scope', '$http', 'ngAuthSettings', function ($scope, $http, ngAuthSettings) {
            
            var vm = $scope;
            vm.JobActivityState = "";
            vm.loadActivity = function (hrid, page, pageSize) {
                var activityUrl = "";
                if (hrid === undefined) {
                    activityUrl = ngAuthSettings.apiServiceBaseUri + "api/JobActivity?$orderby=TimeStamp desc&$select=ActionText,HRID,TimeStamp&page="+ page +"&pageSize=50";
                } else {
                    activityUrl = ngAuthSettings.apiServiceBaseUri + "api/JobActivity?$filter=HRID eq '"+ hrid +"'&$orderby=TimeStamp desc&$select=ActionText,HRID,TimeStamp&page="+ page +"&pageSize=50";
                }
                vm.JobActivityState = "IN_PROGRESS";
                $http({
                    method: 'GET',
                    url: activityUrl
                }).then(function (response) {
                    vm.data = response.data.data;
                    vm.pagination = [];
                    vm.JobActivityState = "SUCCESS";
                    var Pagination = response.data.pagination;
                    for (var i = 0; i < Pagination.TotalPages; i++) {
                        var page = {
                            pageNo: i,
                            isCurrentPage : ""
                        }
                        if (Pagination.Page === i) {
                            page.isCurrentPage = "selected-page";
                        }
                        if (i > (Pagination.Page - 5) && i < (Pagination.Page + 5)) {
                            vm.pagination.push(page);
                        }
                    }
                }, function (error) {
                    vm.JobActivityState = "ERROR";
                });
            }

            vm.page = 0;
            vm.loadActivity(vm.hrid, vm.page);
        }];

        var directive = {            
            controller: jobAcitivityDirectiveController,            
            restrict: 'E',
            scope: {
                hrid: '=hrid'
            },
            templateUrl: 'app/directives/JobActivity/jobActivity.html'
        };
        return directive;
    }
})();