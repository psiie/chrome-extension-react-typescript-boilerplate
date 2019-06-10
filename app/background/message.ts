const ALL_TABS = {};

function contentScript(message: Object, response?: Function) {
  if (!message) return;

  chrome.tabs.query(ALL_TABS, tabList => {
    tabList.forEach(tab => {
      const tabId: number = (tab.id as number);
      const options: Object = {};
      const responseCallback: any = response;
      const url = tab.url as string;

      if (!/https?:\/\//.test(url)) return;
      console.log(url, !/https?:\/\//.test(url), 'sendMessage', tab);
      chrome.tabs.sendMessage(tabId, message, options, responseCallback);  
    });
  });
}

function foreground(message: Object, response: Function) {
  (chrome.extension as any).sendMessage(message, response);
}


export default {
  send: {
    contentScript,
    foreground,
  }  
};
