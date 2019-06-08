import './dev';
import React from 'react';
import ReactDOM from 'react-dom';


// (chrome.extension as any).sendMessage({cmd: 'test'}, (response: any) => {
//   console.log('response', response);
// });

const msg: string = 'hello main page1';
// const test = ['a', 'b', 'c'];
// const done = [...test, 'd'];
// console.log('here', done);
const App: any = () => (
  <div>
     <h1>Hello world!!</h1>
     <div>{msg}</div>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));
