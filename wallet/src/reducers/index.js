
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
      // this is an example writing the logic on the reducer
      // probably is better to break this into pieces or write it better
      const {address, secondPassword} = action.payload
      const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), state)
      const sharedKey = view(Lens.sharedKey, state)
      const plainAddress = Address(address)
      const isSP = view(Lens.doubleEncryption ,state)
      const isVSP = isSP && WalletUtils.isValidSecondPwd(secondPassword, state)
      const finalAddress = isVSP
        ? over(Lens.priv , encryptSecPass(sharedKey, iterations, secondPassword), plainAddress)
        : plainAddress
      if (isSP && !isVSP) {
        return state
      } else {
        return over(Lens.addresses, as => as.set(finalAddress.get('addr'), finalAddress), state)
      }
    }
    default:
      return state
  }
}
