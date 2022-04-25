//Variables 
const listaFrutas = document.querySelector("#lista-frutas");
const tbodyCarrito = document.querySelector("tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let elementosCarrito = [];
const tdTotal = document.querySelector("#total");
let total = 0;



//cargar eventos 
cargarEventos();
function cargarEventos(){

    //para agregar fruta al carrito
    listaFrutas.addEventListener("click", agregarFruta);

    document.addEventListener("DOMContentLoaded", ()=>{
        elementosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

        mostrarCarrito();
    })

    //tbodyCarrito.addEventListener("click", eliminarFruta);

    vaciarCarrito.addEventListener("click", eliminarElementos);

};

//funciones
function agregarFruta(e){
    if(e.target.classList.contains("agregar-carrito")){
        const frutaSeleccionada = e.target.parentElement;
        agregarAlCarrito(frutaSeleccionada);
    };
};

function agregarAlCarrito(fruta){ 
    const infoFruta = {
        imagen: fruta.querySelector("img").src,
        titulo: fruta.querySelector("h4").textContent,
        precio: parseInt(fruta.querySelector("p").textContent),
        id: fruta.querySelector("button").getAttribute("data-id"),
        cantidad: 1,
    };

    total = total + infoFruta.precio;
    tdTotal.textContent = total;

    elementosCarrito = [...elementosCarrito, infoFruta];//agrega las frutas al carrito, pero todavia no lo muestra en el HTML
    
    mostrarCarrito(elementosCarrito);
    
};


function mostrarCarrito(){
    
    limpiarHTML();

    elementosCarrito.forEach(fruta =>{


        const tr = document.createElement("tr");
        tr.classList.add("producto-fila-carrito");
        tr.innerHTML = `
         
            <td> ${fruta.titulo} </td>
            <td> ${fruta.precio} </td>
            <td> ${fruta.cantidad} </td>
            <td> 
                <button class="borrar-fruta" data-id="${fruta.id}"> X </button>
            </td>

        `;
        tbodyCarrito.appendChild(tr);
    

    })

    sincronizarStorage();

}

function eliminarFruta(e){
    if(e.target.classList.contains("borrar-fruta")){
        const frutaId = e.target.getAttribute("data-id");
        elementosCarrito = elementosCarrito.filter(fruta => fruta.id !== frutaId);
        mostrarCarrito();
    }
}

function limpiarHTML(){
    while(tbodyCarrito.firstChild){
        tbodyCarrito.removeChild(tbodyCarrito.firstChild);
    }
}

function eliminarElementos(){

    elementosCarrito = [];
    limpiarHTML();

    total = 0;
    tdTotal.textContent = total;

    sincronizarStorage();
}

function borrarElemento(){
    console.log("eliminando fruta")
}

function sincronizarStorage(){
    
    localStorage.setItem("carrito", JSON.stringify(elementosCarrito));
    

}







