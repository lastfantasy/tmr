angular.module('starter.controllers',[])
	.controller('ToDoListCtrl', function($scope, $ionicModal){
		$scope.toDoListItems = [{
			task: 'Scuba Diving',
			status: 'not done'
		}, {
			task: 'Climb Everest',
			status: 'not done'
		}];

		$scope.AddItem = function(data){
			$scope.toDoListItems.push({
				task:data.newItem,
				status:'not done'});
			data.newItem = ' ';
			$scope.closeModal();
		};

		$ionicModal.fromTemplateUrl('modal.html',{
			id: '1',
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal){
			$scope.modal1 = modal;
		});

		$ionicModal.fromTemplateUrl('modal1.html',{
			id: '2',
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal){
			$scope.modal2 = modal;
		});

		$scope.openModal = function(index) {
			if (index == 1) $scope.modal1.show();
			else $scope.modal2.show();
		};

		$scope.closeModal = function(index) {
			if (index == 1) $scope.modal1.hide();
			else $scope.modal2.hide();
		};

		$scope.$on('$destroy', function() {
			$scope.modal1.remove();
			$scope.modal2.remove();
		});
});