import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'

import { Socket } from 'dream-wallet/lib/network'
import { walletSyncMiddleware, walletSocketMiddleware } from 'dream-wallet/lib/middleware'

// Tip: replace the thunk and promise middleware with the redux-saga middleware

const configureStore = () => {
  const socket = new Socket()
  const store = createStore(
    reducers,
    applyMiddleware(
      walletSyncMiddleware({ path: 'wallet' }),
      walletSocketMiddleware({ socket }),
      createLogger()
    )
  )

  return {
    ...store
    // Tip: you have to add something here from redux-saga
  }
}

export default configureStore
