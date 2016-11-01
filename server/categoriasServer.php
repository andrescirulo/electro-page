<?php session_start();

	include_once '../conectar.php';
	
	if (isset($_GET["operacion"])){
		$request=json_decode(json_encode($_GET));
		
		if ($request->operacion=="query"){
			
			$query="SELECT cn.id, cn.negocio, cn.padre, cn.nombre, cn.categoria, cat_url(cn.id,cn.negocio) url,";
			$query.="n.nombre negocioNombre,cat_nombre_completo(cn.id,cn.negocio) nombreCompleto,"; 
			$query.="cat_nivel(cn.id,cn.negocio) nivel "; 
			$query.="FROM categoria_negocio cn JOIN negocio n ON (cn.negocio=n.id) ";
			$resultado=$dbh->query($query);
			$data=$resultado->fetchAll();
			echo json_encode($data);
		}
		if ($request->operacion=="queryGenerales"){
			
			$query="SELECT c.id, c.nombre, c.padre,";
			$query.="cat_nombre_completo_gen(c.id) nombreCompleto,"; 
			$query.="cat_nivel_gen(c.id) nivel "; 
			$query.="FROM categoria c WHERE c.padre=-1 AND c.activa=1";
			$resultado=$dbh->query($query);
			$data=$resultado->fetchAll();
			echo json_encode($data);
		}
		if ($request->operacion=="getById"){
			
			$query="SELECT c.id, c.nombre, c.padre,";
			$query.="cat_nombre_completo_gen(c.id) nombreCompleto,"; 
			$query.="cat_nivel_gen(c.id) nivel "; 
			$query.="FROM categoria c WHERE c.id=" . $request->id . " AND c.activa=1";
			$resultado=$dbh->query($query);
			$data=$resultado->fetch();
			echo json_encode($data);
		}
		if ($request->operacion=="getProductos"){
			include_once 'domain/Producto.php';
			$CANT_POR_PAGINA=16;
			$pagina=$request->pagina;
			$inicio=($pagina-1)*$CANT_POR_PAGINA;
			
			//VER COMO ARREGLAR LOS MAX EN LAS CATEGORIAS
			$query="SELECT DISTINCT id,negocio,nombre,marca,url,url_imagen,precio_minimo "; 
			$query.="FROM mv_productos p WHERE (p.categoria=" . $request->categoria;
			$query.=" OR p.categoria_1=" . $request->categoria;
			$query.=" OR p.categoria_2=" . $request->categoria;
			$query.=" OR p.categoria_3=" . $request->categoria;
			$query.=" OR p.categoria_4=" . $request->categoria;
			$query.=" OR p.categoria_5=" . $request->categoria . ")";
			if (isset($request->texto)){
				$query.=" AND p.nombre LIKE '%" . $request->texto . "%'";
			}
			if (isset($request->negocio)){
				$query.=" AND p.negocio=" . $request->negocio;
			}
			$query.= " ORDER BY p.nombre ";
			$query.="LIMIT " . $inicio . "," . $CANT_POR_PAGINA;
// 			error_log($query,3,"errors.log");
			
			$resultado=$dbh->query($query);
			$data["productos"]=array();
			foreach ($resultado->fetchAll() as $fila){
				$data["productos"][]=new Producto($fila);
			}
			if ($pagina==1){
				$queryCant="SELECT COUNT(*) cant ";
				$queryCant.="FROM mv_productos p WHERE (p.categoria=" . $request->categoria;
				$queryCant.=" OR p.categoria_1=" . $request->categoria;
				$queryCant.=" OR p.categoria_2=" . $request->categoria;
				$queryCant.=" OR p.categoria_3=" . $request->categoria;
				$queryCant.=" OR p.categoria_4=" . $request->categoria;
				$queryCant.=" OR p.categoria_5=" . $request->categoria . ")";
				if (isset($request->texto)){
					$queryCant.=" AND p.nombre LIKE '%" . $request->texto . "%'";
				}
				if (isset($request->negocio)){
					$queryCant.=" AND p.negocio=" . $request->negocio;
				}
				$resulCant=$dbh->query($queryCant);
				$data["totalProductos"]=$resulCant->fetch()["cant"];
			}
			echo json_encode($data);
		}
	}
	else if (isset($_POST["operacion"])){
		$request=json_decode(json_encode($_POST));
		$res=array();
		$res["resultado"]="OK";
		if ($request->operacion=="actualizar"){
			$update="UPDATE categoria_negocio SET categoria=? WHERE id=? AND negocio=?";
			foreach ($request->categorias as $cat){
				$st=$dbh->prepare($update);
				$st->bindParam(1, $cat->categoria);
				$st->bindParam(2, $cat->id);
				$st->bindParam(3, $cat->negocio);
				if (!$st->execute()){
					$res["resultado"]="ERROR";
					break;
				}
			}
		}
		echo json_encode($res); 
	}
?>