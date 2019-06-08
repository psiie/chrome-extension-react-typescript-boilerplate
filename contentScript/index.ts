console.log('content script loaded');
/* Take note that contentScript is ran in the context of the extension.
Some situations may require injecting code into the page by appending a
script tag. */

(chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
  console.log('recieved msg ', request);
  sendResponse();
});

