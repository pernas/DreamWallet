import { combineReducers } from 'redux'
import login from './login'
import transactions from './transactions'
import status from './status'
import { walletReducer, blockchainDataReducer } from 'dream-wallet/lib/reducers'
import { SAVE_SESSION } from '../actions'

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

const reducers = combineReducers({
  session: session,
  loginState: login,
  transactions,
  status,
  blockchainData: blockchainDataReducer,
  wallet: walletReducer
})


export default reducers
