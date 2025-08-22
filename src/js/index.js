const instrucciones = document.getElementById("instrucciones");
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrar");

instrucciones.addEventListener("click", () => { //Abre modal de instrucciones
  modal.style.display = "block";
});

cerrar.addEventListener("click", () => { //Cerrar modal de instrucciones
  modal.style.display = "none";
});

