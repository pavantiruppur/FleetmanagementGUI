angular
    .module('app')
    .controller('packageCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.title = "Package";

        $scope.listOfPackage = null;
        $http.get('http://5.44.107.29:8080/FleetMgtSystem-0.0.1/packages').
        //$http.get('package.json').
            success(function(data) {
                $scope.listOfPackage = data;
            });

        // Delete the package
        $scope.deletePackage = function (idx) {
            $http({
                method: 'DELETE',
                url: $scope.listOfPackage._embedded.packages[idx]._links.self.href,
                data: JSON.stringify($scope.listOfPackage._embedded.packages[idx])
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "The Package Saved Successfully!!!";
                    $scope.listOfPackage._embedded.packages.splice(idx,1);
                    //Loadpackage($scope, $http);
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

        //For creating a new package
        $scope.createPackage = function () {
            $scope.package.pickUpPoints = $scope.selectedList;
            alert(JSON.stringify($scope.package));
            //Defining $http service for creating a package
            $http({
                method: 'POST',
                url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/packages',
                data: JSON.stringify($scope.package),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "Package Saved Successfully!!!";
                    alert("Package added successfully");
                    $scope.package = null;
                    $scope.selectedList = null;
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to create a package: ' + error.message;
                });
        }

        $scope.assignPackage = function(idx){
            if(idx == -1){
                $scope.package = null;
            } else {
                $scope.package = $scope.listOfPackage._embedded.packages[idx];
            }
        }

        $scope.addOrUpdatePackage = function() {
            if($scope.package.id == null){
                $scope.createPackage();
            } else {
                $scope.updatePackage();
            }
        }

        //For updating package
        $scope.updatePackage = function () {
            //Defining $http service for updating a package
            //$scope.package._links = null;
            $http({
                method: 'PUT',
                //url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/packages/' + $scope.package.id,
                url: $scope.package._links.self.href,
                data: JSON.stringify($scope.package),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "Package updated Successfully!!!";
                    alert("Package updated successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to update a package: ' + error.message;
                });
        }
    }]);