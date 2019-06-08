import React from 'react';
import ReactDOM from 'react-dom';

const msg: string = 'hello main page2';
const test = ['a', 'b', 'c'];
const done = [...test, 'd'];
console.log('here', done);
const App: any = () => (
  <div>
     <h1>Hello world!!</h1>
     <div>{msg}</div>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));
