import { Record, List, Map } from 'immutable-ext'
import Address from './Address'
import Options from './Options'
import HDWallet from './HDWallet'
import * as HD from './HDWallet'
import { compose, map , over, view } from 'ramda'
import { iso, mapped } from 'ramda-lens'
import * as Lens from '../lens'
import { encryptSecPass, decryptSecPass } from '../WalletCrypto'

const WalletType = Record({
  guid: '',
  sharedKey: '',
  double_encryption: false,
  dpasswordhash: null,
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

// To JS support
const labelsToList = over(Lens.hdwallets, map(HD.labelsToList))
const addressesToList = over(Lens.addresses, m => m.toList())
export const toJS = compose((w) => w.toJS() ,addressesToList, labelsToList)
export const fromJS = Wallet
// more info about the isomorphism can be found here:
// https://medium.com/@drboolean/lenses-with-immutable-js-9bda85674780#.s591lzg5v

// second password support
// TODO :: I don't know what to do when a subset of elements have not been encrypted with the same password
export const cipher = f => wallet => {
  const encAddr = over(compose(Lens.addresses, mapped, Lens.priv), f)
  const encSeed = over(compose(Lens.hdwallets, mapped, Lens.seedHex), f)
  const encXpriv = over(compose(Lens.hdwallets, mapped, Lens.accounts, mapped, Lens.xpriv ), f)
  return compose(encSeed, encXpriv, encAddr)(wallet)
}

export const encrypt = password => wallet => {
  if(view(Lens.doubleEncryption, wallet)) {
    return wallet
  } else {
    const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), wallet)
    const sharedKey = view(Lens.sharedKey, wallet)
    const enc = encryptSecPass(sharedKey, iterations, password)
    const setFlag = over(Lens.doubleEncryption, () => true)
    return compose(setFlag, cipher(enc))(wallet)
  }
}

export const decrypt = password => wallet => {
  if(view(Lens.doubleEncryption, wallet)) {
    const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), wallet)
    const sharedKey = view(Lens.sharedKey, wallet)
    const dec = decryptSecPass(sharedKey, iterations, password)
    const setFlag = over(Lens.doubleEncryption, () => false)
    return compose(setFlag, cipher(dec))(wallet)
  } else {
    return wallet
  }
}

export const wIso = iso(toJS, fromJS)
// view(wIso, w) :: wallet in pure js (can be used as a lens)
// With over can be used to apply myFunction acting over pure javascript
// and returning the immutable structure
// over(wIso, myFunction, immWallet)

export default Wallet
