
/* Hot reload doesn't properly and reliably reload foreground. Force close and open */
if (process.env.NODE_ENV === 'development') {
  console.log('is developement server. Environment:', process.env.NODE_ENV);

  (chrome.extension as any).sendMessage({ closeForeground: true });
  setTimeout(() => {
    chrome.tabs.create({'url': chrome.extension.getURL('foreground.html')});
  }, 50);
}
