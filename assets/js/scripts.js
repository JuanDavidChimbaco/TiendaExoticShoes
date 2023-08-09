async function getCategory() {
    try {
    let response = await axios.get('http://localhost:8000/api/v1.0/categorias')
    let data = await response.data;
    console.log(data);
    let item = "";
    data.forEach((element) => {
        item += `
            <li><a href="#" class="dropdown-item">${element.nombre}</a></li>
        `
    });
    categorias.innerHTML = item;
    } catch (error) {
    console.log(error);
    }
}

async function getProducts() {
    try {
    let response = await axios.get('http://localhost:8000/api/v1.0/productos')
    let data = await response.data;
    console.log(data);
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
              <button class="btn btn-outline-dark" onclick="agregarAlCarrito(${element.id})">Al Carrito</button>
            </div>
          </div>
        </div>
      </div>`
    });
    productos.innerHTML = item;
    } catch (error) {
    console.log(error);
    }
}

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

/**
 * Funcion para que el boton me lleve a la parte superiror de la pagina
 */
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

window.onload = () => {
    getCategory();
    getProducts(); 
}
               