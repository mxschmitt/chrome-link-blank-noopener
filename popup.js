const tbody = document.querySelector("tbody")
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getLinksWithoutNoopener" }, (response) => {
    console.log(response);
    response.forEach(entry => {
      const row = document.createElement("tr")
      const titleTd = document.createElement("td")
      titleTd.innerText = entry.innerText
      row.append(titleTd)
      const hrefTd = document.createElement("td")
      hrefTd.innerText = entry.href
      row.append(hrefTd)
      tbody.appendChild(row)
    })
  });
});