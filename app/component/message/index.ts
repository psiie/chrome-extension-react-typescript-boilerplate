import logger from '../logger';

interface Message {
  [key: string]: any,
}

const ALL_TABS = {};
const RECIPIENT = {
  CONTENT_SCRIPT: 'contentScript',
  BACKGROUND: 'background',
  FOREGROUND: 'foreground',
}

// -------------------------------------------------------------------------- //

function contentScript(message: Object, response?: Function) {
  if (!message) return;

  chrome.tabs.query(ALL_TABS, tabList => {
    tabList.forEach(tab => {
      const tabId: number = (tab.id as number);
      const options: Object = {};
      const responseCallback: any = response;
      const url = tab.url as string;
      const msg = { ...message, recipient: RECIPIENT.BACKGROUND };

      if (!/https?:\/\//.test(url)) return;
      logger(url, !/https?:\/\//.test(url), 'sendMessage', tab);
      chrome.tabs.sendMessage(tabId, msg, options, responseCallback);  
    });
  });
}

function background(message: Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: RECIPIENT.BACKGROUND }, response);
}

function foreground(message: Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: RECIPIENT.FOREGROUND }, response);
}

// -------------------------------------------------------------------------- //

function _addListener(recipient: string, callback: Function) {
  if (!callback || typeof callback !== 'function') return;

  (chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
    if (request.recipient !== recipient) return;
    logger('recieved msg ', request);
    callback(request, sender, sendResponse);
  });
}

// -------------------------------------------------------------------------- //

export default {
  send: {
    contentScript,
    background,
    foreground,
  },
  recieve: {
    contentScript: (callback: Function) => _addListener(RECIPIENT.CONTENT_SCRIPT, callback),
    background: (callback: Function) => _addListener(RECIPIENT.BACKGROUND, callback),
    foreground: (callback: Function) => _addListener(RECIPIENT.FOREGROUND, callback),
  }, 
};
