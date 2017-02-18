import { Record, List, Map } from 'immutable-ext'
import Address from './Address'
import Options from './Options'
import HDWallet from './HDWallet'
import { compose, map , over} from 'ramda'
import * as Lens from '../lens'

const WalletType = Record({
  guid: '',
  sharedKey: '',
  double_encryption: false,
  address_book: List(),
  keys: Map(),
  hd_wallets: List(),
  options: Map()
})

const WalletCons = (o) => new WalletType(o)
// addressMapCons :: [{addr: myaddress, priv, ...}] -> Map('addr', Address)
const addressMapCons = as => Map(as.map(a => [a.addr, Address(a)]))
const addresses = over(Lens.addresses, addressMapCons)
const options = over(Lens.options, Options)
const hdwallets = over(Lens.hdwallets, compose(map(HDWallet), List))
const addressBook = over(Lens.addressBook, List)
const Wallet = compose(addressBook, hdwallets, addresses, options, WalletCons)

export default Wallet
