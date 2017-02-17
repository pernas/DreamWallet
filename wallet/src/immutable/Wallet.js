import { Record, List, Map } from 'immutable-ext'
import Address from './Address'
import Options from './Options'
import HDWallet from './HDWallet'
import { compose, map } from 'ramda'
import { over } from 'ramda-lens'
import * as Lens from '../lens'

const WalletType = Record({
  guid: '',
  sharedKey: '',
  double_encryption: false,
  address_book: List(),
  keys: List(),
  hd_wallets: List(),
  options: Map()
})

const WalletCons = (o) => new WalletType(o)
const addresses = over(Lens.addresses, map(Address))
const options = over(Lens.options, Options)
const hdwallets = over(Lens.hdwallets, map(HDWallet))
const Wallet = compose(hdwallets, addresses, options, WalletCons)

export default Wallet
