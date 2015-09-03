angular
    .module('app')
    .controller('userCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.title = "User";

        $scope.pickupPoint = /*[{ name: "Majestic", id: "Majestic" }, { name: "Sirsi circle", id: "Sirsi circle" },
            { name: "Place 1", id: "Place 1" }, { name: "Place 2", id: "Place 2" }];*/
            [ 'Majestic', 'Sirsi circle', 'Place 1', 'Place 2'];

        $scope.listOfUser = null;
        $http.get('http://5.44.107.29:8080/FleetMgtSystem-0.0.1/users').
        //$http.get('user.json').
            success(function(data) {
                $scope.listOfUser = data;
            });

        // Delete the user
        $scope.deleteUser = function (idx) {
            alert($scope.listOfUser._embedded.users[idx]._links.self.href);
            $http({
                method: 'DELETE',
                url: $scope.listOfUser._embedded.users[idx]._links.self.href,
                data: JSON.stringify($scope.listOfUser._embedded.users[idx])
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "The user Saved Successfully!!!";
                    $scope.listOfUser._embedded.users.splice(idx,1);
                    //Loaduser($scope, $http);
                })
        }

        $scope.roles = [ 'Admin', 'Employee'];
        $scope.selectedList_roles = [];
        //dropdown list for roles
        $scope.addToList_role = function(role){
            var idx = $scope.selectedList_roles.indexOf(role);

            // is currently selected
            if (idx > -1) {
                $scope.selectedList_roles.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selectedList_roles.push(role);
            }
        }


        //For creating a new user
        $scope.createUser = function () {
            $scope.user.roles = $scope.selectedList_roles;
            alert(JSON.stringify($scope.user));
            //Defining $http service for creating a user
            $http({
                method: 'POST',
                url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/users',
                data: JSON.stringify($scope.user),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "user Saved Successfully!!!";
                    alert("user added successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to create a user: ' + error.message;
                });
        }

        $scope.addOrUpdateUser = function() {
            if($scope.user.id == null){
                $scope.createUser();
            } else {
                $scope.updateUser();
            }
        }

        $scope.assignUser = function(idx){
            if(idx == -1){
                $scope.user = null;
                $scope.selectedList_roles = [];
            } else {
                $scope.user = $scope.listOfUser._embedded.users[idx];
                $scope.selectedList_roles = $scope.user.roles;
            }
        }

        //For updating user
        $scope.updateUser = function () {
            //Defining $http service for updating a user
            //$scope.user._links = null;
            $http({
                method: 'PUT',
                //url: 'http://5.44.107.29:8080/FleetMgtSystem-0.0.1/users/' + $scope.user.id,
                url: $scope.user._links.self.href,
                data: JSON.stringify($scope.user),
                headers: { 'Content-Type': 'application/JSON' }
            }).
                success(function (data) {
                    //Showing success message
                    $scope.status = "user updated Successfully!!!";
                    alert("user updated successfully");
                })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to update a user: ' + error.message;
                });
        }
    }]);