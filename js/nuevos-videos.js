const tarjetas = document.querySelectorAll(".tarjeta-video");
const videos = document.querySelectorAll(".video");
const tituloPrincipal = document.getElementById("tituloPrincipal");

const fondoOriginal = getComputedStyle(document.body).backgroundImage;
const tituloOriginal = tituloPrincipal.textContent;

const clasesTema = [
    "tema-lalaland",
    "tema-teenbeach",
    "tema-coraline"
];

let audioActivado = false;

tarjetas.forEach((tarjeta) => {
    const videoActual = tarjeta.querySelector(".video");

    const fondoRelacionado = tarjeta.dataset.fondo;
    const tiempoInicio = Number(tarjeta.dataset.inicio) || 0;
    const tituloRelacionado = tarjeta.dataset.titulo;
    const temaRelacionado = tarjeta.dataset.tema;

    tarjeta.addEventListener("mouseenter", () => {
        // Atenúa las otras tarjetas
        tarjetas.forEach((otraTarjeta) => {
            if (otraTarjeta !== tarjeta) {
                otraTarjeta.classList.add("atenuada");
            }
        });

        // Detiene los demás videos
        videos.forEach((video) => {
            if (video !== videoActual) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Cambia el fondo
        document.body.style.backgroundImage =
            `url("${fondoRelacionado}")`;

        document.body.classList.add("fondo-activo");

        // Cambia el texto del título
        tituloPrincipal.textContent =
            tituloRelacionado || tituloOriginal;

        // Elimina temas anteriores
        tituloPrincipal.classList.remove(...clasesTema);

        // Aplica el tema correspondiente
        if (temaRelacionado) {
            tituloPrincipal.classList.add(
                `tema-${temaRelacionado}`
            );
        }

        // Reproduce desde el segundo configurado
        videoActual.currentTime = tiempoInicio;
        videoActual.muted = !audioActivado;
        videoActual.volume = 1;

        videoActual.play().catch((error) => {
            console.log(
                "No se pudo reproducir el video:",
                error
            );
        });
    });

    tarjeta.addEventListener("mouseleave", () => {
        // Pausa y vuelve al segundo configurado
        videoActual.pause();
        videoActual.currentTime = tiempoInicio;

        // Restaura todas las tarjetas
        tarjetas.forEach((otraTarjeta) => {
            otraTarjeta.classList.remove("atenuada");
        });

        // Recupera el fondo original de Snoopy
        document.body.style.backgroundImage = fondoOriginal;
        document.body.classList.remove("fondo-activo");

        // Recupera el título original
        tituloPrincipal.textContent = tituloOriginal;
        tituloPrincipal.classList.remove(...clasesTema);
    });

    tarjeta.addEventListener("click", () => {
        // El primer clic activa el audio para todos los reels
        audioActivado = true;

        videos.forEach((video) => {
            video.muted = false;
            video.volume = 1;
        });

        videoActual.muted = false;
        videoActual.volume = 1;

        videoActual.play().catch((error) => {
            console.log(
                "No se pudo activar el audio:",
                error
            );
        });
    });
});