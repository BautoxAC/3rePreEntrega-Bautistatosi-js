//Array
let productos = [
    { nombre: "JeansB", id: 1, categoria: "pantalon", stock: 4, precio: 20, imgUrl: "./img/productos/JeansB.png" },
    { nombre: "MediasC", id: 2, categoria: "medias", stock: 10, precio: 30, imgUrl: "./img/productos/MediasC.png" },
    { nombre: "MediasB", id: 3, categoria: "medias", stock: 8, precio: 20, imgUrl: "./img/productos/MediasB.png" },
    { nombre: "Bluney", id: 4, categoria: "remera", stock: 12, precio: 20, imgUrl: "./img/productos/Bluney.png" },
    { nombre: "PantC", id: 5, categoria: "pantalon", stock: 14, precio: 45, imgUrl: "./img/productos/PantC.png" },
    { nombre: "DarkC", id: 6, categoria: "remera", stock: 20, precio: 20, imgUrl: "./img/productos/DarkC.png" },
    { nombre: "Celestyn", id: 7, categoria: "accesorio", stock: 3, precio: 20, imgUrl: "./img/productos/Celestyn.png" },
    { nombre: "Celest", id: 8, categoria: "vestido", stock: 11, precio: 50, imgUrl: "./img/productos/Celest.png" },
    { nombre: "LightE", id: 9, categoria: "remera", stock: 16, precio: 15, imgUrl: "./img/productos/LightE.png" },
    { nombre: "LightB", id: 11, categoria: "vestido", stock: 6, precio: 50, imgUrl: "./img/productos/LightB.png" },
    { nombre: "LightE2", id: 12, categoria: "remera", stock: 7, precio: 20, imgUrl: "./img/productos/LightE2.png" }
]
let contenedorProductos = document.getElementById("mainpro")
function renderizarProductos(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    for (const producto of arrayDeProductos) {
        contenedorProductos.innerHTML += `
        <div class="mainpro__hijo${producto.id}">
                    <img src="${producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.precio}</p>
                    <button type="button" class="btn btn-primary">Comprar</button>
        </div>`
    }
}
renderizarProductos(productos)
let buscador = document.getElementById("search")
buscador.addEventListener("input", renderizarProductosFiltrados)
function renderizarProductosFiltrados() {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)
    console.log(productosFiltrados)
}