import message from '../component/message';

/* Hot reload doesn't properly and reliably reload foreground. Force close and open */
if (process.env.NODE_ENV === 'development') {
  console.log('is developement server. Environment:', process.env.NODE_ENV);

  message.send.foreground({ cmd: '@@CLOSE' });
  setTimeout(() => {
    chrome.tabs.create({'url': chrome.extension.getURL('foreground.html')});
  }, 50);
}
