'use strict';

electroPageApp
    .factory('Negocio', ['$resource','DateUtils',function ($resource,DateUtils) {
        return $resource('server/negociosServer.php', {}, {
                'query': {
                	method: 'GET',
                	params:{operacion:'query'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		return resp;
                	},
                	isArray:true
                }
            });
        }]);
