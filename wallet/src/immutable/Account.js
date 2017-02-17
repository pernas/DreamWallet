import { Record, List, Map } from 'immutable-ext'
import Cache from './Cache'
import { lensProp, over, compose, map } from 'ramda'

const AccountType = Record({
  label: '',
  archived: false,
  xpriv: '',
  xpub: '',
  address_labels: List(),
  cache: Map()
})

const AccountCons = (obj) => new AccountType(obj)
const cacheLens = lensProp('cache');
const cacheCons = over(cacheLens, Cache)
const Account = compose(AccountCons, cacheCons)

export default Account
