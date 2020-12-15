import React from 'react';
import { connect,  compose } from 'utils/connect';
import reducer from './reducer';
import saga from './sagas';
import get from 'lodash/get';
import { FETCH_REQUESTED, SET_AMOUNT } from './constants';

@connect(state => ({
  state,
  counter: get(state, 'default.counter'),
}), dispatch => ({
  reduxTest: () => dispatch({ type: FETCH_REQUESTED }),
  set: amount => dispatch({ type: SET_AMOUNT , payload: amount }),
}))
@compose({ saga, reducer })
export default class App extends React.Component {
  props: any;

  constructor(props: any) {
    super(props);

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
        <button onClick={this.props.reduxTest}>redux</button>
      </div>
    )
  }
}
