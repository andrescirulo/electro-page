'use strict';

electroPageApp
    .factory('Producto', ['$resource','DateUtils',function ($resource,DateUtils) {
        return $resource('server/productosServer.php', {}, {
                'getDetalles': {
                	method: 'GET',
                	params:{operacion:'getDetalles'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		for (var i=0;i<resp.length;i++){
                			resp[i].fecha=DateUtils.convertLocaleDateFromServer(resp[i].fecha);
                			resp[i].precio=parseInt(resp[i].precio);
                		}
                		return resp;
                	},
                	isArray:true
                }
            });
        }]);
