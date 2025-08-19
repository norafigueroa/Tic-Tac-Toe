const inciar = document.getElementById("iniciar");
const instrucciones = document.getElementById("instrucciones");

instrucciones.addEventListener("click", function () { //Función botón instrucciones
   
    const ventana = window.open("", "Instrucciones", "width=400,height=400,scrollbars=yes"); //Modal instrucciones

    const doc = ventana.document; 
    doc.body.innerHTML = "";

    const titulo = doc.createElement("h2");
    titulo.textContent = "Instrucciones";

    const parrafo = doc.createElement("p");
    parrafo.textContent = "Tic-Tac-Toe (Gato) es un juego para 2 jugadores. El objetivo es alinear 3 símbolos iguales (X o O) en horizontal, vertical o diagonal. Si el tablero se llena sin que nadie consiga la línea, termina en empate.";

    const botonCerrar = doc.createElement("button");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.addEventListener("click", () => ventana.close());

    doc.body.appendChild(titulo);
    doc.body.appendChild(parrafo);
    doc.body.appendChild(botonCerrar);
})

