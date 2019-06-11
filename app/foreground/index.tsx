import './dev';
import React from 'react';
import ReactDOM from 'react-dom';
import message from './message';

(chrome.extension as any).onMessage.addListener((request: any, sender: any, sendResponse: Function) => {
  if (request.recipient !== 'foreground') return;
  console.log('recieved msg ', request);
  sendResponse();
});


const App: any = () => (
  <div>
     <h1>Hello world!</h1>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));
