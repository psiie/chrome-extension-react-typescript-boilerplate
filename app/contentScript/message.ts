
// function contentScript(message: Object, response?: Function) {
//   if (!message) return;

//   chrome.tabs.query(ALL_TABS, tabList => {
//     tabList.forEach(tab => {
//       const tabId: number = (tab.id as number);
//       const options: Object = {};
//       const responseCallback: any = response;
//       const url = tab.url as string;

//       if (!/https?:\/\//.test(url)) return;
//       console.log(url, !/https?:\/\//.test(url), 'sendMessage', tab);
//       chrome.tabs.sendMessage(tabId, message, options, responseCallback);  
//     });
//   });
// }

interface Message {
  [key: string]: any,
}

const RECIPIENT = {
  BACKGROUND: 'background',
  FOREGROUND: 'foreground',
}

function background(message: Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: RECIPIENT.BACKGROUND }, response);
}

function foreground(message: Message, response?: Function) {
  (chrome.extension as any).sendMessage({ ...message, recipient: RECIPIENT.FOREGROUND }, response);
}


export default {
  send: {
    background,
    foreground,
  }  
};
