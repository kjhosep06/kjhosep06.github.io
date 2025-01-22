// Selección de los bloques "song" que contienen las imágenes, audios y videos
const songs = document.querySelectorAll(".song");

// Selección del control de volumen
const volumeControl = document.getElementById("volumen-control");

// Inicialización del volumen
const initialVolume = (volumeControl.value / 100) * 0.15;

// Iterar sobre cada bloque de canción
songs.forEach((song) => {
  const audio = song.querySelector("audio"); // Seleccionar el audio relacionado
  const video = song.querySelector(".song-video"); // Seleccionar el video relacionado

  // Asignar el volumen inicial al audio
  audio.volume = initialVolume;

  // Evento al pasar el mouse sobre el bloque
  song.addEventListener("mouseover", () => {
    // Reiniciar y reproducir el audio
    audio.currentTime = 0;
    audio.play();

    // Mostrar y reproducir el video
    if (video) {
      video.currentTime = 0; // Reiniciar el video
      video.classList.add("active"); // Activar la clase para mostrar el video
      video.play(); // Reproducir el video
    } else {
      console.warn("No se encontró ningún video relacionado para este elemento.");
    }
  });

  // Evento al quitar el mouse del bloque
  song.addEventListener("mouseout", () => {
    // Pausar el audio
    audio.pause();

    // Ocultar y pausar el video
    if (video) {
      video.pause();
      video.classList.remove("active"); // Desactivar la clase para ocultar el video
    }
  });
});

// Evento para ajustar el volumen con el control deslizante
volumeControl.addEventListener("input", () => {
  const volume = (volumeControl.value / 100) * 0.15;
  songs.forEach((song) => {
    const audio = song.querySelector("audio");
    audio.volume = volume; // Ajustar el volumen del audio
  });
});