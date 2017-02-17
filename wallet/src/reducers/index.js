
import { over, append } from 'ramda'
import * as Lens from '../lens'
import { WALLET_LOAD, WALLET_CLEAR, ADDRESS_ADD } from '../actions'
import { Wallet, Address } from '../immutable'

const INITIAL_STATE = Wallet()

export const walletReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case WALLET_LOAD: {
      return action.payload
    }
    case WALLET_CLEAR: {
      return Wallet()
    }
    case ADDRESS_ADD: {
      let address = Address({ addr: action.payload })
      return over(Lens.addresses, append(address), state)
    }
    default:
      return state
  }
}
