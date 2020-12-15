import { compose as _compose } from 'redux';
import { connect as _connect } from 'react-redux';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';

/* --------------------------------------------------------------------------
  These functions only exists only as a means to fix typescript errors. Hence
  the immediate import/export.
   -------------------------------------------------------------------------- */

export function connect(mapStateToProps, mapDispatchToProps?): any {
  return _connect(mapStateToProps, mapDispatchToProps);
}

export function compose({ key, saga, reducer }: any): Function  {
  const withSaga = saga && injectSaga({ key, saga });
  const withReducer = reducer && injectReducer({ key, reducer });
  return _compose(withReducer, withSaga)
}
