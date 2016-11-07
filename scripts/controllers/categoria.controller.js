electroPageApp.controller('CategoriaCtrl',['$scope','$stateParams','$utils','Categoria','Negocio','$alerts',
   function($scope,$stateParams,$utils,Categoria,Negocio,$alerts){
	$scope.init = function(){
		$scope.pagina=1;
		Negocio.query(function(resp){
			$scope.negocios=resp;
			var todos=new Object();
			todos.id=0;
			todos.nombre="Todos";
			$scope.negocios.splice(0,0,todos);
			$scope.filtroNegocio=$scope.negocios[0];
		});
		$scope.categoria=Categoria.getById({id:$stateParams.id});
		$scope.getPagina();
	}
	
	$scope.buscar = function(){
		$scope.pagina=1;
		$scope.getPagina();
	}
	
	$scope.getPagina = function (){
		var data=$scope.getFiltro();
		Categoria.getProductos(data,function(resp){
			if ($scope.pagina==1){
				$scope.totalProductos=resp.totalProductos;
			}
			$scope.productos=resp.productos;
		});
	};
	
//	$scope.getStyleByNegocio = function(producto){
//		var negocioId=producto.negocio;
//		var estilo={
//			padding:"3px",
//			fontSize:"9pt",
//			textAlign:"center",
//			border:"2px solid #cccccc",
//			height:"250px",
//			marginBottom:"5px",
//		    maxWidth: "220px",
//		    borderRadius: "10px",
//		    mozBoxShadow: "2px 2px 2px 2px rgba(100,100,100,0.7)",
//		    webkitBoxShadow: "2px 2px 2px 2px rgba(100,100,100,0.7)",
//		    boxShadow: "1px 1px 2px 1px rgba(100,100,100,0.7)"
//		};
//		var shadowColor="";
//		if (negocioId==1){
//			estilo.borderColor="#ffaaaa";
//		}
//		if (negocioId==2){
//			estilo.borderColor="#f0c8ff";
//		}
//		if (negocioId==3){
//			estilo.borderColor="#ffffbb";
//		}
//		if (negocioId==4){
//			estilo.borderColor="#bbbbff";
//		}
//		if (negocioId==5){
//			estilo.borderColor="#a5ef00";
//		}
//		return estilo;
//	}
//	
//	$scope.armarUrlImagen = function(producto){
//		var urlImagen=producto.url_imagen;
//		if (urlImagen.search('http://')==-1 && urlImagen.search('https://')==-1 && $scope.negocios!=null){
//			var negocio=$utils.getItem($scope.negocios,"id",producto.negocio);
//			urlImagen=negocio.url_imagen + urlImagen;
//		}
//		return urlImagen;
//	}
	
	$scope.getFiltro = function(){
		var filtro={
			 texto:$scope.filtroNombre,
			 categoria:$stateParams.id,
			 pagina:$scope.pagina
		};
		if ($scope.filtroNegocio!=null && $scope.filtroNegocio.id!=0){
			filtro.negocio=$scope.filtroNegocio.id;
		}
		return filtro;
	}
	
//	$scope.verDetalles = function (producto,estado){
//		if (estado==2 && producto.detalles==null){
//			//BUSCAR DETALLES
//		}
//		producto.estado=estado;
//	}
	
	$scope.init();
}]);