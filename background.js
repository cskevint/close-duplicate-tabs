chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
        const seenUrls = new Map();
        
        for (const tab of tabs) {
            if (!tab.url) continue;
            const baseUrl = tab.url.split('#')[0];
            
            if (seenUrls.has(baseUrl)) {
                chrome.tabs.remove(tab.id);
            } else {
                seenUrls.set(baseUrl, tab.id);
            }
        }
    });
});