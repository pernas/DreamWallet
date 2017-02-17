// I might to differenciate between immutable and regular js lens
import { lens } from 'ramda-lens'

export const iLensProp = key =>
  lens((x) => x.get(key), (val, x) => x.set(key, val))

export const addresses = iLensProp('keys')
export const options = iLensProp('options')
export const hdwallets = iLensProp('hd_wallets')
export const accounts = iLensProp('accounts')
export const cache = iLensProp('cache')
