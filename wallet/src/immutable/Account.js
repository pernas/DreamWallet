import { Record, List, Map } from 'immutable-ext'
import Cache from './Cache'
import { compose, map } from 'ramda'
import { over } from 'ramda-lens'
import * as Lens from '../lens'

const AccountType = Record({
  label: '',
  archived: false,
  xpriv: '',
  xpub: '',
  address_labels: List(),
  cache: Map()
})

const AccountCons = (obj) => new AccountType(obj)
const cache = over(Lens.cache, Cache)
const Account = compose(cache, AccountCons)

export default Account
