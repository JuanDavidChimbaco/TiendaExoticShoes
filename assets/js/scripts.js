/** Funcion para obtener las categorias en el Select */
async function getCategory() {
    try {
    let response = await axios.get('http://localhost:8000/api/v1.0/categorias')
    let data = await response.data;
    let item = "";
    data.forEach((element) => {
        item += `
            <li><a href="#productosPorCategoria" class="dropdown-item" onclick="getProductsByCategory(${element.id})">${element.nombre}</a></li>
        `
    });
    categorias.innerHTML = item;
    } catch (error) {
    console.log(error);
    }
}

/** Función para obtener productos y paginacion */
async function getProducts(url = 'http://localhost:8000/productos-limit-offset/?limit=4&offset=0') {
    try {
        let response = await axios.get(url);
        let data = await response.data;
        let item = "";
        data.results.forEach((element) => {
            item += `
                <div class="card mb-3 mx-1 mt-1" style="max-width: 500px;">
                <div class="row g-0">
                <div class="col-md-4">
                  <img src="http://localhost:8000/${element.foto}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.descripcion}</p>
                    <p class="card-text"><small class="text-body-secondary">Precio: $${element.precio}</small></p>
                    <button type="button" class="btn btn-secondary" onclick="getDetailProducts('${element.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Mas Detalles</button>
                    <button class="btn btn-outline-dark" onclick="agregarAlCarrito(${element.id})">Al Carrito</button>
                  </div>
                </div>
              </div>
                </div>`;
        });
        TodosProductos.innerHTML = item;

        // Calcular el número total de páginas
        const totalPages = Math.ceil(data.count / 4); // Aquí, 4 es el límite por página
        // Generar enlaces para cada número de página
        let pageLinks = "";
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            pageLinks += `
                <li class="page-item ${pageNum === data.offset / 4 + 1 ? 'active' : ''}">
                    <a class="page-link" onclick="getProductsByPage(${pageNum})">${pageNum}</a>
                </li>
            `;
        }

        // Agregar botones de paginación
        let pagination = `
        <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item ${!data.previous ? 'disabled' : ''}">
            <a class="page-link" onclick="getProducts('${data.previous}')">Previous</a>
          </li>
          ${pageLinks}
          <li class="page-item ${!data.next ? 'disabled' : ''}">
            <a class="page-link" onclick="getProducts('${data.next}')">Next</a>
          </li>
        </ul>
      </nav>`;
        paginationContainer.innerHTML = pagination;
    } catch (error) {
        console.log(error);
    }
}

/** Función para obtener productos por número de página*/ 
function getProductsByPage(pageNum) {
    const offset = (pageNum - 1) * 4; // Aquí, 4 es el límite por página
    const url = `http://localhost:8000/productos-limit-offset/?limit=4&offset=${offset}`;
    getProducts(url);
}

/** funcion para obtener productos por id (o el detalle de un producto)*/ 
async function getDetailProducts(id){
    try {
        const response = await axios.get(`http://localhost:8000/api/v1.0/productos/${id}`)
        const data = await response.data;
        console.log(data);
        detalleProducto.innerHTML = `
        <div class="card mt-5">
            <div class="d-flex justify-content-center">
                <img src="${data.foto}" class="card-img-top" alt="..." style="max-width: 350px;">
            </div>
            <div class="card-header mt-3 text-center bg-primary text-white">
                <h5 class="card-title tipo-${data.categoria}">${data.nombre.toUpperCase()}</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <h6 class="text-center text-secondary">Categoría</h6>
                        <p class="text-center">${data.categoria}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h6 class="text-center text-secondary">Precio</h6>
                        <p class="text-center">$${data.precio}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <h6 class="text-center text-secondary">Unidades Disponibles</h6>
                        <p class="text-center">${data.cantidadEnInventario} UND</p>
                    </div>
                </div>
            </div>
        </div>
        `
    } catch (error) {
        console.log(error);
    }
}

