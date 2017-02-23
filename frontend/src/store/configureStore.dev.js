import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'

// import { Socket } from 'dream-wallet/lib/network'
import { blockchainDataMiddleware, walletSyncMiddleware, walletSocketMiddleware } from 'dream-wallet/lib/middleware'
import { createWalletApi } from 'dream-wallet/lib/network'

// Tip: replace the thunk and promise middleware with the redux-saga middleware

const configureStore = () => {
  // const socket = new Socket()
  const api = createWalletApi()  // not sure how to reuse that API in the frontend in general.
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(
        // walletSyncMiddleware({ api, path: 'wallet' }),
        // walletSocketMiddleware({ socket }),
        blockchainDataMiddleware({ api }),
        createLogger()
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  return {
    ...store
    // Tip: you have to add something here from redux-saga
  }
}

export default configureStore
