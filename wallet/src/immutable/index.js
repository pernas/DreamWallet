const { Record } = require('immutable')

const WalletRecord = Record({ defaultAccount: 0 })

export default class Wallet extends WalletRecord {
  setDefaultAccountIndex (index) {
    return this.set('defaultAccount', index)
  }
}
