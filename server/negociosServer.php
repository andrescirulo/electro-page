<?php session_start();

	include_once '../conectar.php';
	
	if (isset($_GET["operacion"])){
		$request=json_decode(json_encode($_GET));
		
		if ($request->operacion=="query"){
			
			$query="SELECT id,nombre,url url,ifnull(url_imagen,url) url_imagen FROM negocio"; 
			$resultado=$dbh->query($query);
			$data=$resultado->fetchAll();
			echo json_encode($data);
		}
	}
	else if (isset($_POST["operacion"])){
		$request=json_decode(json_encode($_POST));
	}
?>