// Carga el contenido de los componentes
document.getElementById('header').innerHTML = loadComponent('/Tienda/componentes/header.html');
document.getElementById('menu').innerHTML = loadComponent('/Tienda/componentes/menu.html');
document.getElementById('seccion').innerHTML = loadComponent('/Tienda/componentes/seccion.html');
document.getElementById('footer').innerHTML = loadComponent('/Tienda/componentes/footer.html');

// Función para cargar el contenido de los componentes

function agregarProductos(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/agregarProductos.html')
}

function listarProductos(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarProductos.html')
}
function agregarCategorias(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/agregarCategorias.html')
}

function listarCategorias(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarCategorias.html')
}
function listarPedidos(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarPedidos.html')
}
function listarClientes(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarClientes.html')
}
function listarDetallesPedidos(){
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarDetallesPedidos.html')
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
function obtenerCategorias() {
    fetch('../php/obtener_categorias.php')
    .then(response => response.json())
    .then(categorias => {
        console.log(categorias);
        let options = '';
        categorias.forEach((element) => {
            options += `
                            <option value="${element.idCategoria}">${element.nombre}</option>
                        `;
        });
        document.getElementById('CategoriaProducto').innerHTML = options;
        })
}

function listarProductosTabla(){
    fetch('../php/listarProductos.php')
    .then((response) => response.json())
    .then(result => {
        console.log(result);
        let table = "";
        result.forEach((Element, index) => {
            table += `<tr>
                    <th scope='row'>${index + 1}</th>
                    <td>${Element.nombre}</td>
                    <td>
                        ${Element.descripcion}
                    </td>
                    <td>${Element.precio}</td>
                    <td>
                        ${Element.cantidadEnInventario}
                    </td>
                    <td>
                        ${Element.nombre_categoria}
                    </td>
                </tr>`
        });
        document.getElementById('datos').innerHTML = table;
    })
}

function goBack() {
    document.getElementById('seccion').innerHTML = loadComponent('/Tienda/procesos/listarPedidos.html')
  }

 