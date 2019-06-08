const ALL_TABS = {};

function serialize(message: Object) {
  let result: string;

  try {
    result = JSON.stringify(message);
  } catch (e) {
    result = ''; // todo: show error in invariant
  }

  return result;
}

function contentScript(message: Object, response: Function) {
  const messageStr: string = serialize(message);
  if (!messageStr) return;

  chrome.tabs.query(ALL_TABS, tabList => {
    tabList.forEach(tab => {
      const tabId: number = (tab.id as number);
      const options: Object = {};
      const responseCallback: any = response;

      chrome.tabs.sendMessage(tabId, messageStr, options, responseCallback);  
    });
  });
}


export default {
  send: {
    contentScript,
  }  
};
