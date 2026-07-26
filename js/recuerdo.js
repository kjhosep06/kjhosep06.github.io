const tarjetasReel = document.querySelectorAll(".tarjeta-reel");
const videos = document.querySelectorAll(".video-reel");

let audioActivado = false;

tarjetasReel.forEach((tarjeta) => {
    const videoActual = tarjeta.querySelector(".video-reel");

    tarjeta.addEventListener("mouseenter", () => {
        videos.forEach((video) => {
            if (video !== videoActual) {
                video.pause();
                video.currentTime = 0;
            }
        });

        videoActual.currentTime = 0;
        videoActual.muted = !audioActivado;

        videoActual.play().catch((error) => {
            console.log("El navegador bloqueó la reproducción:", error);
        });
    });

    tarjeta.addEventListener("mouseleave", () => {
        videoActual.pause();
        videoActual.currentTime = 0;
    });

    tarjeta.addEventListener("click", () => {
        audioActivado = true;

        videos.forEach((video) => {
            video.muted = false;
            video.volume = 1;
        });

        videoActual.play().catch((error) => {
            console.log("No se pudo activar el audio:", error);
        });
    });
});