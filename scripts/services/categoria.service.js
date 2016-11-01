'use strict';

electroPageApp
    .factory('Categoria', ['$resource','DateUtils','$filter',function ($resource,DateUtils,$filter) {
        return $resource('server/categoriasServer.php', {}, {
                'query': {
                	method: 'GET',
                	params:{operacion:'query'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		return resp;
                	},
                	isArray:true
                },
                'queryGenerales': {
                	method: 'GET',
                	params:{operacion:'queryGenerales'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		return resp;
                	},
                	isArray:true
                },
                'getById': {
                	method: 'GET',
                	params:{operacion:'getById'}
                },
                'getProductos':{
                	method: 'GET',
                	params:{operacion:'getProductos'},
                	transformResponse:function(resp){
                		resp=angular.fromJson(resp);
                		for (var i=0;i<resp.productos.length;i++){
                			resp.productos[i].prodNegocios=$filter('orderBy')(resp.productos[i].prodNegocios, 'negocio', false)
                		}
                		return resp;
                	}
                }
            });
        }]);
