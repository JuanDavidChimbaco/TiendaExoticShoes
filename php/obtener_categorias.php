<?php 
require_once '../php/conexion.php';

try{
    // Preparar la consulta
    $sql = 'SELECT * FROM categorias';
    $stmt = $conn->prepare($sql);
  
    // Ejecutar la consulta
    $stmt->execute();
  
  // Obtener los resultados de la consulta
  $categorias = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($categorias);

}catch (PDOException $e){
    echo ("Error en la consulta: " . $e->getMessage());
}

?>