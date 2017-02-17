import { Record, List, Map } from 'immutable-ext'
import Address from './Address'
import Options from './Options'
import HDWallet from './HDWallet'
import { lensProp, over, compose, map } from 'ramda'

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
const addressesLens = lensProp('keys');
const optionsLens = lensProp('options');
const hdwalletsLens = lensProp('hd_wallets');
const addressesCons = over(addressesLens, map(Address))
const optionsCons = over(optionsLens, Options)
const hdwalletsCons = over(hdwalletsLens, map(HDWallet))
const Wallet = compose(WalletCons, addressesCons, optionsCons, hdwalletsCons)

export default Wallet
