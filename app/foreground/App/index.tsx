import React from 'react';
import { connect } from 'react-redux';
// import { increment, decrement, reset } from './actionCreators';

class App extends React.Component {
  render() {
    return (
      <div>Hello World</div>
    )
  }
}

export default App;

// const mapStateToProps = (state: any) => {
//   return {
//     counter: state.counter
//   }
// }

// const mapDispatchToProps = undefined;
// // const mapDispatchToProps = { increment, decrement, reset }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
