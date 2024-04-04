const wrapper = document.querySelector('.selected');
const musicImg = wrapper.querySelector('.imgmsc img');
const musicNome = wrapper.querySelector('.nome');
const musicArtista = wrapper.querySelector('.artista');
const playPauseBtn = wrapper.querySelector('#playPause');
const prevBtn = wrapper.querySelector('#prev');
const nextBtn = wrapper.querySelector('#next');
const mainAudio = wrapper.querySelector('#main-audio');
const progressArea = wrapper.querySelector('.prgss');
const progressBar = wrapper.querySelector('.bar');
const musicCurrentTime = wrapper.querySelector(".mscTempo span");

let musicIndex = Math.floor(Math.random() * allMusic.length);
let isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    musicNome.innerText = allMusic[indexNumb].nome;
    musicArtista.innerText = allMusic[indexNumb].artista;
    musicImg.src = `Songs/${allMusic[indexNumb].src}.jpg`;
    mainAudio.src = `Songs/${allMusic[indexNumb].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    musicImg.classList.add("rotate");
    playPauseBtn.innerHTML = `<img width="100" height="100" src="https://img.icons8.com/ios/100/circled-pause.png" alt="circled-pause"/>`;
    mainAudio.play();   
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    musicImg.classList.remove("rotate");
    playPauseBtn.innerHTML = `<img width="100" height="100" src="https://img.icons8.com/ios/100/circled-play--v1.png" alt="circled-play--v1"/>`;
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = allMusic.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    if (musicIndex >= allMusic.length) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlaying = wrapper.classList.contains("paused");
    isMusicPlaying ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

mainAudio.addEventListener("timeupdate", () => {
    const currentTime = mainAudio.currentTime;
    const duration = mainAudio.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    const musicCurrentTime = wrapper.querySelector(".mscTempo span");
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    const clickedPositionX = e.offsetX; 
    const progressBarWidth = progressArea.clientWidth;
    const clickedProgress = clickedPositionX / progressBarWidth;
    const newTime = mainAudio.duration * clickedProgress;
    mainAudio.currentTime = newTime;
});

mainAudio.addEventListener("ended", () => {
    nextMusic();
});

