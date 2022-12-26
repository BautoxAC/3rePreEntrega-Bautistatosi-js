//Array
let productos = [
    { nombre: "JeansB", id: 0, categoria: "pantalones", stock: 4, precio: 20, imgUrl: "./img/productos/JeansB.png" },
    { nombre: "MediasC", id: 1, categoria: "medias", stock: 10, precio: 30, imgUrl: "./img/productos/MediasC.png" },
    { nombre: "MediasB", id: 2, categoria: "medias", stock: 8, precio: 20, imgUrl: "./img/productos/MediasB.png" },
    { nombre: "Bluney", id: 3, categoria: "remeras", stock: 12, precio: 20, imgUrl: "./img/productos/Bluney.png" },
    { nombre: "PantC", id: 4, categoria: "pantalones", stock: 14, precio: 45, imgUrl: "./img/productos/PantC.png" },
    { nombre: "DarkC", id: 5, categoria: "remeras", stock: 20, precio: 20, imgUrl: "./img/productos/DarkC.png" },
    { nombre: "Celestyn", id: 6, categoria: "accesorios", stock: 3, precio: 20, imgUrl: "./img/productos/Celestyn.png" },
    { nombre: "Celest", id: 7, categoria: "vestidos", stock: 11, precio: 50, imgUrl: "./img/productos/Celest.png" },
    { nombre: "LightE", id: 8, categoria: "remeras", stock: 16, precio: 15, imgUrl: "./img/productos/LightE.png" },
    { nombre: "LightB", id: 9, categoria: "vestidos", stock: 6, precio: 50, imgUrl: "./img/productos/LightB.png" },
    { nombre: "LightE2", id: 10, categoria: "remeras", stock: 7, precio: 20, imgUrl: "./img/productos/LightE2.png" }
]

document.getElementById("reinicio").addEventListener("click", reinicio)
function reinicio() {
    productos = [
        { nombre: "JeansB", id: 0, categoria: "pantalones", stock: 4, precio: 20, imgUrl: "./img/productos/JeansB.png" },
        { nombre: "MediasC", id: 1, categoria: "medias", stock: 10, precio: 30, imgUrl: "./img/productos/MediasC.png" },
        { nombre: "MediasB", id: 2, categoria: "medias", stock: 8, precio: 20, imgUrl: "./img/productos/MediasB.png" },
        { nombre: "Bluney", id: 3, categoria: "remeras", stock: 12, precio: 20, imgUrl: "./img/productos/Bluney.png" },
        { nombre: "PantC", id: 4, categoria: "pantalones", stock: 14, precio: 45, imgUrl: "./img/productos/PantC.png" },
        { nombre: "DarkC", id: 5, categoria: "remeras", stock: 20, precio: 20, imgUrl: "./img/productos/DarkC.png" },
        { nombre: "Celestyn", id: 6, categoria: "accesorios", stock: 3, precio: 20, imgUrl: "./img/productos/Celestyn.png" },
        { nombre: "Celest", id: 7, categoria: "vestidos", stock: 11, precio: 50, imgUrl: "./img/productos/Celest.png" },
        { nombre: "LightE", id: 8, categoria: "remeras", stock: 16, precio: 15, imgUrl: "./img/productos/LightE.png" },
        { nombre: "LightB", id: 9, categoria: "vestidos", stock: 6, precio: 50, imgUrl: "./img/productos/LightB.png" },
        { nombre: "LightE2", id: 10, categoria: "remeras", stock: 7, precio: 20, imgUrl: "./img/productos/LightE2.png" }
    ]
    carrito = []
    localStorage.clear()
    renderizarProductos(productos)
}
let contenedorProductos = document.getElementById("mainpro")
if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
}
renderizarProductos(productos)

