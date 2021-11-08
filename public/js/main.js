(() => {
  const socket = io();
  const video = document.getElementById("shared_video");
  const videoSourceSendButton = document.getElementById("set_video_source");
  const videoSourceText = document.getElementById("video_source_text");

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

    setTimeout(unlock,250);

  }

  socket.on("object", (object) => {
    lockSocket();
    video.currentTime = object.currentTime;
    unlockSocket();
  })


  videoSourceSendButton.onclick = () => {
    const sourceText = videoSourceText.value;
    video.src = sourceText;
  }


  video.onseeked = (evet) => {
    sendObject({currentTime: video.currentTime})
  }

  


  window.sendObject = sendObject;
})();

