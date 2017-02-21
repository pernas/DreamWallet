
import { over, append, set, compose, view } from 'ramda'
import * as Lens from '../lens'
import * as A from '../actions'
import { Wallet, WalletUtils, Address } from '../immutable'
import { encryptSecPass } from '../WalletCrypto'

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
      const {address, secondPassword} = action.payload
      return WalletUtils.addAddress(state, Address(address), secondPassword)
    }
    case A.ADDRESS_LABEL: {
      const {address, label} = action.payload
      const myAddressLens = compose(Lens.addresses, Lens.iLensProp(address));
      if(!view(myAddressLens, state)) { return state }
      return set(compose(myAddressLens, Lens.label), label ,state)
    }
    default:
      return state
  }
}
