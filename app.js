
const player = new MusicPlayer(musicList);


const image = document.querySelector('.music-cover')
const title = document.querySelector('.music-song')
const singer = document.querySelector('.music-singer')
const audio = document.querySelector('#audio')

const play = document.querySelector('.music-play')
const playIcon = document.querySelector('.music-play-i')
const next = document.querySelector('.music-next')
const previous = document.querySelector('.music-previous')

const currentTime = document.querySelector('#current-time')
const duration = document.querySelector('#duration')
const progressBar = document.querySelector('#progress-bar')

const volumeBar = document.querySelector('#volume-bar')
const muteButton = document.querySelector('.mute-button')

const musicPlaylist = document.querySelector('.music-list')
let isMusicPlaying = false;


window.addEventListener('load', () => {

    progressBar.value = 0
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList()

});

function displayMusic(music) {
    title.innerText = music.title
    singer.innerText = music.singer
    image.src = `img/${music.thumbnail}`
    audio.src = `mp3/${music.file}`



    durationAndCurrentTimeDisplay()
}

function displayMusicList() {
    let index = 0;
    for (const song of musicList) {

        let liTag = `
        <li onclick="selectSong(${index})" class="list-group-item d-flex justify-content-between align-items-center">
            <span><strong> ${song.title} </strong> - ${song.singer}</span>
            <span class="song-duration-${index} badge bg-primary rounded-pill">0:00</span>
            <audio class="song-${index}" src="mp3/${song.file}"></audio>
        </li>
        `
        musicPlaylist.insertAdjacentHTML("beforeend", liTag)
        let liAudioDuration = document.querySelector(`.song-duration-${index}`)
        let audioTag = document.querySelector(`.song-${index}`);


        audioTag.addEventListener("loadeddata", () => {
            liAudioDuration.textContent = calculateAudioCurrentTime(audioTag.duration)
        })

        index++
    }
}

function selectSong(songIndex) {

    player.index = songIndex;
    let music = player.getMusic();
    displayMusic(music)
    playMusic()

}

function durationAndCurrentTimeDisplay() {

    audio.addEventListener("loadedmetadata", () => { // Audio yüklendiğinde tetiklenen event

        duration.innerHTML = calculateAudioDuration(audio.duration)

        // Current Time
        audio.addEventListener('timeupdate', () => { // Current time her değiştiğinde tetiklenen event
            currentTime.innerHTML = calculateAudioCurrentTime(audio.currentTime)
            progressBarDisplay()
            autoPlay()
        })
    })
}

function playMusic() {

    audio.play()
    isMusicPlaying = true;
    playIcon.classList.replace('fa-play', 'fa-pause')

}

function pauseMusic() {

    audio.pause()
    isMusicPlaying = false;
    playIcon.classList.replace('fa-pause', 'fa-play')


}

function progressBarDisplay() {

    progressBar.max = Math.floor(audio.duration)
    progressBar.value = Math.floor(audio.currentTime)

}

function calculateAudioDuration(audioDurationSeconds) {
    let audioMaxDuration;
    let minutes = Math.floor(audioDurationSeconds / 60)
    let seconds = Math.floor(audioDurationSeconds - minutes * 60);

    if (seconds == 0) {
        audioMaxDuration = minutes + ":" + seconds + "0";
    } else {
        audioMaxDuration = minutes + ":" + seconds;
    }

    return audioMaxDuration;

}

function calculateAudioCurrentTime(audioCurrentTimeSeconds) {
    let audioCurrentTime;
    let currentMinutes = Math.floor(audioCurrentTimeSeconds / 60)
    let currentSeconds = Math.floor(audioCurrentTimeSeconds - currentMinutes * 60);

    if (currentSeconds <= 9) {
        audioCurrentTime = currentMinutes + ":" + "0" + currentSeconds
    } else {

        audioCurrentTime = currentMinutes + ":" + currentSeconds
    }

    return audioCurrentTime;
}

function setVolume(receivedVolume) {

    audio.volume = receivedVolume

}

function autoPlay() {
    if (audio.currentTime == audio.duration) {
        player.next()
        music = player.getMusic();
        displayMusic(music)
        playMusic()
    }
}

// Event listeners

play.addEventListener("click", () => {


    if (isMusicPlaying == false) {
        playMusic()
    }

    else {
        pauseMusic()
    }

})

next.addEventListener("click", () => {

    player.next()
    music = player.getMusic();
    displayMusic(music)
    if (isMusicPlaying) {
        playMusic() // Çalmaya devam et.
    }

})

previous.addEventListener("click", () => {

    player.previous()
    music = player.getMusic();
    displayMusic(music)
    if (isMusicPlaying) {
        playMusic() // Çalmaya devam et.
    }

})

progressBar.addEventListener("input", () => {
    // currentTime.textContent = Math.floor(progressBar.value / 60) + ':' + Math.floor(progressBar.value % 60)
    currentTime.textContent = calculateAudioCurrentTime(progressBar.value)
    audio.currentTime = progressBar.value
    playMusic()

})

volumeBar.addEventListener("input", () => {

    if (volumeBar.value / 100 != 0) {
        setVolume(volumeBar.value / 100)
        muteButton.classList.replace('fa-volume-xmark', 'fa-volume-high')

    } else {
        muteButton.classList.replace('fa-volume-high', 'fa-volume-xmark')
    }

})

muteButton.addEventListener("click", () => {

    if (!audio.muted) { // ses açıksa

        audio.muted = true;
        muteButton.classList.replace('fa-volume-high', 'fa-volume-xmark')

    }

    else { // ses kapalıysa

        audio.muted = false;
        muteButton.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }

})

