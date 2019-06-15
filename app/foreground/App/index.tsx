import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { key, makeSelectCounter } from './selectors';
import injectReducer from '../utils/injectReducer';
import reducer from './reducer';

const newCompose: any = compose;
const newConnect: any = connect;

// @redux({
//   key,
//   reducer,
// }, {

// }, {

// })

@newCompose(injectReducer({ key, reducer }))
@newConnect(createStructuredSelector({
  counter: makeSelectCounter(),
}), (dispatch: Function) => ({
  set: (amt: any) => dispatch({ type: 'SET_AMOUNT', amt }),
}))
export default class App extends React.Component {
  props: any;

  constructor(props: any) {
    super(props);

    console.log('newConnect', props);
    this.increment = this.increment.bind(this);
  }

  increment() {
    const counter = this.props.counter || 0;
    this.props.set(counter + 1);
  }

  render() {
    const counter = this.props.counter || 0;
    return (
      <div>
        <h1>Hello World</h1>
        <div>{counter.toString()}</div>
        <button onClick={this.increment}>increment</button>
      </div>
    )
  }
}
