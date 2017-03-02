import { Map } from 'immutable'
import { update, append } from 'ramda'
import * as A from '../actions'
import walletReducer, { WALLET_INITIAL_STATE } from './walletReducer'

const PAYLOAD_INIT = Map.of('wallet', WALLET_INITIAL_STATE)
const MULTI_WALLET_INIT = [PAYLOAD_INIT]

const multiWalletReducer = (state = MULTI_WALLET_INIT, action) => {
  const { type } = action
  switch (type) {
    case A.MULTI_WALLET_DISPATCH: {
      let { index, action: walletAction } = action.payload
      let nextWalletState = walletReducer(state[index], walletAction)
      return update(index, nextWalletState, state)
    }
    case A.MULTI_WALLET_NEW: {
      return append(PAYLOAD_INIT, state)
    }
    default:
      return state
  }
}

export default multiWalletReducer
