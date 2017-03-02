
import { view, compose, prop, map, flatten } from 'ramda'
import { addresses, hdwallets, accounts, iLensProp } from '../lens'

// NOTE: this can definitely be improved
export const getWalletContext = (wallet) => flatten([
  map(prop('addr'), view(addresses, wallet).toList().toJS()),
  map(prop('xpub'), view(compose(hdwallets, iLensProp(0), accounts), wallet).toJS())
])

export const getTransactions = context => state =>
  state.blockchainData.addressesInfo.get(context).transactions
