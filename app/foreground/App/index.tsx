import React from 'react';
import { connector, inject } from '../utils/connector';
import { key, selectCounter } from './selectors';
import reducer from './reducer';
import saga from './sagas';

@connector({ // binds selectors and dispatchers to props
  counter: selectCounter(),
}, {
  reduxTest: 'FETCH_REQUESTED',
  set: 'SET_AMOUNT',
})
@inject({ key, saga, reducer }) // connects reducer and saga to the store (instantiated at entryfile)
export default class App extends React.Component {
  props: any;

  constructor(props: any) {
    super(props);

    console.log('test', this)
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

// export function mapDispatchToProps(dispatch: any) {
//   return {
    // reduxTest: () => dispatch({ type: 'FETCH_REQUESTED', msg: {test:true} }),
    // set: (amt: any) => dispatch({ type: 'SET_AMOUNT', amt }),
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   counter: makeSelectCounter(),
// });

// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// const withReducer = injectReducer({ key, reducer });
// const withSaga = newInjectSaga({ key, saga });

// export default compose(withReducer, withSaga, withConnect)(App);
