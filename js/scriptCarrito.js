let contenedorCarrito = document.getElementById("mainCarrito")
if (localStorage.getItem("carrito")) {
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    for (const producto of carrito) {
        contenedorCarrito.innerHTML += `
        <img src="${"./." + producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
                <h1>${producto.nombre}</h1>
                <p id="precioN${producto.id}">${producto.precio * producto.comprar}$</p>
                <input type="number" value="${producto.comprar}" id="cantidadN${producto.id}" min="0" max="${producto.stock}">
        `
        console.log(document.getElementById("precioN" + producto.id).addEventListener("click", cambioPrecio))
        function cambioPrecio() {
            alert("A")
        }
    }
    contenedorCarrito.innerHTML += `

    `
} else {
    contenedorCarrito.innerHTML = `<h1>No hay productos en el carrito</h1>`
}