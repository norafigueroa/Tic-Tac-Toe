const celdas = document.getElementsByClassName("celda")
const tipoJuego = document.getElementById("tipoJuego")
const modalMultijugador = document.getElementById("modalMultijugador")
const nombreJugador1 = document.getElementById("nombreJugador1")
const nombreJugador2 = document.getElementById("nombreJugador2")
const botonGuardar = document.getElementById("botonGuardar")
const turno = document.getElementById("turno");
const botonNuevoJuego = document.getElementById("botonNuevoJuego");
const botonReiniciar = document.getElementById("botonReiniciar")
const botonEstadisticas = document.getElementById("botonEstadisticas")
const mostrarEstadisticas = document.getElementById("mostrarEstadisticas")

const urlParams = new URLSearchParams(window.location.search);
const abrirModal = urlParams.get("abrirModal");

if (abrirModal === "true") {
    modalMultijugador.style.display = "block";
    // Abre automáticamente el modal cuando se redirige de computadora
}

//Creación de variables
let jugador = true
let jugador1 = "Jugador 1"
let jugador2 = "jugador 2"
let juegoActivo = false;

const combinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function obtenerJugadores() {
    return JSON.parse(localStorage.getItem("jugadores")) || [];
}

function guardarJugadores(lista) {
    localStorage.setItem("jugadores", JSON.stringify(lista));
}

function actualizarEstadisticas(nombre, resultado) {
    const jugadores = obtenerJugadores();
    let jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);

    if (jugadorExistente) {
        if (resultado === "victoria") jugadorExistente.victorias += 1;
        if (resultado === "derrota") jugadorExistente.derrotas += 1;
        if (resultado === "empate") jugadorExistente.empates += 1;
    } else {
        const nuevoJugador = {nombre, victorias:0, derrotas:0, empates:0};
        if (resultado === "victoria") nuevoJugador.victorias = 1;
        if (resultado === "derrota") nuevoJugador.derrotas = 1;
        if (resultado === "empate") nuevoJugador.empates = 1;
        jugadores.push(nuevoJugador);
    }

    guardarJugadores(jugadores);
}

function verificarResultado() {  
    const ganador = revisarGanador();  

    if (ganador) {
        juegoActivo = false;  
        turno.textContent = "";  
        setTimeout(() => {
            alert("¡Ganó " + (ganador === "X" ? jugador1 : jugador2) + "!");
            if (ganador === "X") {
                actualizarEstadisticas(jugador1, "victoria");
                actualizarEstadisticas(jugador2, "derrota");
            } else {
                actualizarEstadisticas(jugador2, "victoria");
                actualizarEstadisticas(jugador1, "derrota");
            }
        }, 100);

        return true;
    }

    let tableroLleno = Array.from(celdas).every(celda => celda.textContent !== "");
    if (tableroLleno) {
        juegoActivo = false;
        turno.textContent = "";
        setTimeout(() => {
            alert("¡Empate!");
            actualizarEstadisticas(jugador1, "empate");
            actualizarEstadisticas(jugador2, "empate");
        }, 100);

        return true;
    }

    return false;
}

function revisarGanador() { //Función para definir ganador

  for (const combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;

    if (
      celdas[a].textContent !== "" &&
      celdas[a].textContent === celdas[b].textContent &&
      celdas[a].textContent === celdas[c].textContent
    ) {
      return celdas[a].textContent; 
    }
  }
  return null; 
}

for (let index = 0; index < celdas.length; index++) { 
    const element = celdas[index];

    element.addEventListener("click", function() {
        if (!juegoActivo) 
            return;

        if (element.textContent !=="")
            return;

        if (jugador===true) {
            element.textContent="X";
            jugador=false;
            turno.textContent = "Es el turno de: " + jugador2;
        } else{
            element.textContent="O";
            jugador=true;
            turno.textContent = "Es el turno de: " + jugador1;
            } 

        verificarResultado();            
    });
}

tipoJuego.addEventListener("change", function() { 
    const opcionJuego = tipoJuego.value;

    if (opcionJuego === "multijugador") {
        modalMultijugador.style.display = "block";
    } 
    else if (opcionJuego === "computadora") {
        window.location.href = "computadora.html?modo=computadora";
    }
});    

botonGuardar.addEventListener("click", function() { //Botón para guardar los nombres de los jugadores

    const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

    const nombre1 = nombreJugador1.value.trim() || "Jugador 1";
    const nombre2 = nombreJugador2.value.trim() || "Jugador 2";

    if (!jugadores.some(jugador => jugador.nombre === nombre1)) {
        jugadores.push({ 
            nombre: nombre1, 
            victorias: 0, 
            derrotas: 0, 
            empates: 0 
        });
    }
    if (!jugadores.some(jugador => jugador.nombre === nombre2)) {
        jugadores.push({ 
            nombre: nombre2, 
            victorias: 0, 
            derrotas: 0, 
            empates: 0 
        });
    }

    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    jugador1 = nombre1;
    jugador2 = nombre2;
    turno.textContent = jugador1 + " comienza";

    modalMultijugador.style.display = "none";
    botonNuevoJuego.style.display = "inline-block";

    nombreJugador1.value = "";
    nombreJugador2.value = "";

    juegoActivo = true;
})

botonReiniciar.addEventListener("click", function() {
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = "";
    }
    jugador = true;
    juegoActivo = true;
    turno.textContent = jugador1 + " comienza";
});

    botonNuevoJuego.addEventListener("click", function() {

    modalMultijugador.style.display = "block"; //Muestra modal para ingresar nuevos nombres

    botonNuevoJuego.style.display = "none"; //Oculta el botón mientras se ingresan nombres

    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = "";
    }
    juegoActivo = true;
    jugador = true;
    turno.textContent = "";
});

botonEstadisticas.addEventListener("click", function() {
    mostrarEstadisticas.style.display = "block";
    mostrarEstadisticas.innerHTML = "";

    const usuarios = JSON.parse(localStorage.getItem("jugadores")) || [];

    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];

        const informacionUsuario = document.createElement("p");
        informacionUsuario.textContent = 
            "Nombre: " + element.nombre +
            " | Victorias: " + element.victorias +
            " | Derrotas: " + element.derrotas +
            " | Empates: " + element.empates;

        mostrarEstadisticas.appendChild(informacionUsuario);
    }
});