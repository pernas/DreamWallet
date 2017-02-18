
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
      // TODO :: I need to handle dpasswordhash and checks before running
      // TODO :: I should start using selectors instead of accessing the state
      // TODO :: probably WalletUtils.encrypt should be run before launching the action
      // and it should return Either error wallet and then show UI error if some keys are not able to decrypt
      const password = action.payload
      return WalletUtils.encrypt(password)(state)
    }
    case A.SECOND_PASSWORD_OFF: {
      const password = action.payload
      return WalletUtils.decrypt(password)(state)
    }
    default:
      return state
  }
}
