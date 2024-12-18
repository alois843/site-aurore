// music.js

// Variables pour le lecteur et les boutons
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentTrackIndex = -1; // Index actuel de la chanson en cours

// Génération automatique du tableau des musiques depuis les éléments HTML
let tracks = [];
const musicItems = document.querySelectorAll('.music-item');

// Parcours des musiques pour remplir le tableau "tracks"
musicItems.forEach(item => {
    const audioSrc = item.getAttribute('data-audio');
    const title = item.getAttribute('data-title');
    const artist = item.getAttribute('data-artist');

    tracks.push({ src: audioSrc, title: title, artist: artist });
});

// Fonction pour changer de chanson
function changeTrack(index) {
    currentTrackIndex = index;
    audioSource.src = tracks[index].src; // Met à jour la source de l'audio
    audioPlayer.load(); // Recharge le fichier audio
    audioPlayer.play(); // Joue la musique

    // Mettre à jour le titre de la chanson au-dessus du lecteur
    const currentTrackTitle = document.getElementById('current-track-title');
    currentTrackTitle.innerText = `${tracks[index].title} - ${tracks[index].artist}`;

    playPauseButton.innerText = "Pause"; // Change le bouton en "Pause"
}

// Gestion du clic sur chaque musique
musicItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        changeTrack(index); // Change la chanson au clic
    });
});

// Contrôles du lecteur : Play/Pause
playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play(); // Joue la musique
        playPauseButton.innerText = "Pause"; // Change le bouton
    } else {
        audioPlayer.pause(); // Met en pause
        playPauseButton.innerText = "Play"; // Change le bouton
    }
});

// Contrôles du lecteur : Précédent
prevButton.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        changeTrack(currentTrackIndex - 1); // Reculer d'une chanson
    }
});

// Contrôles du lecteur : Suivant
nextButton.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        changeTrack(currentTrackIndex + 1); // Avancer d'une chanson
    }
});
