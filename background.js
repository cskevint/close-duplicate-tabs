function normalizedUrl(url) {
  return url.split("#")[0];
}

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const seenUrls = new Map();

    for (const tab of tabs) {
      if (!tab.url) continue;
      const baseUrl = normalizedUrl(tab.url);

      if (seenUrls.has(baseUrl)) {
        chrome.tabs.remove(tab.id);
      } else {
        seenUrls.set(baseUrl, tab.id);
      }
    }
  });
});

function updateBadge() {
  chrome.tabs.query({}, (tabs) => {
    const seenUrls = new Map();
    let duplicateCount = 0;

    for (const tab of tabs) {
      if (!tab.url) continue;
      const baseUrl = normalizedUrl(tab.url);

      if (seenUrls.has(baseUrl)) {
        duplicateCount++;
      } else {
        seenUrls.set(baseUrl, tab.id);
      }
    }
    if (duplicateCount > 0) {
      chrome.action.setBadgeText({ text: duplicateCount.toString() });
      chrome.action.setBadgeBackgroundColor({ color: "#272AB0" });
    } else {
      chrome.action.setBadgeText({ text: "" });
    }
  });
}

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onUpdated.addListener(updateBadge);
