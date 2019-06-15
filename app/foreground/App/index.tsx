import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { key, makeSelectCounter } from './selectors';
import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';
import reducer from './reducer';
import saga from './sagas';

const newInjectSaga: any = injectSaga;
const newCompose: any = compose;
const newConnect: any = connect;

// @redux({
//   key,
//   reducer,
// }, {

// }, {

// })

// @newCompose(
//   injectReducer({ key, reducer }),
//   injectSaga({ key, saga }),
// )
// @newConnect(createStructuredSelector({
//   counter: makeSelectCounter(),
// }), (dispatch: Function) => ({
//   set: (amt: any) => dispatch({ type: 'SET_AMOUNT', amt }),
// }))
class App extends React.Component {
  props: any;

  constructor(props: any, context: any) {
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


export function mapDispatchToProps(dispatch: any) {
  return {
    reduxTest: () => dispatch({ type: 'FETCH_REQUESTED', msg: {test:true} }),
  };
}

const mapStateToProps = createStructuredSelector({
  counter: makeSelectCounter(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key, reducer });
const withSaga = newInjectSaga({ key, saga });

export default compose(withReducer, withSaga, withConnect)(App);
