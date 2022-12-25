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
let contenedorProductos = document.getElementById("mainpro")
renderizarProductos(productos)
//le pone el evento click a los botones de agregar carrito
for (let i = 0; i < productos.length; i++) {
    let verProductoBoton = document.getElementById("producto" + i + "__boton")
    verProductoBoton.addEventListener("click", verProducto)
    const producto = productos[i]
    function verProducto() {
        sessionStorage.setItem("compra", JSON.stringify(producto))
    }
}
//renderizar el html del array seleccionado
function renderizarProductos(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    //el if revisa si el array esta vacio para que cuando se use el buscador y no se encuentre lo que busco aparezca "No se encontro la busqueda"
    if (arrayDeProductos.length !== 0) {
        for (const producto of arrayDeProductos) {
            contenedorProductos.innerHTML += `
        <div class="mainpro__hijo" id="producto${producto.id}">
            <img src="${producto.imgUrl}" alt="medias de color azul" style="height:200px;width:200px">
            <h2>${producto.nombre}</h2>
            <p>${producto.precio}$</p>
            <button type="button" class="btn btn-primary" id="producto${producto.id}__boton"><a href="./pages/vistaProduc.html">Ver producto</a></button>
        </div>`
        }
    } else {
        contenedorProductos.innerHTML += `<h2 class="noSeEncontro">No se encontro la busqueda</h2>`
    }
}
//Buscador por categoria y nombre del producto
let buscador = document.getElementById("search")
buscador.addEventListener("change", renderizarProductosBuscados)
function renderizarProductosBuscados() {
    if (productos.find(producto=>producto.agregar===true)) {
        renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar===true))
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
                renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar===false))
            } else {
                renderizarFiltrados(false)
            }
        }
        function renderizarFiltrados(agregarSiNo) {
            proFiltradoCate = productos.filter(producto => producto.categoria === cate.innerText.toLowerCase())
            for (const filtrado of proFiltradoCate) {
                filtrado.agregar = agregarSiNo
            }
            renderizarProductos(productos.filter(producto => (producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.includes(buscador.value.toLowerCase())) && producto.agregar===true))
        }
    }
}