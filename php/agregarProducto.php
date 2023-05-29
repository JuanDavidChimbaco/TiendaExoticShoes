<?php 
require_once '../php/conexion.php';

$nombre = $_POST['txtNombre'];
$descripcion = $_POST['txtDescripcion'];
$precio = $_POST['txtPrecio'];
$cantidad = $_POST['txtCantidad'];
$categoria = $_POST['categoria'];


try{
     // Insertar los datos en la base de datos
     $sql = "INSERT INTO productos VALUES (null,:nombre, :descripcion, :precio, :cantidad, :categoria)";
     $stmt = $conn->prepare($sql);
     $stmt->bindParam(':nombre', $nombre);
     $stmt->bindParam(':descripcion', $descripcion);
     $stmt->bindParam(':precio', $precio);
     $stmt->bindParam(':cantidad', $cantidad);
     $stmt->bindParam(':categoria', $categoria);
     $stmt->execute();
  
    echo "Datos ingresados correctamente" ; 
    echo "";
    echo ' <a href="../Administrador/index.html" class="btn btn-success"> Volver</a>';

}catch (PDOException $e){
    echo ("Error en la consulta: " . $e->getMessage());
}

?>