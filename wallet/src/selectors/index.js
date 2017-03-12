
import { view, compose, prop, map, flatten } from 'ramda'
import { mapped } from 'ramda-lens'
import * as Lens from '../lens'
import { Map, List } from 'immutable-ext'

// _xpubs :: [account] -> [xpub]
const _xpubs = as => view(compose(mapped, Lens.xpub), as)
// _accounts :: [hdwallet] -> [account]
const _accounts = hs => view(compose(mapped, Lens.accounts), hs).fold()
// _addresses :: {keys} -> [addresses]
const _addresses = ks => ks.keySeq().toList()

export const getXpubs = compose(_xpubs, _accounts, view(Lens.hdwallets), view(Lens.walletImmutable))
export const getAddresses = compose(_addresses, view(Lens.addresses), view(Lens.walletImmutable))
export const getWalletContext = w => List([getXpubs(w), getAddresses(w)]).fold()

export const getWallet = payload => payload.get('walletImmutable')
export const isDoubleEncrypted = wallet => wallet.get('double_encryption')

export const getTransactions = dpath => context => state => {
  let info = state[dpath].get('addressesInfo').get(context)
  return info ? info.get('transactions') : List([])
}
