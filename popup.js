let button = document.getElementById("tapButton");
let bpmText = document.getElementById("bpm");
let Speed = document.getElementById("setSpeed");
let setBase = document.getElementById("setBase");
let playAll = document.getElementById("playAll")
var bpm = 0
setBase.addEventListener("click", () => {chrome.storage.sync.set({ basebpm: bpm })});
// When the button is clicked, inject setPageBackgroundColor into current page
Speed.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setSpeed,
  });
});

playAll.addEventListener("click", async () => {
  chrome.runtime.sendMessage("play")
});

function playVid() {
  document.querySelector('video').play()
}

function setSpeed() {
  chrome.storage.sync.get(["basebpm","bpm"], ( data ) => {

    document.querySelector('video').playbackRate = data.bpm/data.basebpm;
  });
}


tempoDetector()

////

function tempoDetector(){
button.addEventListener('click', tap);
bpmText.innerText = "..."
var TIMEOUT = 2000
var times = []
var lastTime = null
var lastDifference = null

  function tap() {
    var time = Date.now()

    if (lastTime){
      lastDifference = time - lastTime
      times.push(lastDifference)
      refresh()
    }

    lastTime = time
    beginTimeout()
  }

  function refresh(){
      let average = times.reduce((result, t) => result += t) / times.length;
      bpm = (1 / (average / 1000)) * 60;
      bpmText.innerText = Math.round(bpm);
      chrome.storage.sync.set({ bpm: bpm })
      
  }

  let timer = null

  function beginTimeout() {
    if (timer){
    clearTimeout(timer)
    }
    timer = setTimeout(function(){
      times = [lastDifference]
      lastTime = null
    }, TIMEOUT);
  }
}