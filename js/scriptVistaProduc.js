let contenedorComprar = document.getElementById("comprarProducto")
let compra = JSON.parse(sessionStorage.getItem("compra"))
contenedorComprar.innerHTML =
    `<div class="comprarProductoHijo" id="producto${compra.id}">
            <img src="${"./." + compra.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
            <h2>${compra.nombre}</h2>
            <p>${compra.precio}$</p>
            <button type="button" class="btn btn-primary" id="resta">Añadir al carrito</button>
            <input type="text" value="${compra.stock}">
            <button type="button" class="btn btn-primary" id="suma">Añadir al carrito</button>
            <br>
            <button type="button" class="btn btn-primary" id="carrito">Añadir al carrito</button>
    </div>`
let botonCarrito = document.getElementById("carrito")
botonCarrito.addEventListener("click", agregarAlCarrito)
let carrito = []
function agregarAlCarrito() {
    carrito.push(compra)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}