
import { Record, List } from 'immutable-ext'
import Address from './Address'
import { lensProp, view, over, compose, map } from 'ramda'

const WalletType = Record({
  guid: null,
  sharedKey: null,
  keys: List()
})

const addressLens = lensProp('keys');

const Wallet = (obj) => new WalletType(over(addressLens, map(Address))(obj))

export default Wallet
