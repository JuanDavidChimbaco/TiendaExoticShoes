<?php 

require_once 'conexion.php';

$sql = "SELECT p.*, c.nombre AS nombre_categoria FROM productos p, categorias c WHERE p.categoria = c.idCategoria;";
$result = $conn->prepare($sql);
$result->execute(); 

$rows = $result->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($rows);

?>