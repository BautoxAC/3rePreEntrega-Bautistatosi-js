let contenedorCarrito = document.getElementById("mainCarrito")
let carrito = []
let total=0
let elementoTotal = document.getElementById("total")
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    for (const producto of carrito) {
        contenedorCarrito.innerHTML += `
        <div>
        <img src="${"./." + producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
                <h1>${producto.nombre}</h1>
                <p id="precioN${producto.id}">${producto.precio * producto.comprar}$</p>
                <input type="number" value="${producto.comprar}" id="cantidadN${producto.id}" min="0" max="${producto.stock}">
        </div>
        `
    }
    for (const producto of carrito) {
        let cant = document.getElementById("cantidadN" + producto.id)
        let precio = document.getElementById("precioN" + producto.id)
        total+= parseInt(precio.innerText)
        cant.addEventListener("change", cambioPrecio)
        function cambioPrecio() {
            precio.innerText = cant.value * producto.precio + "$"
            
        }
    }
    elementoTotal.innerText=total
} else {
    contenedorCarrito.innerHTML = `<h1>No hay productos en el carrito</h1>`
}