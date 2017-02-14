import { combineReducers } from 'redux'
import transactions from './transactions'
import status from './status'
import * as Wallet from 'dream-wallet'

const reducers = combineReducers({
  transactions,
  status,
  wallet: Wallet.walletReducer

})

export default reducers
