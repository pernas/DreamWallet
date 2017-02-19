import { Record, Map } from 'immutable-ext'
import Cache from './Cache'
import { compose, map, over } from 'ramda'
import * as Lens from '../lens'

const AccountType = Record({
  label: '',
  archived: false,
  xpriv: '',
  xpub: '',
  address_labels: Map(),
  cache: Map()
})

const AccountCons = (obj) => new AccountType(obj)
const cache = over(Lens.cache, Cache)
const addressLabelsMapCons = ls => Map(ls.map(l => [l.index, l]))
const addressLabels = over(Lens.addressLabels, addressLabelsMapCons)
const Account = compose(addressLabels, cache, AccountCons)

export const labelsToList = over(Lens.addressLabels, m => m.toList())

export default Account
