const video=document.querySelector("video");
const progressRange=document.querySelector(".progress-range");
const progressBar=document.querySelector(".progress-bar");
const player=document.querySelector(".player");
const playBtn=document.getElementById("play-btn");
const volumeIco=document.getElementById("volume-icon");
const volumeRange=document.querySelector(".volume-range");
const volumeBar=document.querySelector(".volume-bar");
const playerSpeed=document.getElementById("player-speed");
const timeElapsed=document.querySelector(".time-elapsed");
const timeDuration=document.querySelector(".time-duration");
const fullScreen=document.querySelector(".fullscreen");
let duration=0,currentTime=0;
let durationMinutes=0,durationSeconds=0;
let prevVolIcon='fa-volume-up';
let volume=1;
let fullscreen=false;
video.addEventListener('canplay',()=>{
    duration=video.duration;
    currentTime=0;
})
function videoStatus(){
    if(video.paused){
        video.play();
        changeVideoIcon('play');
    }else{
        video.pause();
        changeVideoIcon('pause');
    }
}
function changeVideoIcon(status){
    if(status==='play'){
        playBtn.classList.replace("fa-play","fa-pause");
        playBtn.setAttribute('title','Pause');
    }else{
        playBtn.classList.replace("fa-pause","fa-play");
        playBtn.setAttribute('title','Play');
    }
}
playBtn.addEventListener('click',videoStatus);
video.addEventListener('click',videoStatus);
video.addEventListener('ended',changeVideoIcon.bind(this,'pause'));
video.addEventListener('play',()=>{
    durationMinutes=Math.floor(duration/60);
    durationSeconds=Math.floor(duration%60);
    durationSeconds<10?durationSeconds=`0${durationSeconds}`:0;
    timeDuration.textContent=`${durationMinutes}:${durationSeconds}`
});
video.addEventListener('timeupdate',()=>{
    const {currentTime}=video;
    let currentMinutes=Math.floor(currentTime/60);
    let currentSeconds=Math.floor(currentTime%60);
    currentSeconds<10?currentSeconds=`0${currentSeconds}`:0;
    currentMinutes<10?currentMinutes=`0${currentMinutes}`:0;
    timeElapsed.textContent=`${currentMinutes}:${currentSeconds}`;
    const progress=Math.round(currentTime/duration*100);
    progressBar.style.width=`${progress}%`;
});
progressRange.addEventListener('click',function(event){
    video.play();
    changeVideoIcon("play");
    const progress=Math.round(event.offsetX/this.clientWidth*100)
    progressBar.style.width=`${progress}%`;
    video.currentTime=progress*duration/100;
});
function setVolIco(vol=volume){
    if(vol<0.1){
        volumeIco.classList.replace(prevVolIcon,"fa-volume-mute");
        prevVolIcon="fa-volume-mute";
    }
    else if(vol<0.65){
        volumeIco.classList.replace(prevVolIcon,"fa-volume-down");
        prevVolIcon="fa-volume-down";
    }else{
        volumeIco.classList.replace(prevVolIcon,"fa-volume-up");
        prevVolIcon='fa-volume-up';
    }
    volumeBar.style.width=`${vol*100}%`;
}
volumeRange.addEventListener('click',function(evt){
    volume=evt.offsetX/this.clientWidth;
    volume<0.1?volume=0:volume;
    volume>0.9?volume=1:volume;
    setVolIco();
    video.volume=volume;
});
volumeIco.addEventListener('click',function(){
    if(video.volume>0){
        video.volume=0;
        setVolIco(0);
    }else{
        video.volume=volume;
        setVolIco();
    }
})
playerSpeed.addEventListener('change',function(){
    video.playbackRate=this.value;
});
function toggleFullscreen(){
    fullscreen?closeFullscreen():openFullscreen(player);
    fullscreen=!fullscreen;
}
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}  
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}
fullScreen.addEventListener('click',toggleFullscreen);
video.addEventListener("dblclick",toggleFullscreen);