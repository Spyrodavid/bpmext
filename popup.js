var bpm = new Number
var clickTimes = new Array
let changeColor = document.getElementById("changeColor");
let bpmElement = document.getElementById("bpm");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setSpeed,
  });
});

function resetBpm() {
  clickTimes = new Array
}

function clickBpm() {
  ClickTimes.push(Date.now())
}

function updateBpm() {
  for (var i = 1; i < clickTimes.length; i++){
    clickTimes[i] - clickTimes[i-1]
  }
}

function setSpeed() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
