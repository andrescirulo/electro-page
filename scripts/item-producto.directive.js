/**
 * Item-Producto.
 * Atributos aceptados:
 *  item-producto: Objeto del modelo asociado que contiene el producto
 */
electroPageApp.directive('itemProducto', ['$utils','Producto','$filter',function($utils,Producto,$filter) {
		function link(scope, element, attrs) {
			
			scope.getTitleByNegocio = function(negocioId){
				if (negocioId<0){
					var negocio=$utils.getItem(scope.negocios,"id",negocioId*-1);
					return "El mejor (" + negocio.nombre + ")";
				}
				else{
					var negocio=$utils.getItem(scope.negocios,"id",negocioId);
					return negocio.nombre;
				}
			};
			scope.getClassByNegocio = function(){
				if (scope.producto.seleccionado==null){return};
				
				switch(scope.producto.seleccionado.negocio){
					case "1": return "producto-garbarino";
					case "2": return "producto-fravega";
					case "3": return "producto-lacasa";
					case "4": return "producto-tiomusa";
					case "5": return "producto-ribeiro";
					case "6": return "producto-rodo";
					case "7": return "producto-musimundo";
					default: return "producto-mejor";
				}
			}
			
			scope.verDetalles = function (estado){
				var seleccionado=scope.producto.seleccionado;
				if (seleccionado==null){return};
				if (estado==2 && seleccionado.detalles==null){
					Producto.getDetalles({
						producto : seleccionado.id,
						negocio : seleccionado.negocio
					}, function(detalles) {
						seleccionado.detalles = $filter('orderBy')(detalles, 'fecha', false);
						seleccionado.detalles[0].cambio=0;
						for (var i=1;i<seleccionado.detalles.length;i++){
							if (seleccionado.detalles[i].precio==seleccionado.detalles[i-1].precio){
								seleccionado.detalles[i].cambio=0;
							}
							else{
								if (seleccionado.detalles[i].precio>seleccionado.detalles[i-1].precio){
									seleccionado.detalles[i].cambio=1;
								}
								else{
									seleccionado.detalles[i].cambio=-1;
								}
							}
						}
					});
				}
				scope.producto.estado=estado;
			};
			
			scope.getClaseCambio = function(detalle){
				switch(detalle.cambio) {
				    case 0:
				        return "fa fa-minus price-same";
				    case 1:
				    	return "fa fa-arrow-up price-up";
				    case -1:
				    	return "fa fa-arrow-down price-down";
				}
			}
			
			scope.getIdImgNeg = function(prodNeg){
				if (prodNeg==null){return};
				if (prodNeg.negocio<0){
					return 0; 
				}
				else{
					return prodNeg.negocio;
				}
			}
			scope.armarUrlImagen = function(){
				var seleccionado=scope.producto.seleccionado;
				if (seleccionado==null){return};
				var urlImagen=seleccionado.urlImagen;
				if (urlImagen.search('http://')==-1 && urlImagen.search('https://')==-1 && scope.negocios!=null){
					var negId=seleccionado.negocio<0?(seleccionado.negocio*-1):seleccionado.negocio;
					var negocio=$utils.getItem(scope.negocios,"id",negId);
					urlImagen=negocio.url_imagen + urlImagen;
				}
				return urlImagen;
			}
			scope.getUrlProducto = function (){
				var seleccionado=scope.producto.seleccionado;
				if (seleccionado==null){return};
				return scope.armarUrlProducto(seleccionado);
			}
			scope.armarUrlProducto = function(prodNegocio){
				var seleccionado=prodNegocio;
				if (seleccionado==null){return};
				var urlProd=seleccionado.url;
				if (urlProd.search('http://')==-1 && urlProd.search('https://')==-1 && scope.negocios!=null){
					var negId=seleccionado.negocio<0?(seleccionado.negocio*-1):seleccionado.negocio;
					var negocio=$utils.getItem(scope.negocios,"id",negId);
					urlProd=negocio.url + urlProd;
				}
				return urlProd;
			}
			
			scope.setSeleccionado = function(prodNeg){
				scope.producto.seleccionado=prodNeg;
			}
			
			scope.init = function(){
				var comparacion=new Array();
				if (scope.producto.prodNegocios.length>1){
					for (var i=1;i<scope.producto.prodNegocios.length;i++){
						var prodNeg=scope.producto.prodNegocios[i];
						var fila=new Object();
						fila.negocio=prodNeg.negocio;
						fila.negocioNombre=$utils.getItem(scope.negocios,"id",prodNeg.negocio).nombre;
						fila.precio=prodNeg.precioMinimo;
						fila.url=scope.armarUrlProducto(prodNeg);
						comparacion.push(fila);
					}
				}
				scope.comparacion=comparacion;
			}
			scope.init();
			scope.setSeleccionado(scope.producto.prodNegocios[0]);
			
	    }
	
		
		return {
			scope: {
				ngModel:'=ngModel',
				producto:'=itProducto',
				negocios:'=itNegocios',
				obtenerDetalles:'=itGetDetalles',
			},
		    templateUrl: 'templates/item-producto.html',
		    link: link
	  };
	}]);