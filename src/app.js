/**
 * Created by sritej583 on 22/9/16.
 */

var myApp = angular.module('myApp', [])

myApp.factory('myQService', function ($http, $q) {
    return {
        getCountriesInfoUsingPromise: function () {
            var defer = $q.defer();

            var countryURL = 'http://localhost:2403/countries-data'

            $http({method: 'GET',url: countryURL}).
                success(function (data, status, headers, config) {
                    defer.resolve(data)
            }). error(function(data, status, headers, config) {
                    defer.reject(data)
            })

            return defer.promise
        }
    }
})


myApp.controller('myJointController', ['$scope', 'myQService', function ($scope, myQService) {
    myQService.getCountriesInfoUsingPromise().then(
        function (data) {
            $scope.countries = data
        },
        function (error) {
            console.log('Error status code is ' + error)
        }
    )
}])