import { Record, List, Map } from 'immutable-ext'
import Either from 'data.either'
import Address from './Address'
import Options from './Options'
import HDWallet from './HDWallet'
import * as HD from './HDWallet'
import { compose, map , over, view, curry, identity } from 'ramda'
import { iso, mapped, traversed, traverseOf } from 'ramda-lens'
import * as Lens from '../lens'
import { encryptSecPass, decryptSecPass, hashNTimes } from '../WalletCrypto'
// import prettyI from "pretty-immutable"
// const print = compose(console.log, prettyI)

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

export const testEncryption = () => encrypt('mypassword',Wallet())
// second password support
// cipher :: (str => str) -> Wallet -> Either error Wallet
export const cipher = curry((f, wallet) => {
  // check that example to understand traverse:
  // https://github.com/ramda/ramda-lens/commit/adb3ef830ef65d3b252e8c9b86b9659e9698cdba#diff-c1129c8b045390789fa8ff62f2c6b4a9R88
  const trAddr = traverseOf(compose(Lens.addresses, traversed, Lens.priv), Either.of, f)
  const traSeed = traverseOf(compose(Lens.hdwallets, traversed, Lens.seedHex), Either.of, f)
  const traXpriv = traverseOf(compose(Lens.hdwallets, traversed, Lens.accounts, traversed, Lens.xpriv ), Either.of, f)
  return Either.Right(wallet).chain(trAddr).chain(traSeed).chain(traXpriv)
})

// encrypt :: str -> Wallet -> Either error Wallet
export const encrypt = curry((password, wallet) => {
  if(view(Lens.doubleEncryption, wallet)) {
    return Either.Right(wallet)
  } else {
    const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), wallet)
    const sharedKey = view(Lens.sharedKey, wallet)
    const enc = Either.try(encryptSecPass(sharedKey, iterations, password))
    const setFlag = over(Lens.doubleEncryption, () => true)
    const hash = hashNTimes(iterations, sharedKey + password).toString('hex')
    const setHash = over(Lens.dpasswordhash, () => hash)
    return cipher(enc, wallet).map(compose(setHash, setFlag))
  }
})

const checkFailure = str => str === "" ? Either.Left('DECRYPT_FAILURE') : Either.Right(str)
// decrypt :: str -> Wallet -> Either error Wallet
export const decrypt = curry((password,wallet) => {
  if(view(Lens.doubleEncryption, wallet) && isValidSecondPwd(password, wallet)) {
    const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), wallet)
    const sharedKey = view(Lens.sharedKey, wallet)
    const tryDec = Either.try(decryptSecPass(sharedKey, iterations, password))
    const dec = msg => tryDec(msg).chain(checkFailure)
    const setFlag = over(Lens.doubleEncryption, () => false)
    const setHash = over(Lens.dpasswordhash, () => null)
    return cipher(dec, wallet).map(compose(setHash, setFlag))
  } else {
    return Either.Right(wallet)
  }
})

export const isValidSecondPwd = curry((password, wallet) => {
  if(view(Lens.doubleEncryption, wallet)) {
    const iterations = view(compose(Lens.options, Lens.pbkdf2Iterations), wallet)
    const sharedKey = view(Lens.sharedKey, wallet)
    const storedHash = view(Lens.dpasswordhash, wallet)
    const computedHash = hashNTimes(iterations, sharedKey + password).toString('hex')
    return storedHash === computedHash
  } else {
    // there is no second password active
    return false
  }
})

export const wIso = iso(toJS, fromJS)
// view(wIso, w) :: wallet in pure js (can be used as a lens)
// With over can be used to apply myFunction acting over pure javascript
// and returning the immutable structure
// over(wIso, myFunction, immWallet)

export default Wallet
