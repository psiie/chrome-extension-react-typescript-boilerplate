import './dev';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
// import configureStore from './configureStore';
// import message from '../component/message';
import App from './App';

// const initialState = {};
// const store = configureStore(initialState);

const rootElement = document.getElementById('root')
ReactDOM.render(
  // <Provider>
    <App />,
  // </Provider>,
  rootElement
);
