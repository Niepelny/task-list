(function() {
    'use strict';

    angular
        .module('taskApp')
        .controller('mainController', mainController);
    mainController.$inject = ['$scope', '$http', '$filter', 'socket'];

    function mainController($scope, $http, $filter, socket) {


        // //REST

        // OLD REST DATA GETTER

        $http.get('/api/taskList')
            .success(function(data) {
                vm.taskList = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        vm.updateData = function() {
            $http.get('/api/taskList')
                .success(function(data) {
                    vm.taskList = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // when submitting the add form, send the text to the node API
        vm.addTask = function() {
            if (vm.formData.text) {
                vm.formData.date = $('#date-input').val();
                if (!vm.formData.date) {
                    vm.date = new Date();
                    vm.tomorrow = new Date();
                    vm.tomorrow.setDate(vm.tomorrow.getDate() + 1);
                    vm.formData.date = $filter('date')(vm.tomorrow, 'yyyy-MM-dd');
                }
                if (!vm.formData.radio) {
                    vm.formData.radio = "Active";
                };
                console.log(vm.formData);
                $http.post('/api/taskList', vm.formData)
                    .success(function(data) {
                        vm.formData = {}; // clear the form so our user is ready to enter another
                        vm.formData.priority = vm.selectOptions[0];
                        console.log(vm.formData);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            }
        };

        // delete a todo after checking it
        vm.deleteTodo = function(id) {

            vm.isSelect = true;

            $http.delete('/api/taskList/' + id)
                .success(function(data) {
                    vm.taskList = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        vm.getTask = function(id) {
            console.log("asdf");

            vm.isSelect = false;
            console.log("get task");
            $http.get('/api/taskList/' + id)
                .success(function(data) {
                    vm.currentElement = data[0];
                    //this code is very strange
                    //----
                    //display actual object from current application scope
                    console.log(vm.formData);
                    //display recived elemnt
                    console.log(vm.currentElement);
                    //try to check objects
                    console.log(vm.formData.priority + " : " + vm.currentElement.priority);
                    //try to check objects ------- objects are equal
                    console.log(angular.equals(vm.selectOptions[0], vm.currentElement.priority));
                    // here doesn't work
                    // below function works perfects
                    console.log("--");
                    // display selectced object from select option object
                    console.log(vm.selectOptions[vm.currentElement.priority - 1]);
                    console.log(vm.currentElement.priority);
                    //objects are the smae but works olny from  vm.selectOptions
                    vm.currentElement.priority = vm.selectOptions[vm.currentElement.priority - 1];
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        };

        vm.editTask = function(id) {
            console.log(vm.currentElement);
            $http.put('/api/taskList/' + id, vm.currentElement)
                .success(function(data) {
                    vm.currentElement = data[0];
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                })
        };

        vm.clearTask = function() {
            vm.currentElement = {};
        };

        vm.predicate = 'text';
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            console.log(vm.predicate);
            console.log(vm.reverse);
        };
        // vm.callNotify = function() {
        //     getTaskFromWebSocket();
        // };

        vm.selectOptions = [{
            "id": 1,
            "label": "1"
        }, {
            "id": 2,
            "label": "2"
        }, {
            "id": 3,
            "label": "3"
        }];
    }


}());
