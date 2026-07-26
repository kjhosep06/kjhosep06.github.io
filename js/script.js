const claveCorrecta = "1904";

let claveIngresada = "";

const casillas = document.querySelectorAll(".casillas-clave input");
const botonesNumericos = document.querySelectorAll("[data-numero]");

const botonBorrar = document.getElementById("borrar");
const botonAceptar = document.getElementById("aceptar");

const ventanaError = document.getElementById("ventanaError");
const botonCerrarError = document.getElementById("cerrarError");

function actualizarCasillas() {
    casillas.forEach((casilla, indice) => {
        casilla.value = claveIngresada[indice] || "";
    });
}

botonesNumericos.forEach((boton) => {
    boton.addEventListener("click", () => {
        if (claveIngresada.length < 4) {
            claveIngresada += boton.dataset.numero;
            actualizarCasillas();
        }
    });
});

botonBorrar.addEventListener("click", () => {
    claveIngresada = claveIngresada.slice(0, -1);
    actualizarCasillas();
});

botonAceptar.addEventListener("click", () => {
    if (claveIngresada.length < 4) {
        mostrarError();
        return;
    }

    if (claveIngresada === claveCorrecta) {
        window.location.href = "paginas/menu.html";
    } else {
        mostrarError();
    }
});

function mostrarError() {
    ventanaError.style.display = "flex";

    claveIngresada = "";
    actualizarCasillas();
}

botonCerrarError.addEventListener("click", () => {
    ventanaError.style.display = "none";
});

ventanaError.addEventListener("click", (evento) => {
    if (evento.target === ventanaError) {
        ventanaError.style.display = "none";
    }
});