//renderizar el html del array seleccionado
function renderizarProductos(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    //el if revisa si el array esta vacio para que cuando se use el buscador y no se encuentre lo que busco aparezca "No se encontro la busqueda"
    if (arrayDeProductos.length !== 0) {
        for (let i = 0; i < arrayDeProductos.length; i++) {
            const producto = arrayDeProductos[i];
            contenedorProductos.innerHTML += `
        <div class="mainpro__hijo" id="producto__id:${producto.id}">
            <img src="${producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
            <h2>${producto.nombre}</h2>
            <p>${producto.precio}$</p>
            <button type="button" class="btn btn-primary" id="producto__N:${i}__boton">Ver producto</button>
        </div>`
        }
    } else {
        contenedorProductos.innerHTML += `<h2 class="noSeEncontro">No se encontro la busqueda</h2>`
    }
    //le pone el evento click a los botones de agregar carrito
    for (let i = 0; i < arrayDeProductos.length; i++) {
        const producto = productos[i]
        let verProductoBoton = document.getElementById("producto__N:" + i + "__boton")
        verProductoBoton.addEventListener("click", verProducto)
        //script para visualizar productos a comprar
        function verProducto() {
            if (producto.stock !== 0) {
                let compra = producto
                contenedorProductos.innerHTML =
                    `<div class="comprarProductoHijo" id="producto${compra.id}">
                <img src="${"./." + compra.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
                <h2>${compra.nombre}</h2>
                <p>${compra.precio}$</p>
                <button type="button" class="btn btn-primary" id="resta">-</button>
                <input type="number" value="0" id="stock" min="0" max="${compra.stock}">
                <button type="button" class="btn btn-primary" id="suma">+</button>
                <br>
                <button type="submit" class="btn btn-primary" id="carrito">Añadir al carrito</button>
            </div>`
                let botonCarrito = document.getElementById("carrito")
                botonCarrito.addEventListener("click", agregarAlCarrito)
                let carrito = []
                document.getElementById("suma").addEventListener("click", suma1)
                document.getElementById("resta").addEventListener("click", resta1)
                let stock = document.getElementById("stock")
                function suma1() {
                    if (compra.stock > stock.value && stock.value >= 0) {
                        stock.value++
                    }
                }
                function resta1() {
                    if (compra.stock >= stock.value && stock.value > 1) {
                        stock.value--
                    }
                }
                function agregarAlCarrito() {
                    if (compra.stock >= stock.value && stock.value >= 1) {
                        compra.stock -= stock.value
                        stock.value = 0
                        stock.max = compra.stock
                        carrito.push({ ...compra, comprar: Number(stock.value) })
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        alert("Compra añadida exitosamente al carrito")
                        if (compra.stock === 0) {
                            productos.splice(productos.indexOf(compra), 1)
                            localStorage.setItem("productos", JSON.stringify(productos))
                            alert("SIN STOCK")
                            renderizarProductos(productos)
                        }
                    } else {
                        alert("El valor debe ser entre 1 y " + compra.stock)
                    }
                }
            }
        }
    }
}
//Buscador por categoria y nombre del producto
let buscador = document.getElementById("search")
buscador.addEventListener("change", renderizarProductosBuscados)
function renderizarProductosBuscados() {
    if (productos.find(producto => producto.agregar === true)) {
        renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === true && producto.stock > 0))
    } else {
        renderizarProductos(productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase()) && producto.stock > 0))
    }
}
let proFiltradoCate = []
let clickeados = 0
//filtrador por categorias
for (let i = 1; i < 6; i++) {
    //agarra la checkbox
    let checkMostrarPorCate = document.getElementById("categoria" + i + "__Checkbox")
    let cate = document.getElementById("categoria" + i)
    checkMostrarPorCate.addEventListener("change", renderizarCate)
    function renderizarCate() {
        //revisa el click en el checkbox
        if (checkMostrarPorCate.checked) {
            clickeados++
            renderizarFiltrados(true)
        } else {
            clickeados--
            //revisa si hay algun checkbox clickeado ya que si no hay ninguno renderiza todo
            if (clickeados < 1) {
                for (const producto of productos) {
                    producto.agregar = false
                }
                renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === false && producto.stock > 0))
            } else {
                renderizarFiltrados(false)
            }
        }
        function renderizarFiltrados(agregarSiNo) {
            proFiltradoCate = productos.filter(producto => producto.categoria === cate.innerText.toLowerCase())
            for (const filtrado of proFiltradoCate) {
                filtrado.agregar = agregarSiNo
            }
            renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === true && producto.stock > 0))
        }
    }
}