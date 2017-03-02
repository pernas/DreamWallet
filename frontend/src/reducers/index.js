import { combineReducers } from 'redux'
import login from './login'
import transactions from './transactions'
import status from './status'
import { multiWalletReducer, blockchainDataReducer } from 'dream-wallet/lib/reducers'
import { SAVE_SESSION, SELECTION_SET } from '../actions'

const session = (state = '', action) => {
  let { type } = action
  switch (type) {
    case SAVE_SESSION: {
      return action.payload
    }
    default:
      return state
  }
}

const selection = (state = 0, action) => {
  let { type } = action
  switch (type) {
    case SELECTION_SET: {
      return action.payload
    }
    default:
      return state
  }
}

const reducers = combineReducers({
  session: session,
  selection,
  loginState: login,
  transactions,
  status,
  blockchainData: blockchainDataReducer,
  wallets: multiWalletReducer
})

export default reducers
