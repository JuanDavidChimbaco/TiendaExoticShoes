<?php
// Configuración de la base de datos
$servername = "localhost"; // Nombre del servidor de la base de datos
$username = "root"; // Nombre de usuario de la base de datos
$password = ""; // Contraseña de la base de datos
$dbname = "tiendaexoticshoes"; // Nombre de la base de datos

// Conexión a la base de datos utilizando PDO
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos";
} catch (PDOException $e) {
    die("La conexión falló: " . $e->getMessage());
}

// Realizar operaciones con la base de datos...

// Cerrar conexión
$conn = null;
?>
