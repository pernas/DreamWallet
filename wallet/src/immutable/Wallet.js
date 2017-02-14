
import { Record, List } from 'immutable'
import Address from './Address'

// NOTE: come up with a better way of dealing with nested state,
//  Juame suggested normalizr, maybe lenses could also work?

const WalletRecord = Record({
  defaultAccount: 0,
  keys: List()
})

class Wallet extends WalletRecord {
  setDefaultAccountIndex (index) {
    return this.set('defaultAccount', index)
  }

  pushAddress (addr) {
    let a = new Address({ addr })
    return this.set('keys', this.keys.push(a))
  }
}

export default Wallet
