const celdas = document.getElementsByClassName("celda");
const modalComputadora = document.getElementById("modalComputadora");
const nombreJugadorInput = document.getElementById("nombreJugador");
const botonGuardar = document.getElementById("botonGuardar");
const turno = document.getElementById("turno");
const tipoJuego = document.getElementById("tipoJuego");
const botonConfirmar = document.getElementById("botonConfirmar");
const botonReiniciar = document.getElementById("botonReiniciar");
const botonEstadisticas = document.getElementById("botonEstadisticas")

//Creación de variables
let jugadorComp = "";   
let juegoActivo = true; 

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

function revisarGanador() { //Función para definir ganador
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
  if (!juegoActivo || celda.textContent !== "") return;

  celda.textContent = "X"; // El jugador siempre juega con "X"

  let ganador = revisarGanador();
  if (ganador) {
    juegoActivo = false;
    setTimeout(() => {
      alert("¡Ganó " + (ganador === "X" ? jugadorComp : "Computadora") + "!");
    }, 100);
    return;
  }

  // Si tablero no lleno, turno de computadora
  let tableroLleno = Array.from(celdas).every(celda => celda.textContent !== "");
  if (!tableroLleno) {
    setTimeout(() => {
      jugadaComputadora();

      ganador = revisarGanador(); //Victoria
      if (ganador) {
        juegoActivo = false;
        setTimeout(() => {
          alert("¡Ganó " + (ganador === "X" ? jugadorComp : "Computadora") + "!");
        }, 100);
        return;
      }

      tableroLleno = Array.from(celdas).every(c => c.textContent !== ""); //Empate
      if (tableroLleno) {
        juegoActivo = false;
        setTimeout(() => alert("¡Empate!"), 100);
      }
    }, 300); 
  }
}

botonConfirmar.addEventListener("click", function () { //Función para botón confirmar 
  const opcion = tipoJuego.value;

  if (opcion === "computadora") { //Abre modal para juego contra computadora
    modalComputadora.style.display = "block";
  } else if (opcion === "multijugador") { //Redirige a la página de multijugador
    window.location.href = "./multijugador.html";
  }
});

botonGuardar.addEventListener("click", function() { //Función para botón guardar
  jugadorComp = nombreJugadorInput.value.trim() || "Jugador 1";

  modalComputadora.style.display = "none"; // Ocultar modal
  nombreJugadorInput.value = "";

  
  for (let index = 0; index < celdas.length; index++) {
    celdas[index].addEventListener("click", clickJugador);
  }

  turno.textContent = jugadorComp + " comienza"; 
});

botonReiniciar.addEventListener("click", function() {
  for (let index = 0; index < celdas.length; index++) {
    celdas[index].textContent = "";
  }
  juegoActivo = true;
  turno.textContent = "";
});