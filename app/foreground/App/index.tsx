import React from 'react';
import { connect } from 'react-redux';
// import { increment, decrement, reset } from './actionCreators';

class App extends React.Component {
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
    const { set } = this.props;
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


const mapStateToProps = (state: any) => {
  return {
    counter: state.App.counter
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    set: (amt: any) => dispatch({ type: 'SET_AMOUNT', amt })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
