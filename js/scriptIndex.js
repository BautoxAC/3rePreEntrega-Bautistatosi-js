//Array
//ordenar por categoriay alfabeticamente dentro de esa categoria
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
let reini = document.getElementById("reinicio")
reini.addEventListener("click", reinicio)
let carrito = []
let utiliadesIndex = document.getElementById("utilidades")
let tituloIndex = document.getElementById("h1")
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
    location.reload()
}
let contenedorProductos = document.getElementById("mainpro")
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
} else {
    localStorage.setItem("productos", JSON.stringify(productos))
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
            <img src="${producto.imgUrl}" alt="medias de color azul" class="mainpro__hijo__img">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}$</p>
            <button type="button" class="btn btn-primary" id="producto__N:${i}__boton">Ver producto</button>
        </div>`
        }
    } else {
        contenedorProductos.innerHTML += `<h3 class="noSeEncontro">No se encontro la busqueda</h3>`
    }
    //le pone el evento click a los botones de agregar carrito
    for (let i = 0; i < arrayDeProductos.length; i++) {
        const producto = productos[i]
        if (typeof (producto.disponible) === "undefined") {
            producto.disponible = producto.stock
        }
        let verProductoBoton = document.getElementById("producto__N:" + i + "__boton")
        if (producto.stock === 0) {
            verProductoBoton.innerText = "Sin Stock"
        } else {
            verProductoBoton.addEventListener("click", verProducto)
        }
        //script para visualizar productos a comprar
        function verProducto() {
            utiliadesIndex.id = "noMostrar"
            tituloIndex.id = "noMostrar"
            reini.id="noMostrar"
            let compra = producto
            contenedorProductos.innerHTML =
                `<div class="comprarProductoHijo" id="producto${compra.id}">
                <img src="${compra.imgUrl}" alt="medias de color azul" class="comprarProductoHijo__img">
                <section class="comprarProductoHijo__section">
                <h2>${compra.nombre}</h2>
                <p>Precio: ${compra.precio}$</p>
                <p id="disponibleTexto">Disponibles: ${compra.disponible} unidades</p>
                <button type="button" class="btn btn-primary" id="resta">-</button>
                <input type="number" value="0" id="stock" min="0" max="${compra.disponible}">
                <button type="button" class="btn btn-primary" id="suma">+</button>
                <button type="submit" class="btn btn-primary" id="carrito">Añadir al carrito</button>
                <button type="button" class="btn btn-primary" id="volver">Volver</button>
                </section>
                </div>`
            document.getElementById("volver").addEventListener("click", volver)
            function volver() {
                renderizarProductos(productos)
                utiliadesIndex.id = "utilidades"
                tituloIndex.id = "h1"
                reini.id="reinicio"
            }
            let botonCarrito = document.getElementById("carrito")
            let disponibleTexto = document.getElementById("disponibleTexto")
            botonCarrito.addEventListener("click", agregarAlCarrito)
            document.getElementById("suma").addEventListener("click", suma1)
            document.getElementById("resta").addEventListener("click", resta1)
            let stock = document.getElementById("stock")
            function suma1() {
                if (compra.disponible > stock.value && stock.value >= 0) {
                    stock.value++
                }
            }
            function resta1() {
                if (compra.disponible >= stock.value && stock.value > 1) {
                    stock.value--
                }
            }
            function agregarAlCarrito() {
                if (compra.disponible === 0) {
                    alert("No puedes agregar más items de este producto\nEstan todos los disponibles en el carrito")
                } else {
                    if (compra.disponible >= stock.value && stock.value >= 1) {
                        compra.disponible -= stock.value
                        if (carrito.find(producto => producto.id === compra.id)) {
                            let repetido = carrito[carrito.indexOf(carrito.find(producto => producto.id === compra.id))]
                            repetido.disponible = compra.disponible
                            repetido.comprar += Number(stock.value)
                        } else {
                            carrito.push({ ...compra, comprar: Number(stock.value) })
                        }
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        alert("Compra añadida exitosamente al carrito")
                        if (compra.disponible === 0) {
                            compra.sinStock = true
                            alert("SIN STOCK DISPONIBLE DEL PRODUCTO")
                            utiliadesIndex.id = "utilidades"
                            tituloIndex.id = "h1"
                            reini.id="reinicio"
                            renderizarProductos(productos)
                        }
                        disponibleTexto.innerText = "disponibles: " + compra.disponible
                        localStorage.setItem("productos", JSON.stringify(productos))
                        stock.value = 0
                    } else {
                        alert("El valor debe ser entre 1 y " + compra.disponible || compra.stock)
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
        renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === true))
    } else {
        renderizarProductos(productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())))
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
                renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === false))
            } else {
                renderizarFiltrados(false)
            }
        }
        function renderizarFiltrados(agregarSiNo) {
            proFiltradoCate = productos.filter(producto => producto.categoria === cate.innerText.toLowerCase())
            for (const filtrado of proFiltradoCate) {
                filtrado.agregar = agregarSiNo
            }
            renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar === true))
        }
    }
}
