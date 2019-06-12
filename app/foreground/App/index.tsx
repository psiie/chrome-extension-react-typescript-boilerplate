import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { key, makeSelectCounter } from './selectors';
import injectReducer from '../utils/injectReducer';
import reducer from './reducer';

class App extends React.Component {
  props: any;

  constructor(props: any) {
    super(props);

    console.log(makeSelectCounter);
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

const mapStateToProps = createStructuredSelector({
  counter: makeSelectCounter(),
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    set: (amt: any) => dispatch({ type: 'SET_AMOUNT', amt })
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key, reducer });

export default compose(withReducer, withConnect)(App);
