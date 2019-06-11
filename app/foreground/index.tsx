import './dev';
import React from 'react';
import ReactDOM from 'react-dom';
import message from '../component/message';

const App: any = () => (
  <div>
     <h1>Hello world!</h1>
  </div>
)

ReactDOM.render(<App/>, document.getElementById('root'));
