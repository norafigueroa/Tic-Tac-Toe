const celdas = document.getElementsByClassName("celda")
const tipoJuego = document.getElementById("tipoJuego")
const botonConfirmar = document.getElementById("botonConfirmar")
const modalMultijugador = document.getElementById("modalMultijugador")
const nombreJugador1 = document.getElementById("nombreJugador1")
const nombreJugador2 = document.getElementById("nombreJugador2")
const botonGuardar = document.getElementById("botonGuardar")
const botonReiniciar = document.getElementById("botonReiniciar")
const botonEstadisticas = document.getElementById("botonEstadisticas")

let jugador = true
let jugador1 = "Jugador 1"
let jugador2 = "jugador 2"
//const jugadores=[]

botonConfirmar.addEventListener("click", function() { //Botón para confirmar el modo de juego
    modalMultijugador.style = "display: block";

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

    modalMultijugador.style = "display: none";

    nombreJugador1.value = "";
    nombreJugador2.value = "";

})

for (let index = 0; index < celdas.length; index++) { 
    const element = celdas[index];
    console.log(element);

    element.addEventListener("click", function() {
        if (element.textContent !=="") {
            return
        }

        if (jugador===true) {
            element.textContent="x"
            jugador=false
        } else{
            element.textContent="0"
            jugador=true
        }  
    })
}

botonReiniciar.addEventListener("click", function() { //Función para botón reiniciar (Revisar si funciona más adelante)
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = ""; 
    }
    jugador = true;
})