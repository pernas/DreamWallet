
import { takeEvery } from 'redux-saga'
import { call, put, select, fork } from 'redux-saga/effects'
import * as WalletSagas from 'dream-wallet/lib/sagas'
// import { getWalletContext, getTransactions } from '../selectors'
import * as actions from '../actions'
import { getSession } from '../selectors'
import * as walletActions from 'dream-wallet/lib/actions'
import { prop } from 'ramda'

import Promise from 'es6-promise'
Promise.polyfill()

const delay = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), ms)
    });
}

// api should be promified api (no task for saga)
export const rootSaga = api => {

  const pollingSaga = function* () {
    console.log('poll saga')
    while(true) {
      // TODO :: introduce a limit of polling
      try {
          let session = yield select(getSession)
          yield call(delay, 2000);
          const guid = yield call(api.pollForSessioGUID, session);
          console.log(guid) // there is something that i dont understand here (guid is normally undefined and it should not)
          // when GUID is found in the response of poll we are ready to log in
          // So I have to control a state flag for polling and telling when we are ready to fire log
      } catch (error) {
          // cancellation error -- can handle this if you wish
          return;
      }
    }
  }

  // on problem of passing the api in a clojure
  // is we cannot split this sagas into different files
  const loginSaga = function* (action) {
    const c = action.payload
    // login with shared key
    if (c.sharedKey) {
      try {
        const wallet = yield call(api.getWallet, c.guid, c.sharedKey, c.password)
        yield put(walletActions.loadWallet(wallet))
        yield put(actions.loginSuccess())
      } catch (error) {
        yield put(actions.loginError(error))
      }
    } else {
      // if no shared key check for session
      let session = yield select(getSession)
      session = yield call(api.establishSession, session)  // establishSession logic should not receive existent session as parameter
      yield put(actions.saveSession(session))
      try {
        const payload = yield call(api.fetchWallet, c.guid, session)
        console.log(payload)
        // here i need to call the second part of api.getWallet to decrypt payload
        // then I need to put load and success
        // yield put(walletActions.loadWallet(wallet))
        // yield put(actions.loginSuccess())
      } catch (response) {
        if (prop('authorization_required', response)) {
          yield call(pollingSaga);
        } else {
          yield put(actions.loginError(response))
        }
      }
    }
  }

  return function* () {
    yield [
      // here you can put an array of sagas in forks
      fork(WalletSagas.rootSaga(api))
    ];
    yield takeEvery(actions.LOGIN_START, loginSaga)
    // yield takeEvery(actions.LOGIN_START, pollData)
  }
}
