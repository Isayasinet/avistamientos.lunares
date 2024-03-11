import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://base-de-datos-training-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const avistamientosInDB = ref(database, "avistamientos")

// Seleccion de elementos del formulario
const lugarElemento = document.getElementById("lugar");
const nombreElemento = document.getElementById("nombre");
const comunidadElemento = document.getElementById("comunidad");
const paisElemento = document.getElementById("pais");
const horaElemento = document.getElementById("hora");
const grupoElemento = document.getElementById("grupo");
const fotoElemento = document.getElementById("foto");
const juramentoElemento = document.getElementById("juramento");
const enviarButton = document.querySelector("button[type='submit']");

// Envío del formulario a la base de datos
enviarButton.addEventListener("click", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    if (lugarElemento.value && nombreElemento.value && comunidadElemento.value && paisElemento.value && horaElemento.value && grupoElemento.value) {
        let usuario = {
            lugar: lugarElemento.value,
            nombre: nombreElemento.value,
            comunidad: comunidadElemento.value,
            pais: paisElemento.value,
            hora: horaElemento.value,
            grupo: grupoElemento.value,
        }
        push(avistamientosInDB, usuario)
        console.log("Has hecho clic")
        limpiarValoresInput()
    } else {
        alert("Por favor completa todos los campos requeridos");
    }
})

// Elemento de avistamientos
let avistamientoElemento = document.getElementById("avistados");
const iconoFotoAvistamientos = `src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-gallery-vector-icon-png-image_4279768.jpg"`
onValue(avistamientosInDB, (snapshot) => {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        itemsArray.forEach((item) => {
            let datosAvistamiento = item[1]; // Accede al objeto de datos del avistamiento
            let contenidoHTML =  `<details>
            <summary>${datosAvistamiento.lugar}</summary>
                   <div class="usuarios">
                   <p>Nombre: <span class="bold">${datosAvistamiento.nombre}</span>
                   Comunidad: <span class="bold">${datosAvistamiento.comunidad}</span>
                   Pais: <span class="bold">${datosAvistamiento.pais}</span>
                              Hora: <span class="bold">${datosAvistamiento.hora}</span>
                   Grupo: <span class="bold">${datosAvistamiento.grupo}</span>></p>
                   <p>Foto:<img id="icono-foto" ${iconoFotoAvistamientos}></img></p>
               </div>
                   </details>`;
            console.log(contenidoHTML);
            avistamientoElemento.innerHTML += contenidoHTML
        });
        if (!itemsArray.length) {
            avistamientoElemento.innerText = "No se encontraron avistamientos";
        }
    }
});
// Otras funciones
function limpiarValoresInput() {
    nombreElemento.value = ""
    comunidadElemento.value = ""
    paisElemento.value = ""
    horaElemento.value = ""
    grupoElemento.value = ""
    fotoElemento.value = ""
    juramentoElemento.value = ""
}
//paises

