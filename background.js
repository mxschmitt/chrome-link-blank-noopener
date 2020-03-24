chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ["http", "https"]
        },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "hasMatches") {
    const tabId = sender.tab.id
    if (msg.value) {
      chrome.pageAction.setIcon({ tabId, path: "images/negative.png" });
    } else {
      chrome.pageAction.setIcon({ tabId, path: "images/positive.png" });
    }
  }
});