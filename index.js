// Selecting Elements
const imageEl = document.querySelector('.image');

const topContainer = document.querySelector('.top-container');

const songTitle = document.querySelector('.song-title');

const artistEl = document.querySelector('.artist');

const playBtn = document.querySelector('.play-btn');

const audio = document.querySelector('.audio');

const toggle = document.querySelector('.toggle');

const replayBtn = document.querySelector('.replay-btn');

const loopBtn = document.querySelector('.loop-btn');

const repeatIcon = document.querySelector('.repeat-icon');

const progressBar = document.querySelector('.progress');

const progress = document.querySelector('.progress-bar');

const currentTimeEl = document.querySelector('.current-time');

const totalDurationEl = document.querySelector('.total-duration');

const NextBtn = document.querySelector('.next-btn');

const prevBtn = document.querySelector('.previous-btn');

const muteBtn = document.querySelector('.mute-btn');

const muteIcon = document.querySelector('.mute-icon');

const volumeSlider = document.querySelector('.volume-slider');

let currentIndex =0;


const songs = [
    {
     song: './assets/music/song1.mp3',
     title: 'Life goes on',
     artist: "BTS",
     image: randomImage()
    },
    {
        song: './assets/music/song2.mp3',
        title: 'Feather',
        artist: "Sabrina Carpenter",
        image: randomImage()
       },
       {
        song: './assets/music/song3.mp3',
        title: 'Cardign',
        artist: "Taylor Swift",
        backgroundImage: randomImage()
       },
]

// functions

async function updateSong(){
    let song = songs[currentIndex];

    topContainer.style.background = randomGradient();

    songTitle.textContent = song.title;
    artistEl.textContent = song.artist;
    audio.src=song.song;
    

    try {
        const imageUrl = await song.image;
        imageEl.src = imageUrl
    } catch (error) {
        console.error('Error setting the image:', error);
    }

    
    
 
}


function randomImage(){
 
    fetch('https://picsum.photos/200')
    .then(res => {imageEl.src = res.url})
    .catch(error =>console.error('Error fetching random image:', error))
}


 function randomGradient(){
 const colors = ['#ff7e5f', '#feb47b', '#6a82fb', '#fc5c7d', '#e3a7d3', '#34e89e', '#0f3443'];
 const randomColors1 = colors[Math.floor(Math.random() * colors.length)];
const randomColors2 = colors[Math.floor(Math.random() * colors.length)];

return `linear-gradient(45deg, ${randomColors1}, ${randomColors2})`;
 }

 updateSong();

 function togglePlay(){
    if(audio.paused){
     audio.play();
    } else {
        audio.pause();
    }
}

function updateButton(){
    const icon = audio.paused? './assets/icons/pause-icon.svg' : './assets/icons/play-icon.svg';
    toggle.src = icon;
    playBtn.classList.toggle('playing', audio.paused);
  
}

function replaySong(){
    return audio.currentTime =0;
}

function loopSong(){
    audio.loop = !audio.loop;
    loopBtn.classList.toggle('active', audio.loop);
}

function handleProgress(){
    const progress = (audio.currentTime / audio.duration) * 100;

    progressBar.style.flexBasis = `${progress}%`;
    progressBar.style.setProperty('--progress', progress);

   if(currentTimeEl){
    currentTimeEl.textContent = formatTime(audio.currentTime);
    currentTimeEl.style.position = 'absolute';
    currentTimeEl.style.color ='white';
    currentTimeEl.style.left = '26%';
    currentTimeEl.style.bottom = '25%';
   }
        
if(totalDurationEl){
    totalDurationEl.style.position = 'absolute';
    totalDurationEl.style.color ='white';
    totalDurationEl.style.right = '18%';
    totalDurationEl.textContent = formatTime(audio.duration);
    totalDurationEl.style.bottom = '25%'; 
}
    
    
}

function formatTime(seconds){
    const min = Math.floor(seconds /60);
    const secs = Math.floor(seconds % 60);

    return `${min}:${secs < 10 ? '0' : ''}${secs}`;
}


function scrub(e){
const scrubTime = (e.offsetX / progress.offsetWidth)* audio.duration;
audio.currentTime = scrubTime;

}
 
function playNext(){
    updateSong()
    currentIndex++;
    if(currentIndex > songs.length){
        currentIndex =0;
    }
}


function playPrev(){
    updateSong()
    currentIndex--;
    if(currentIndex < 0) {
        currentIndex = songs.length-1;
    }
}

function toogleMute(){
    audio.muted = !audio.muted;
    toggleMuteIcon();

}

function toggleMuteIcon(){
const icon = audio.muted? './assets/icons/sound-off-icon.svg' : './assets/icons/sound-on-icon.svg';
muteIcon.src = icon;
muteBtn.classList.toggle('muted', audio.muted);

}

// Event Listners
playBtn.addEventListener('click', togglePlay);
audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
audio.addEventListener('timeupdate', handleProgress);
audio.addEventListener('loadedmetadata', handleProgress);
replayBtn.addEventListener('click', replaySong);
progress.addEventListener('click', scrub);
NextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
muteBtn.addEventListener('click', toogleMute);
loopBtn.addEventListener('click', loopSong);

volumeSlider.addEventListener('mousemove' , (e)=>  {
    audio.volume = e.target.value
}
)
document.addEventListener('DOMContentLoaded', ()=>{
    if (audio.readyState >= 1){
        handleProgress();
    }
})




