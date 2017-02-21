import { Record } from 'immutable-ext'
import { encryptSecPass, decryptSecPass } from '../WalletCrypto'
import { curry, over } from 'ramda'
import * as Lens from '../lens'

const AddressType = Record({
  addr: '',
  priv: null,
  tag: 0,
  label: '',
  created_time: 0,
  created_device_name: '',
  created_device_version: ''
})

const Address = (obj) => new AddressType(obj)

// encrypt :: Number -> String -> String -> Address -> Address
export const encrypt = curry((iterations, sharedKey, password, address) => {
  const cipher = encryptSecPass(sharedKey, iterations, password)
  console.log(cipher)
  return over(Lens.priv, cipher, address)
})

export default Address
