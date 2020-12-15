import { put, takeLatest } from 'redux-saga/effects'

function* fetch(action) {
  const api = yield new Promise(resolve => {
    setTimeout(() => {
      console.log('setTimeout done');
      resolve(200);
    }, 1000);
  });
  
  yield put({ type: "FETCH_SUCCEEDED", payload: api });
  // yield put({type: "FETCH_FAILED", message: e.message});
}

function* sagas() {
  yield takeLatest("FETCH_REQUESTED", fetch);
}

export default sagas;
