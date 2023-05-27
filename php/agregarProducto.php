<?php 
include 'conexion.php';

// Consulta para obtener las categorías
$sql = "SELECT id, nombre FROM categorias";
$stmt = $conn->query($sql);

// Obtener los resultados de la consulta
$categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);


?>