import './dev';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
// import configureStore from './configureStore';
// import message from '../component/message';
import App from './App';
import configureStore from './configureStore';

// const store = configureStore(initialState);
// const store = createStore(reducers);
const initialState = {};
const store = configureStore(initialState);

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
