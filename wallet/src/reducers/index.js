
import { over, append, set } from 'ramda'
import * as Lens from '../lens'
import { WALLET_LOAD, WALLET_CLEAR, ADDRESS_ADD } from '../actions'
import { Wallet, Address } from '../immutable'

const INITIAL_STATE = Wallet()

export const walletReducer = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
    case WALLET_LOAD: {
      return action.payload
    }
    case WALLET_CLEAR: {
      return Wallet()
    }
    case ADDRESS_ADD: {
      const address = Address({ addr: action.payload })
      return over(Lens.addresses, as => as.set(address.get('addr'), address), state)
    }
    default:
      return state
  }
}
