const celdas = document.getElementsByClassName("celda")
const tipoJuego = document.getElementById("tipoJuego")
const botonConfirmar = document.getElementById("botonConfirmar")
const modalMultijugador = document.getElementById("modalMultijugador")
const nombreJugador1 = document.getElementById("nombreJugador1")
const nombreJugador2 = document.getElementById("nombreJugador2")
const botonGuardar = document.getElementById("botonGuardar")
const turno = document.getElementById("turno");
const botonReiniciar = document.getElementById("botonReiniciar")
const botonEstadisticas = document.getElementById("botonEstadisticas")


//Creación de variables
let jugador = true
let jugador1 = "Jugador 1"
let jugador2 = "jugador 2"
//let turnoJugador; Revisar si se debe eliminar
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

        const ganador = revisarGanador();
        if (ganador) {
            juegoActivo = false; 
            turno.textContent = ""; 
            setTimeout(() => {
                alert("¡Ganó " + (ganador === "X" ? jugador1 : jugador2) + "!");
            }, 100);
        } else {
            let tableroLleno = true;
                for (let index = 0; index < celdas.length; index++) {   
                    if (celdas[index].textContent === "") {
                        tableroLleno = false;
                        break;
                    }
                }

            if (tableroLleno) {
                juegoActivo = false;
                turno.textContent = "";
                setTimeout(() => {
                    alert("¡Empate!");
                }, 100);
            } 
        }      
    });
}

botonConfirmar.addEventListener("click", function() { //Botón para confirmar el modo de juego
    const opcionJuego = tipoJuego.value;
    
    if (opcionJuego === "multijugador") { //Opción juego multijugador
        modalMultijugador.style = "display: block";
    }
    else if (opcionJuego === "computadora") {
        window.location.href = "computadora.html"; //Redirige a la página de computadora
    }
});

botonReiniciar.addEventListener("click", function() { //Función para botón reiniciar
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = ""; 
    }

    jugador = true;
    juegoActivo = true;
    turno.textContent = jugador1 + " comienza";
})        

botonGuardar.addEventListener("click", function() { //Botón para guardar los nombres de los jugadores

    const jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
    
    const jug1 = {
        nombre: nombreJugador1.value.trim() || "Jugador 1",
        victorias: 0,
        derrotas: 0,
        empates: 0
    }
            
    const jug2 = {
        nombre: nombreJugador2.value.trim() || "Jugador 2",
        victorias: 0,
        derrotas: 0,
        empates: 0
    }
        
    jugadores.push(jug1);
    jugadores.push(jug2);

    localStorage.setItem("jugadores",JSON.stringify(jugadores));

    jugador1 = jug1.nombre;
    jugador2 = jug2.nombre;
    turno.textContent = nombreJugador1.value + " comienza"; 

    modalMultijugador.style.display = "none"; //Cierra el modal

    nombreJugador1.value = "";
    nombreJugador2.value = "";
})

