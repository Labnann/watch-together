(() => {
  const socket = io();
  const video = document.getElementById("shared_video");
  const videoSourceSendButton = document.getElementById("set_video_source");
  const videoSourceText = document.getElementById("video_source_text");
  
  let isPlaying = false;
  let isLocked = false;

  const sendObject = (object) => {
    if(!isLocked)
    socket.emit('object', object);
  }

  const lockSocket = ()=>{
    isLocked = true;
  }


  const unlockSocket = ()=>{
    const unlock =() =>{
      isLocked = false;
    }

    setTimeout(unlock,100);

  }

  function changePlayStatus(){
    isPlaying = !isPlaying;
    if(!isPlaying) video.pause();
    else video.play();
  }

  socket.on("object", (object) => {
    lockSocket();
    video.currentTime = object.currentTime;
    if(object.changePlayingStatus) changePlayStatus();
    unlockSocket();
  })




  videoSourceSendButton.onclick = () => {
    const sourceText = videoSourceText.value;
    video.src = sourceText;
  }


  video.onseeked = (evet) => {
    sendObject({currentTime: video.currentTime})
  }
  
  video.onplay = ()=>{
    isPlaying = true;
    sendObject({
      currentTime: video.currentTime,
      changePlayingStatus: true
    })
  }

  video.onpause = () =>{
   isPlaying = false;
    sendObject({
      currentTime: video.currentTime,
      changePlayingStatus: true
    })
 
  }
  

  


  window.sendObject = sendObject;
})();

