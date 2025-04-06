// Initialize popup when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Count links on the page and update the counter
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: countLinks
  }, (results) => {
    if (results && results[0] && results[0].result) {
      document.getElementById("linkCount").textContent = results[0].result;
    }
  });
  
  // Add event listener to the open links button
  document.getElementById("openLinks").addEventListener("click", async () => {
    const filterHttp = document.getElementById("filterHttp").checked;
    const excludeVisited = document.getElementById("excludeVisited").checked;
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openAllLinks,
      args: [filterHttp, excludeVisited]
    });
  });
});

// Count the number of links on the page
function countLinks() {
  return document.querySelectorAll("a[href]").length;
}

// Open all links on the page
function openAllLinks(filterHttp, excludeVisited) {
  // Get all links from the page
  let links = Array.from(document.querySelectorAll("a[href]"));
  
  // Map to href attributes
  links = links.map((a) => a.href);
  
  // Apply filters based on options
  if (filterHttp) {
    links = links.filter((href) => href.startsWith("http"));
  }
  
  if (excludeVisited) {
    // This is a simplified approach - in reality, we can't reliably check visited links
    // due to privacy restrictions in browsers
    const visitedLinks = new Set();
    links = links.filter((href) => {
      if (visitedLinks.has(href)) {
        return false;
      }
      visitedLinks.add(href);
      return true;
    });
  }
  
  // Open each link in a new tab
  links.forEach((link) => window.open(link, "_blank"));
  
  // Return the number of links opened
  return links.length;
}
