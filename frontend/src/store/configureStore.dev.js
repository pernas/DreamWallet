import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from 'dream-wallet/lib/sagas'

// import { Socket } from 'dream-wallet/lib/network'
import { blockchainDataMiddleware, walletSyncMiddleware, walletSocketMiddleware } from 'dream-wallet/lib/middleware'
import { createWalletApi } from 'dream-wallet/lib/network'

const configureStore = () => {
  // const socket = new Socket()
  const api = createWalletApi()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        // walletSyncMiddleware({ api, path: 'wallet' }),
        // walletSocketMiddleware({ socket }),
        sagaMiddleware,
        // blockchainDataMiddleware({ api }),
        createLogger()
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  sagaMiddleware.run(rootSaga(api))

  return {
    ...store
    // runSaga: sagaMiddleware.run
  }
}

export default configureStore
