angular
    .module('app')
    .controller('vehicleCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.title = "Vehicle";

        $scope.listOfVehicle = null;
        $http.get('http://5.44.107.29:8080/FleetMgtSystem-0.0.1/vehicles').
        //$http.get('vehicle.json').
            success(function(data) {
                $scope.listOfVehicle = data;
            });

        // Delete the vehicle
        $scope.deleteVehicle = function (idx) {
            $http({
                method: 'DELETE',
                url: $scope.listOfVehicle._embedded.vehicles[idx]._links.self.href,
                data: JSON.stringify($scope.listOfVehicle._embedded.vehicles[idx])
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "The Person Saved Successfully!!!";
                    $scope.listOfVehicle._embedded.vehicles.splice(idx,1);
                    //LoadVehicle($scope, $http);
                })
        }

        $scope.addOrUpdateVehicle = function() {
            if($scope.vehicle.id == null){
                $scope.createVehicle();
            } else {
                $scope.updateVehicle();
            }
        }


        //For creating a new vehicle
        $scope.createVehicle = function () {
            //Defining $http service for creating a vehicle
            $http({
                method: 'POST',
                url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/vehicles',
                data: JSON.stringify($scope.vehicle),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "Vehicle Saved Successfully!!!";
                    alert("Vehicle added successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to create a vehicle: ' + error.message;
                });
        }

        $scope.assignVehicle = function(idx){
            if(idx == -1){
                $scope.vehicle = null;
            } else {
                $scope.vehicle = $scope.listOfVehicle._embedded.vehicles[idx];
            }
        }

        //For updating vehicle
        $scope.updateVehicle = function () {
            //Defining $http service for updating a Vehicle
            //$scope.vehicle._links = null;
            console.error(JSON.stringify($scope.vehicle));
            alert(JSON.stringify($scope.vehicle));
            $http({
                method: 'PUT',
                //url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/vehicles/' + $scope.vehicle.id,
                url: $scope.vehicle._links.self.href,
                data: JSON.stringify($scope.vehicle),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "Vehicle updated Successfully!!!";
                    alert("Vehicle updated successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to update a vehicle: ' + error.message;
                });
        }
    }]);