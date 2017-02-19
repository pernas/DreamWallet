
import { over, append, set, compose, view } from 'ramda'
import * as Lens from '../lens'
import * as A from '../actions'
import { Wallet, WalletUtils, Address } from '../immutable'

const INITIAL_STATE = Wallet()

export const walletReducer = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
    case A.SECOND_PASSWORD_ON:
    case A.SECOND_PASSWORD_OFF:
    case A.WALLET_LOAD: {
      return action.payload
    }
    case A.WALLET_CLEAR: {
      return Wallet()
    }
    case A.ADDRESS_ADD: {
      const address = Address(action.payload)
      return over(Lens.addresses, as => as.set(address.get('addr'), address), state)
    }
    default:
      return state
  }
}
