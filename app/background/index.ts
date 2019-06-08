
import './dev';

console.log('node', process.env.NODE_ENV)

/* on button click, open foreground react page */
chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({'url': chrome.extension.getURL('foreground.html')});
});

// (chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
//   console.log('recieved msg ', request);
//   sendResponse();
// });

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });



