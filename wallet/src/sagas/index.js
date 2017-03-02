
import { takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { getWalletContext, getTransactions } from '../selectors'
import * as A from '../actions'


// api should be promified api (no task for saga)
export const rootSaga = api => {
  // this should return an object with all the sagas and the api in the clojure
  // so you can decide which sagas you want to run
  const walletLoadSaga = function* (action) {
    const wallet = action.payload.get('wallet')
    const context = getWalletContext(wallet)
    // we can handle api errors here
    const data = yield call(api.fetchBlockchainData, context, { n: 0 })
    yield put(A.loadWalletData(data))
  }

  const txsLoadRequestSaga = function* (action) {
    // NOTE: context must be a single address, for now
    const context = Array.isArray(action.payload) ? action.payload[0] : action.payload
    // here there might be a problem, because the selector should take the full state
    // and you might not now which routes configured the frontend (now hardcoded in the selector)
    const currentTxs = yield select(getTransactions(context))
    // we can handle api errors here
    const data = yield call(api.fetchBlockchainData, context, { n: 50, offset: currentTxs.size })
    yield put(A.loadContextTxs(data))

  }

  return function* () {
    yield takeEvery(A.WALLET_LOAD, walletLoadSaga)
    yield takeEvery(A.TXS_LOAD_REQUEST, txsLoadRequestSaga)
  }
}

// example of error handling in saga:
// export function* fetchData(action) {
//    try {
//       const data = yield call(Api.fetchUser, action.payload.url)
//       yield put({type: "FETCH_SUCCEEDED", data})
//    } catch (error) {
//       yield put({type: "FETCH_FAILED", error})
//    }
// }
