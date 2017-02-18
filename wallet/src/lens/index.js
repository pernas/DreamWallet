// I might to differenciate between immutable and regular js lens
import { lens, compose, identity, reduceRight } from 'ramda'

export const iLensProp = (key) => lens(
  (x) => x.get(key),
  (val, x) => x.set(key, val)
)

export const iLensPath = reduceRight(
  (key, lens) => compose(iLensProp(key), lens),
  identity
)

export const addresses = iLensProp('keys')
export const options = iLensProp('options')
export const hdwallets = iLensProp('hd_wallets')
export const accounts = iLensProp('accounts')
export const cache = iLensProp('cache')
export const addressBook = iLensProp('address_book')
export const addressLabels = iLensProp('address_labels')
