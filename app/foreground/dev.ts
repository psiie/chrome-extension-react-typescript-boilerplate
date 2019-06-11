import CONSTANTS from '../component/message/constants';
import message from '../component/message';

/* Hot reload doesn't properly and reliably reload foreground. Force close and open */
message.recieve.foreground((request: any) => {
  if (!request) return;
  const closeWindow: boolean = request.type === CONSTANTS.SIGN_CONNECT || request.cmd === CONSTANTS.CLOSE;
  if (closeWindow) window.close();
});
