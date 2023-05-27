// Carga el contenido de los componentes
document.getElementById('header').innerHTML = loadComponent('/Tienda/componentes/header.html');
document.getElementById('menu').innerHTML = loadComponent('/Tienda/componentes/menu.html');
document.getElementById('seccion').innerHTML = loadComponent('/Tienda/componentes/seccion.html');
document.getElementById('footer').innerHTML = loadComponent('/Tienda/componentes/footer.html');

// Función para cargar el contenido de los componentes

function agregarProductos(){
    document.getElementById('seccion').innerHTML = loadComponent('/procesos/agregarProductos.html')
}

function listarProductos(){
    document.getElementById('seccion').innerHTML = loadComponent('/procesos/listarProductos.html')
}
function agregarCategorias(){
    document.getElementById('seccion').innerHTML = loadComponent('/procesos/agregarCategorias.html')
}

function listarCategorias(){
    document.getElementById('seccion').innerHTML = loadComponent('/procesos/listarCategorias.html')
}
function listarPedidos(){
    document.getElementById('seccion').innerHTML = loadComponent('/procesos/listarPedidos.html')
}

function inicio(){
    location.reload();
}
function loadComponent(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.responseText;
}