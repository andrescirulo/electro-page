var electroPageApp = angular.module('electroPageApp', [
  'ui.router','ngResource','ui.bootstrap','ngMaterial'
]);

electroPageApp.config(['$httpProvider',function ($httpProvider){
	$httpProvider.defaults.transformRequest = function(data){
	    if (data === undefined) {
	      return data;
	    }
	    return $.param(data);
	  };
	  
	  $httpProvider.defaults.headers.post['Content-Type'] = ''
	    + 'application/x-www-form-urlencoded; charset=UTF-8';
}]);

electroPageApp.config(['$mdThemingProvider',function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('orange')
	    .accentPalette('green')
	    .warnPalette('red');
}]);

electroPageApp.factory('$context', function() {
	var context={};
	var map=new Array();
	
	context.add = function(key,value){
		map[key]=value;
	};
	context.remove = function(key){
		var ret=map[key];
		map[key]=null;
		return ret;
	}
	context.get = function(key){
		return map[key];
	}
	
	return context;
});

electroPageApp.factory('$user', ['$state','User',function($state,User) {
    
    var user = {}; 
    user.id=null;
    user.nombre=null;
    user.nick=null;
    
    user.checkLogin = function(){
    	User.login({},function(resp){
			if (resp.resultado=="OK"){
				user.login(resp.usuario);
			}
			else{
				$state.go('login');
			}
		},
		function(err){
			
		});
    }
    user.isLogged = function ()
    {
    	return user.id!=null;
    };
    
    user.login = function (userData){
    	user.id=userData.id;
    	user.nombre=userData.nombre;
    	user.apellido=userData.apellido;
    	user.nick=userData.nick;
    	user.sexo=userData.sexo;
    	user.email=userData.email;
    };
    
    user.logout = function (){
    	User.logout(function(resp){
    		if (resp.resultado=="OK"){
    			user.id=null;
    			user.nombre=null;
    			user.nick=null;
    			$state.go('login');
    		}
    		else{
    			
    		}
    	});
    };
    
    return user;
}]);