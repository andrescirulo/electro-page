<?php
include_once 'ProductoNegocio.php';

class Producto {
	var $nombre;
	var $marca;
	var $prodNegocios;
	
	function __construct($data){
		$this->nombre=$data["nombre"];
		$this->marca=$data["marca"];
		$this->prodNegocios=array();
		
		$ids=explode("|", $data["id"]);
		$negocios=explode("|", $data["negocio"]);
		$urls=explode("|", $data["url"]);
		error_log($data["url_imagen"] . "\n",3,"errors.log");
		$urlsImagen=explode("|", $data["url_imagen"]);
		$precios=explode("|", $data["precio_minimo"]);
		$keys=array();
		
		$precioMin=9999999;
		for ($i=0;$i<count($ids);$i++){
			$key=$ids[$i] . "|" . $negocios[$i];
			if (in_array($key, $keys)){
				continue;
			}
			$keys[]=$key;
			$prod=new ProductoNegocio();
			$prod->id=$ids[$i];
			$prod->negocio=$negocios[$i];
			$prod->precioMinimo=$precios[$i];
			$prod->url=$urls[$i];
			$prod->urlImagen=$urlsImagen[$i];
			if ($prod->precioMinimo<$precioMin){
				$precioMin=$prod->precioMinimo;
				$prodMin=$prod;
			}
			$this->prodNegocios[]=$prod;
		}
		
		//AGREGO EL MEJOR COMO NEGOCIO CERO SI HAY MAS DE UNO
		if (count($this->prodNegocios)>1){
			$prodMinimo=new ProductoNegocio();
			$prodMinimo->id=$prodMin->id;
			$prodMinimo->negocio=$prodMin->negocio*-1;
			$prodMinimo->precioMinimo=$prodMin->precioMinimo;
			$prodMinimo->url=$prodMin->url;
			$prodMinimo->urlImagen=$prodMin->urlImagen;
			$this->prodNegocios[]=$prodMinimo;
		}
	}
}