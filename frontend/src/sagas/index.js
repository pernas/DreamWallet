
import { takeEvery } from 'redux-saga'
import { call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
// import { getWalletContext, getTransactions } from '../selectors'
import * as actions from '../actions'
import { getSession, getWallet } from '../selectors'
import * as walletActions from 'dream-wallet/lib/actions'
import { prop, assoc } from 'ramda'

import Promise from 'es6-promise'
Promise.polyfill()

const delay = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), ms)
    });
}

// api should be promified api (no task for saga)
export const rootSaga = api => {
  const pollingSaga = function* (session) {
    let rounds = 50
    while(true) {
      rounds--
      try {
          yield call(delay, 2000);
          let response = yield call(api.pollForSessioGUID, session);
          let guid = prop('guid', response)
          if (guid) { //authorized
            return true
          }
      } catch (error) {
          // cancellation error -- can handle this if you wish
          return false;
      }
    }
    // rounds exhausted without authorization
    return false;
  }

  const fetchWalletSaga = function* (guid, sharedKey, session, password) {
    try {
      let wallet = yield call(api.downloadWallet, guid, sharedKey, session, password)
      yield put(walletActions.loadWallet(wallet))
      yield put(walletActions.requestWalletData(wallet))
      yield put(actions.loginSuccess())
    } catch (error) {
      if (prop('authorization_required', error)) {
        let authorized = yield call(pollingSaga, session);
        if (authorized) {
          yield call(fetchWalletSaga, guid, undefined, session, password);
        }
      } else {
        yield put(actions.loginError(error))
      }

    }
  }

  const loginSaga = function* (action) {
    const credentials = action.payload
    // login with shared key
    if (credentials.sharedKey) {
      yield call(fetchWalletSaga, credentials.guid, credentials.sharedKey, undefined, credentials.password);
    } else {
      // if no shared key check for session
      let session = yield select(getSession(credentials.guid))
      session = yield call(api.establishSession, session)  // establishSession logic should not receive existent session as parameter
      yield put(actions.saveSession(assoc(credentials.guid, session, {})))
      yield call(fetchWalletSaga, credentials.guid, undefined, session, credentials.password);
    }
  }

  // const changeWalletSaga = function* (action) {
  //   const wallet = yield select(getWallet)
  //   yield put(walletActions.requestWalletData(wallet))
  // }

  return function* () {
    yield [
      // here you can put an array of sagas in forks
      fork(WalletSagas.rootSaga(api))
    ];
    yield takeEvery(actions.LOGIN_START, loginSaga)
    // yield takeEvery(actions.SELECTION_SET, changeWalletSaga)
    // yield takeEvery(actions.LOGIN_START, pollData)
  }
}
