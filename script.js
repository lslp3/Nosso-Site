const videos = [
  {
    title: "Vídeo 1",
    description: "Primeiro vídeo local.",
    file: "video1.mp4",
    thumb: "images/img8.jpg"
  },
  {
    title: "Vídeo 2",
    description: "Segundo vídeo interessante.",
    file: "video2.mp4",
    thumb: "images/img9.jpg"
  },
  {
    title: "Vídeo 3",
    description: "Mais um vídeo para assistir.",
    file: "video3.mp4",
    thumb: "images/img10.jpg"
  }
];

const container = document.getElementById("cardsContainer");
const fullscreenContainer = document.getElementById("fullscreenContainer");

// Cria os cards
videos.forEach(video => {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `
    <img src="${video.thumb}" alt="Thumbnail" class="thumbnail" data-video="${video.file}">
    <div class="card-content">
      <h2>${video.title}</h2>
      <p>${video.description}</p>
    </div>
  `;
  container.appendChild(card);
});

// Evento de clique para fullscreen
container.addEventListener("click", function (e) {
  if (e.target.classList.contains("thumbnail")) {
    const videoFile = e.target.getAttribute("data-video");

    // Cria e configura o vídeo
    const video = document.createElement("video");
    video.src = videoFile;
    video.controls = true;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "100%";

    // Limpa container anterior e adiciona o novo vídeo
    fullscreenContainer.innerHTML = "";
    fullscreenContainer.appendChild(video);
    fullscreenContainer.style.display = "block";

    // Tenta colocar em tela cheia
    if (fullscreenContainer.requestFullscreen) {
      fullscreenContainer.requestFullscreen();
    } else if (fullscreenContainer.webkitRequestFullscreen) {
      fullscreenContainer.webkitRequestFullscreen();
    } else if (fullscreenContainer.msRequestFullscreen) {
      fullscreenContainer.msRequestFullscreen();
    }

    // Remove vídeo ao sair do fullscreen
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        video.pause();
        fullscreenContainer.innerHTML = "";
        fullscreenContainer.style.display = "none";
      }
    });
  }
});
