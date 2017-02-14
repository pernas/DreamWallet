import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import * as Wallet from 'dream-wallet'

// Tip: replace the thunk and promise middleware with the redux-saga middleware

const configureStore = () => {
  const walletSyncMiddleware = Wallet.walletSyncMiddleware({ path: 'wallet' })
  const store = createStore(
    reducers,
    applyMiddleware(
      walletSyncMiddleware,
      createLogger()
    )
  )

  return {
    ...store
    // Tip: you have to add something here from redux-saga
  }
}

export default configureStore
