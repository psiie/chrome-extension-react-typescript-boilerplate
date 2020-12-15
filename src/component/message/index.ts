import * as d from './index.d';
import CONSTANTS from './constants';
import logger from '../logger';

// -------------------------------------------------------------------------- //

function contentScript(message: Object, response?: Function) {
  if (!message) return;

  chrome.tabs.query(CONSTANTS.ALL_TABS, tabList => {
    tabList.forEach(tab => {
      const tabId: number = (tab.id as number);
      const options: Object = {};
      const responseCallback: any = response;
      const url = tab.url as string;
      const msg = { ...message, recipient: CONSTANTS.RECIPIENT.BACKGROUND };

      if (!/https?:\/\//.test(url)) return;
      logger(url, !/https?:\/\//.test(url), 'sendMessage', tab);
      chrome.tabs.sendMessage(tabId, msg, options, responseCallback);  
    });
  });
}

function background(message: d.Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: CONSTANTS.RECIPIENT.BACKGROUND }, response);
}

function foreground(message: d.Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: CONSTANTS.RECIPIENT.FOREGROUND }, response);
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
    contentScript: (callback: Function) => _addListener(CONSTANTS.RECIPIENT.CONTENT_SCRIPT, callback),
    background: (callback: Function) => _addListener(CONSTANTS.RECIPIENT.BACKGROUND, callback),
    foreground: (callback: Function) => _addListener(CONSTANTS.RECIPIENT.FOREGROUND, callback),
  }, 
};
