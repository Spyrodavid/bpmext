async function playit(){
let [tab] = await chrome.tabs.query({ active: true//, url: "https://youtube.com/*" 
});
console.log(tab)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: playVid,
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(312)
      if (request.msg === "playit") {
          playit()
      }
  }
);