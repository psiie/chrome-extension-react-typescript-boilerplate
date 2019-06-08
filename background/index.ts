
/* globals chrome */
console.log('loaded');
// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
(chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
  chrome.pageAction.show(sender.tab.id);
  sendResponse();
});

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, tab => {
    // Tab opened.
  });
});