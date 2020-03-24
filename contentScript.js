const getMatches = () => {
  const matches = document.querySelectorAll(`a[target="_blank"]:not([rel]):not([href*="${window.location.host}"])`);
  matches.forEach(el => {
    el.style.border = "5px solid red";
    el.style.padding = "1px";
    el.style.borderRadius = "5px";
  })
  const out = [...matches].map(match => ({
    innerText: match.innerText,
    href: match.href
  }))
  console.log(`Found ${out.length} external links without noopener`)
  return out
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'getLinksWithoutNoopener') {
    const out = getMatches()
    sendResponse(out);
  }
});

let notInstalledRetry = 0

const checkMatches = () => {
  const out = getMatches()
  if (notInstalledRetry > 3) {
    return
  }
  if (!chrome.app.isInstalled) {
    notInstalledRetry++
  }
  chrome.runtime.sendMessage({
    action: 'hasMatches',
    value: out.length > 0
  });
  setTimeout(checkMatches, 1000)
}
checkMatches()
