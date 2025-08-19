const celdas = document.getElementsByClassName("celda")
const botonReiniciar = document.getElementById("botonReiniciar")
const botonEstadisticas = document.getElementById("botonEstadisticas")

let jugador = true

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

botonReiniciar.addEventListener("click", function() { //Función para botón reiniciar
    for (let index = 0; index < celdas.length; index++) {
        celdas[index].textContent = ""; 
    }
    jugador = true;
})