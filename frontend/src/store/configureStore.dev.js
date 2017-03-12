import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas'
import persistState from 'redux-localstorage'
import Immutable from 'immutable-ext'
// import { Socket } from 'dream-wallet/lib/network'
import { walletSyncMiddleware, walletSocketMiddleware } from 'dream-wallet/lib/middleware'
import { createWalletApi } from 'dream-wallet/lib/network'
import * as C from '../config'

const configureStore = () => {
  // const socket = new Socket()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    { serialize: { immutable: Immutable } }) || compose
  const api = createWalletApi({ rootUrl: C.ROOT_URL
                              , apiUrl: C.API_BLOCKCHAIN_INFO
                              , apiCode: C.API_CODE})
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers({wpath: C.WALLET_IMMUTABLE_PATH, dpath: C.BLOCKCHAIN_DATA_PATH}),
    composeEnhancers(
      persistState('session'),
      applyMiddleware(
        walletSyncMiddleware({ api: api, wpath: C.WALLET_IMMUTABLE_PATH}),
        // walletSocketMiddleware({ socket }),
        sagaMiddleware,
        createLogger()
      )
    )
  )

  sagaMiddleware.run(rootSaga({ api: api
                              , wpath: C.WALLET_IMMUTABLE_PATH
                              , dpath: C.BLOCKCHAIN_DATA_PATH}))

  return {
    ...store
    // runSaga: sagaMiddleware.run
  }
}

export default configureStore
