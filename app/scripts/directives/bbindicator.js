'use strict';

angular.module('bossBossApp')
.directive('bbIndicator', function ($window, $interval) {
    return {
        template: '<div style="padding: 0 2px; height: 80%; width: 20%;" ng-style="{\'background-color\': bgcolor}"></div>',
        restrict: 'AE',
        scope: {
            status: '@',
            bgcolor: '@'
        },
        link: function postLink($scope, element) {
            $scope.handleWindow = function() {
                element.height(0);
                element.height(element.parents('.class').height());
            };

            var p = $interval($scope.handleWindow, 400);
            angular.element($window).bind('resize', function() {
                $scope.handleWindow();
                return $scope.$apply();
            });

            if ($scope.bgcolor === undefined || $scope.bgcolor === '') {
                // intepret status
                $scope.bgcolor = ($scope.status === 'Closed' || $scope.status === 'Cancelled') ? '#999999' : '#5cb85c';
            }

            $scope.$on('$destroy', function() {
                $interval.cancel(p);
            });

        }
    };
});
