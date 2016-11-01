electroPageApp.factory('$alerts', ['$timeout',function($timeout) {
    
    var alerts = {}; 
    alerts.currentAlert=null;
    alerts.currentStyle=null;
    alerts.undoFunction=null;
    alerts.timeout=5000;
    
    alerts.showError = function(msg){
    	alerts.showAlert(msg,"alert alert-danger");
    };
    alerts.showOk = function(msg){
    	alerts.showAlert(msg,"alert alert-success");
    };
    alerts.showWarning = function(msg){
    	alerts.showAlert(msg,"alert alert-warning");
    };
    alerts.showInfo = function(msg){
    	alerts.showAlert(msg,"alert alert-info");
    };
    
    alerts.showOkWithUndo = function(msg,undoFunction){
    	alerts.showAlert(msg,"alert alert-success",undoFunction);
    };
    
    alerts.showAlert = function(msg,style,undoFunction){
    	alerts.currentAlert=msg;
    	alerts.currentStyle=style;
    	alerts.undoFunction=undoFunction;
    	$timeout(function () {
    		alerts.closeAlert();
        }, alerts.timeout);
    };
    
    alerts.closeAlert = function(){
    	alerts.currentAlert=null;
	    alerts.currentStyle=null;
	    alerts.undoFunction=null;
    };
    
    
    return alerts;
}]);