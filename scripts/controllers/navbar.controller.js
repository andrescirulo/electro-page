electroPageApp.controller('NavbarCtrl',function($scope,$rootScope,$utils,Categoria){
	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){
			$utils.scrollToTop();
		}
	);
	var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
	$scope.categorias=Categoria.queryGenerales();
});