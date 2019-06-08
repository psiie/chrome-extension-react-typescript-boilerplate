
/* Hot reload doesn't properly and reliably reload foreground. Force close and open */
(chrome.extension as any).onMessage.addListener((request: any) => {
  if (request && request.closeForeground) window.close();
});
