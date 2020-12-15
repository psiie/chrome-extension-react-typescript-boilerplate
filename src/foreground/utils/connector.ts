import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from './injectReducer';
import injectSaga from './injectSaga';

export function connector(selectorEvents: any, dispatchEvents: any) {
  const _connect: any = connect; // fixes ts lint issue

  const createDispatchEvents = (dispatch: Function) => {
    Object.keys(dispatchEvents).forEach(key => {
      const type = dispatchEvents[key];
      dispatchEvents[key] = (data: any) => dispatch({ type, data });
    });
    return dispatchEvents;
  }

  return _connect(
    createStructuredSelector(selectorEvents),
    createDispatchEvents,
  );
}

export function inject({ key, saga, reducer }: any): Function  {
  const _injectSaga: any = injectSaga; // fixes ts lint issue

  const withReducer = injectReducer({ key, reducer });
  const withSaga = _injectSaga({ key, saga });
  return compose(withReducer, withSaga)
}