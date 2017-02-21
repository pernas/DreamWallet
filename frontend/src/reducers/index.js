import { combineReducers } from 'redux'
import login from './login'
import transactions from './transactions'
import status from './status'
import { walletReducer, blockchainDataReducer } from 'dream-wallet/lib/reducers'

const reducers = combineReducers({
  loginState: login,
  transactions,
  status,
  blockchainData: blockchainDataReducer,
  wallet: walletReducer
})

export default reducers
