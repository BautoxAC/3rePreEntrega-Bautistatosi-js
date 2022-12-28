let contenedorCarrito = document.getElementById("mainCarrito")
let carrito = []
let total = []

let elementoTotal = document.getElementById("total")
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    for (const producto of carrito) {
        contenedorCarrito.innerHTML += `
        <div>
        <img src="${"./." + producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
                <h1>${producto.nombre}</h1>
                <p id="precioN${producto.id}">${producto.precio * producto.comprar}$</p>
                <p id="precioUniN${producto.id}">Precio Unitatio: ${producto.precio}$</p>
                <input type="number" value="${producto.comprar}" id="cantidadN${producto.id}" min="0" max="${producto.stock}">
        </div>
        `
    }
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        let cant = document.getElementById("cantidadN" + producto.id)
        let precio = document.getElementById("precioN" + producto.id)
        precio.innerText = cant.value * producto.precio + "$"
        total.push(precio.innerText)
        cant.addEventListener("change", cambioPrecio)
        function cambioPrecio() {
            precio.innerText = cant.value * producto.precio + "$"
            total[i]=parseInt(precio.innerText)
            elementoTotal.innerText = total.reduce((acumulador,producto)=> acumulador+parseInt(producto),0)
        }
    }
    elementoTotal.innerText = total.reduce((acumulador,producto)=> acumulador+parseInt(producto),0)+"$"
} else {
    contenedorCarrito.innerHTML = `<h1>No hay productos en el carrito</h1>`
}