/** Función para obtener productos por categoría*/
async function getProductsByCategory(id){
    try {
        let response = await axios.get(`http://localhost:8000/api/v1.0/productos-filtrados/?categoria_id=${id}`)
        let data = await response.data;
        // console.log(data);
        let item = "";
        data.forEach((element) => {
            item += `
            <div class="card mb-3 mx-1 mt-1" style="max-width: 500px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.foto}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">${element.descripcion}</p>
                            <p class="card-text"><small class="text-body-secondary">Precio: $${element.precio}</small></p>
                            <button type="button" class="btn btn-secondary" onclick="getDetailProducts('${element.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Mas Detalles</button>
                            <button class="btn btn-outline-dark" onclick="agregar(${element.id})">Al Carrito</button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        productosPorCategoria.innerHTML = item;

    } catch (error) {
        console.log(error);
    }
}

/** Funcion para que el boton me lleve a la parte superiror de la pagina */
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

/* lista de productos */
let Productos = [];

/** Funcion para traer todos los productos y guardarlos en una lista */
async function getProductos(){
    try {
        let response = await axios.get('http://localhost:8000/api/v1.0/productos')
        let data = await response.data;
        Productos = data;
    } catch (error) {
        console.log(error);
    }
}

/* lista para saber si ya hay productos en el carrito */
// let carrito = [];

/** funcion para agregar el producto al carrito */
async function agregarAlCarrito(productoId){
    try {
        const response = await axios.post('http://localhost:8000/api/v1.0/itemcarrito/', {
            producto: productoId,
            cantidad: 1, // Puedes ajustar esto según tus necesidades
        });
        
        // La respuesta contendrá los datos del producto agregado al carrito en el backend
        const productoAgregado = response.data;

        // Actualiza la interfaz o realiza cualquier otra acción necesaria
        pintarCarrito();

    } catch (error) {
        console.error('Error al agregar producto al carrito', error);
    }
    pintarCarrito();

    //   fetch('/api/detalles-pedido/agregar_al_carrito/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ detalles: detalles })
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data));
}

/* lista de productos en el carrito pintados */
let productosEnCarrito = [];

/** Funcion para pintar el carrito */
function pintarCarrito(){
    let card = "";
    let totalItems = 0;
    let valor = 0;
    productosEnCarrito = [];
    if (productosCarrito == null || productosCarrito.length == 0 || productosCarrito == undefined ) {
        carritoDeProductos.innerHTML = ` No hay productos en el carrito`;
        total.innerHTML = 0;
    }else{
        productosCarrito.forEach(producto => {
            valor = producto.precio * producto.cantidad;
            card += `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.nombre}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>  
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text"><small class="text-body-secondary">Cantidad: ${producto.cantidad} &nbsp;Valor: $${valor}</small></p>
                </div>
              </div>
            </div>
            <button class="btn btn-link delete-button" onclick="eliminarProducto(${producto.id})">
                <i class="fas fa-times-circle"></i>
            </button>
          </div>
            `;
            carritoDeProductos.innerHTML = card;
            const productoCarrito = crearProductoCarrito(producto);
            productosEnCarrito.push(productoCarrito);
            totalItems += valor;
            total.innerHTML = totalItems;
        });
    }
}

/** Funcion para crear un producto en el carrito */
function crearProductoCarrito(producto) {
    return {
        producto:producto,
    };
}

/** Funcion para vaciar el carrito */
function vaciarCarrito(){
    carrito = [];
    productosEnCarrito = [];
    pintarCarrito();
    total.innerHTML = 0;
}

function eliminarProducto(id) { 
    console.log("Producto a eliminar ID:", id);
    productosEnCarrito = productosEnCarrito.filter(producto => producto.producto.id !== id);
    pintarCarrito();
  }

// /** Funcion para finalizar la compra */
// function finalizarCompra(){
//     vaciarCarrito();
//     alert('Gracias por su compra');
// }

window.onload = () => {
    getCategory();
    getProducts(); 
    getProductos();
}
               