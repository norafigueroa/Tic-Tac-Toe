const celdas = document.getElementsByClassName("celda");
const modalComputadora = document.getElementById("modalComputadora");
const nombreJugadorInput = document.getElementById("nombreJugador");
const botonGuardar = document.getElementById("botonGuardar");
const turno = document.getElementById("turno");
const tipoJuego = document.getElementById("tipoJuego");
const botonNuevoJuego = document.getElementById("botonNuevoJuego");
const botonReiniciar = document.getElementById("botonReiniciar");
const botonEstadisticas = document.getElementById("botonEstadisticas")

const urlParams = new URLSearchParams(window.location.search);
const modo = urlParams.get("modo"); 

  if (modo === "computadora") {
    modalComputadora.style.display = "block";
    // Abre automáticamente el modal cuando se redirige de multijugador 
  }

//Creación de variables
let jugadorComp = "";   
let juegoActivo = true; 
let turnoJugador = true;  

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
    const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);

    if (jugadorExistente) {
        if (resultado === "victoria") jugadorExistente.victorias += 1;
        if (resultado === "derrota") jugadorExistente.derrotas += 1;
        if (resultado === "empate") jugadorExistente.empates += 1;
    } else {
        const nuevoJugador = {
          nombre: nombre,
          victorias: 0,
          derrotas: 0,
          empates: 0
        };

        if (resultado === "victoria") nuevoJugador.victorias = 1;
        if (resultado === "derrota") nuevoJugador.derrotas = 1;
        if (resultado === "empate") nuevoJugador.empates = 1;

        jugadores.push(nuevoJugador);
      }
      
      guardarJugadores(jugadores);
}

function revisarGanador() {
  for (const comb of combinacionesGanadoras) {
    const [a,b,c] = comb;

    if (celdas[a].textContent !== "" &&
        celdas[a].textContent === celdas[b].textContent &&
        celdas[a].textContent === celdas[c].textContent
      ) {
          return celdas[a].textContent;
    }
  }
  return null;
}

function verificarResultado() {  
    const ganador = revisarGanador();  

    if (ganador) {
        juegoActivo = false;  
        turno.textContent = "";  
        setTimeout(() => {
            alert("¡Ganó " + (ganador === "X" ? jugadorComp : "Computadora") + "!");

            if (ganador === "X") {
                actualizarEstadisticas(jugadorComp, "victoria");
            } else {
                actualizarEstadisticas(jugadorComp, "derrota");
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
            actualizarEstadisticas(jugadorComp, "empate");
        }, 100);

        return true;
    }

    return false;
}

function jugadaComputadora() { //Función juego aleatorio de la computadora
  if (!juegoActivo) return;

  let disponibles = [];
  for (let index = 0; index < celdas.length; index++) {
    if (celdas[index].textContent === "") {
      disponibles.push(index);
    }
  }

  if (disponibles.length === 0) return;

  const index = disponibles[Math.floor(Math.random() * disponibles.length)];
  celdas[index].textContent = "O"; // La computadora siempre juega "O"
}

function clickJugador(event) {
  const celda = event.target;
  if (!juegoActivo || !turnoJugador || celda.textContent !== "") return; //No marcar en celdas ocupadas

  celda.textContent = "X"; // El jugador siempre juega con "X"

  if (verificarResultado()) return;

  turnoJugador = false;                
  turno.textContent = "Juega Computadora"

  for (let index = 0; index < celdas.length; index++) {
    celdas[index].style.pointerEvents = "none";
  }

  setTimeout(() => {
    jugadaComputadora();
    if (verificarResultado()) return;

    turnoJugador = true; //Devuelve el turno al jugador
    turno.textContent = jugadorComp + " juega";

    for (let index = 0; index < celdas.length; index++) {
        celdas[index].style.pointerEvents = "auto";
    }

    }, 300); 
}

botonGuardar.addEventListener("click", function() { //Función para botón guardar
  jugadorComp = nombreJugadorInput.value.trim() || "Jugador 1";

  const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
  const jugadorObjeto = {
      nombre: jugadorComp,
      victorias: 0,
      derrotas: 0,
      empates: 0
  };

  jugadores.push(jugadorObjeto);
  localStorage.setItem("jugadores", JSON.stringify(jugadores));

  modalComputadora.style.display = "none"; // Ocultar modal
  nombreJugadorInput.value = "";
  turno.textContent = jugadorComp + " comienza"; 
  botonNuevoJuego.style.display = "inline-block";
});

botonReiniciar.addEventListener("click", function() {
  for (let index = 0; index < celdas.length; index++) {
    celdas[index].textContent = "";
  }
  juegoActivo = true;
  turnoJugador = true; 
  turno.textContent = "";

});

tipoJuego.addEventListener("change", function() {
  const opcion = tipoJuego.value;

  if (opcion === "computadora") {
    modalComputadora.style.display = "block"; // Se muestra modal al elegir opción computadora
  } else if (opcion === "multijugador") {
    window.location.href = "multijugador.html?modo=multijugador&abrirModal=true"; // Redirige a opción multijugador
  }
});

for (let index = 0; index < celdas.length; index++) {
  celdas[index].addEventListener("click", clickJugador);
}

botonNuevoJuego.addEventListener("click", function() {
  modalComputadora.style.display = "block"; // Abrir modal
  turno.textContent = "";
  juegoActivo = true;
  turnoJugador = true;
  for (let index = 0; index < celdas.length; index++) {
    celdas[index].textContent = "";
  }
  botonNuevoJuego.style.display = "none"; // Ocultar hasta que se guarde nuevo nombre
});