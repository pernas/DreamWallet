import { combineReducers } from 'redux'
import login from './login'
import transactions from './transactions'
import status from './status'
import * as Wallet from 'dream-wallet'

const reducers = combineReducers({
  loginState: login,
  transactions,
  status,
  wallet: Wallet.walletReducer
})

export default reducers
