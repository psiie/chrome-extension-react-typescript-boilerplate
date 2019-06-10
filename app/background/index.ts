
import './dev';
import message from './message';

/* on button click, open foreground react page */
chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({'url': chrome.extension.getURL('foreground.html')});
});

// message.send.contentScript({ cmd: 'tsest' }, res => void 0);
// setTimeout(() => {
//   message.send.foreground({ test: true }, res => void 0);
// }, 3000);
(chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
  if (request.recipient !== 'background') return;
  console.log('recieved msg ', request);
  sendResponse();
});
