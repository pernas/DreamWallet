
import { over, append, set, compose, view } from 'ramda'
import * as Lens from '../lens'
import * as A from '../actions'
import { Wallet, WalletUtils, Address } from '../immutable'

const INITIAL_STATE = Wallet()

export const walletReducer = (state = INITIAL_STATE, action) => {
  const { type } = action
  switch (type) {
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
    case A.SECOND_PASSWORD_ON: {
      // TODO :: probably WalletUtils.encrypt should be run before launching the action
      return state
    }
    case A.SECOND_PASSWORD_OFF: {
      return state
    }
    default:
      return state
  }
}
