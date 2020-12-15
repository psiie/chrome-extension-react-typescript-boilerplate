const url: string = chrome.extension.getURL('foreground.html');

/* on extension icon click, open foreground react page
note: will only work if the manifest does not have "default_popup" enabled.
It is either: Open page as a tab or popup. Not both. */
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url });
});
