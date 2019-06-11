const url: string = chrome.extension.getURL('foreground.html');

/* on button click, open foreground react page */
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url });
});
