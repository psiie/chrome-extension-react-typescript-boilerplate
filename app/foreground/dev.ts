
/* Hot reload doesn't properly and reliably reload foreground. Force close and open */
(chrome.extension as any).onMessage.addListener((request: any) => {
  if (!request) return;

  const closeWindow: boolean = request.type === "SIGN_CONNECT" || request.closeForeground;
  if (closeWindow) window.close();
});
