
import { WALLET_LOAD } from '../actions'
import { Wallet } from '../immutable'

const INITIAL_STATE = Wallet()

export const walletReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    // case DEFAULT_ACCOUNT_SET: {
    //   return state.setDefaultAccountIndex(action.index)
    // }
    case WALLET_LOAD: {
      return action.payload
    }
    default:
      return state
  }
}
