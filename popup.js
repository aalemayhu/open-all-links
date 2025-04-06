document.getElementById("openLinks").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: openAllLinks
  });
});

function openAllLinks() {
  const links = Array.from(document.querySelectorAll("a[href]"))
    .map((a) => a.href)
    .filter((href) => href.startsWith("http"));

  links.forEach((link) => window.open(link, "_blank"));
}
