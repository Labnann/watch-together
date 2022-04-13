(() => {
  const states = {
    rotated:false
  }
  const socket = io();
  const video = document.getElementById("shared_video");
  const videoSourceSendButton = document.getElementById("set_video_source");
  const videoSourceText = document.getElementById("video_source_text");
  const inputVideoFile = document.getElementById("input_video");
  const inputVideoRunButton = document.getElementById("input_video_runner");

  let isPlaying = false;
  let isLocked = false;

  const sendObject = (object) => {
    if (!isLocked)
      socket.emit('object', object);
  }

  const lockSocket = () => {
    isLocked = true;
  }


  const unlockSocket = () => {
    const unlock = () => {
      isLocked = false;
    }

    setTimeout(unlock, 100);

  }

  function changePlayStatus() {
    isPlaying = !isPlaying;
    if (!isPlaying) video.pause();
    else video.play();
  }

  socket.on("object", (object) => {
    lockSocket();
    video.currentTime = object.currentTime;
    if (object.playingStatus === "playing") video.play();
    if (object.playingStatus === "paused") video.pause(); 
    unlockSocket();
  })




  videoSourceSendButton.onclick = () => {
    const sourceText = videoSourceText.value;
    video.src = sourceText;
  }


  video.onseeked = (evet) => {
    sendObject({ currentTime: video.currentTime })
  }

  video.onplay = () => {
    sendObject({
      currentTime: video.currentTime,
      playingStatus: "playing"
    })
  }

  video.onpause = () => {
    sendObject({
      currentTime: video.currentTime,
      playingStatus: "paused"
    })

  }



  inputVideoFile.onchange = () => {
    if (inputVideoFile.files[0] === undefined) inputVideoFile.click();
    const videoFileURL = window.URL.createObjectURL(inputVideoFile.files[0]);
    video.src = videoFileURL;
  }


  (()=>{
    const forceSyncButton = document.getElementById("force_sync_button");
    forceSyncButton.onclick = ()=>{
      socket.emit('sync', {currentTime : video.currentTime});
    }
  })();


  (()=>{
    const rotateButton = document.getElementById("rotate_button");
    rotateButton.onclick = ()=>{
      console.log("clicked", video, states.rotated)
      states.rotated = !states.rotated;
      states.rotated? video.classList.add("rotated"):video.classList.remove("rotated");
    }
  })();


  (()=>{
    const externalControls = document.getElementsByClassName("external_controls")[0];
    const curtain = document.getElementById("curtain");
    curtain.onclick = ()=>{
      externalControls.style.opacity=.75;
      curtain.hidden = true;
      setTimeout(()=>{
        externalControls.style.opacity=0;
        curtain.hidden=false;
      }, 5000)
    }

  })();


  window.sendObject = sendObject;
})();

