document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    // Obtén los valores del nombre de usuario y contraseña
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Realiza la validación del nombre de usuario y contraseña (aquí puedes agregar tu lógica personalizada)
    if (username === "admin" && password === "admin") {
      // Inicio de sesión exitoso
      alert("Inicio de sesión exitoso. ¡Bienvenido, administrador!");
      // Redirige a la página del panel de administración
      window.location.href = "inicio.html";
    } else {
      // Inicio de sesión fallido
      alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo nuevamente.");
    }
  });