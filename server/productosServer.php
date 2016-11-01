<?php session_start();

	include_once '../conectar.php';
	
	if (isset($_GET["operacion"])){
		$request=json_decode(json_encode($_GET));
		
		if ($request->operacion=="getDetalles"){
			$query="SELECT fecha,precio"; 
			$query.=" FROM precio_producto pp WHERE producto=? AND negocio=? ORDER BY FECHA DESC LIMIT 0,4";
			$st=$dbh->prepare($query);
			$st->bindValue(1, $request->producto);
			$st->bindValue(2, $request->negocio);
			$st->execute();
			$data=$st->fetchAll();
			echo json_encode($data);
		}
	}
	else if (isset($_POST["operacion"])){
		$request=json_decode(json_encode($_POST));
		$res=array();
		$res["resultado"]="OK";
		echo json_encode($res); 
	}
?>