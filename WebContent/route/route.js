angular
    .module('app')
    .controller('routeCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.title = "Route";

        $scope.listOfRoute = null;
        $http.get('http://5.44.107.29:8080/FleetMgtSystem-0.0.1/routes').
        //$http.get('route.json').
            success(function(data) {
                $scope.listOfRoute = data;
            });

        // Delete the route
        $scope.deleteRoute = function (idx) {
            $http({
                method: 'DELETE',
                url: $scope.listOfRoute._embedded.routes[idx]._links.self.href,
                data: JSON.stringify($scope.listOfRoute._embedded.routes[idx])
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "The Route Saved Successfully!!!";
                    $scope.listOfRoute._embedded.routes.splice(idx,1);
                    //Loadroute($scope, $http);
                })
        }

        $scope.pickUpPoints = [ 'Majestic', 'Sirsi circle', 'Place 1', 'Place 2'];
        $scope.selectedList = [];
        $scope.addToList = function(pickUpPoint){
            var idx = $scope.selectedList.indexOf(pickUpPoint);

            // is currently selected
            if (idx > -1) {
                $scope.selectedList.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selectedList.push(pickUpPoint);
            }
        }

        //For creating a new route
        $scope.createRoute = function () {
            $scope.route.pickUpPoints = $scope.selectedList;
            //Defining $http service for creating a route
            $http({
                method: 'POST',
                url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/routes',
                data: JSON.stringify($scope.route),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "Route Saved Successfully!!!";
                    alert("Route added successfully");
                    $scope.route = null;
                    $scope.selectedList = null;
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to create a route: ' + error.message;
                });
        }

        $scope.assignRoute = function(idx){
            if(idx == -1){
                $scope.route = null;
                $scope.selectedList = [];
            } else {
                $scope.route = $scope.listOfRoute._embedded.routes[idx];
                $scope.selectedList = $scope.route.pickUpPoints;
            }
        }

        $scope.addOrUpdateRoute = function() {
            if($scope.route.id == null){
                $scope.createRoute();
            } else {
                $scope.updateRoute();
            }
        }

        //For updating route
        $scope.updateRoute = function () {
            //Defining $http service for updating a route
            //$scope.route._links = null;
            console.error(JSON.stringify($scope.route));
            alert(JSON.stringify($scope.route));
            $http({
                method: 'PUT',
                //url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/routes/' + $scope.route.id,
                url: $scope.route._links.self.href,
                data: JSON.stringify($scope.route),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "route updated Successfully!!!";
                    alert("route updated successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to update a route: ' + error.message;
                });
        }
    }]);