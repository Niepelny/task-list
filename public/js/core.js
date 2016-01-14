var taskApp = angular.module('taskApp', [])
    .controller('mainController', function mainController($scope, $http) {
        $scope.formData = {};
        $scope.currentElement = {};
        $scope.isSelect = true;

        // when landing on the page, get all taskList and show them
        $http.get('/api/taskList')
            .success(function(data) {
                $scope.taskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        $scope.updateData = function() {
            $http.get('/api/taskList')
                .success(function(data) {
                    $scope.taskList = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // when submitting the add form, send the text to the node API
        $scope.addTask = function() {
            console.log($scope.formData);
            $http.post('/api/taskList', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {

            $scope.isSelect = true;

            $http.delete('/api/taskList/' + id)
                .success(function(data) {
                    $scope.taskList = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.getTask = function(id) {
            console.log("asdf");

            $scope.isSelect = false;
            console.log("get task");
            $http.get('/api/taskList/' + id)
                .success(function(data) {
                    $scope.currentElement = data[0];
                    //this code is very strange
                    //----
                    //display actual object from current application scope
                    console.log($scope.formData);
                    //display recived elemnt
                    console.log($scope.currentElement);
                    //try to check objects
                    console.log($scope.formData.priority + " : " + $scope.currentElement.priority);
                    //try to check objects ------- objects are equal
                    console.log(angular.equals($scope.selectOptions[0], $scope.currentElement.priority));
                    // here doesn't work
                    // below function works perfects
                    console.log("--");
                    // display selectced object from select option object
                    console.log($scope.selectOptions[$scope.currentElement.priority["id"]-1]);
                    console.log($scope.currentElement.priority);
                    //objects are the smae but works olny from  $scope.selectOptions
                    $scope.currentElement.priority = $scope.selectOptions[$scope.currentElement.priority["id"]-1];
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            
        };

        $scope.editTask = function(id) {
            console.log($scope.currentElement);
            $http.put('/api/taskList/' + id, $scope.currentElement)
                .success(function(data) {
                    $scope.currentElement = data[0];
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                })
        };

        $scope.clearTask = function() {
            $scope.currentElement = {};
        };

        $scope.predicate = 'text';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
            console.log($scope.predicate);
            console.log($scope.reverse);
        };

        $scope.selectOptions = [{
            "id": 1,
            "label": "1"
        }, {
            "id": 2,
            "label": "2"
        }, {
            "id": 3,
            "label": "3"
        }];

        $scope.myDate = new Date();
        console.log($scope.myDate);
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };

    })
    .directive('editTask', function() {
        return {
            templateUrl: 'd-edit-task.html'
        };
    });
