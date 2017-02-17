import { Record, List } from 'immutable-ext'
import Account from './Account'
import { lensProp, over, compose, map } from 'ramda'

const HDWalletType = Record({
  seed_hex: '',
  passphrase: '',
  mnemonic_verified: false,
  default_account_idx: 0,
  accounts: List(),
})

const HDWalletsCons = (obj) => new HDWalletType(obj)
const accountsLens = lensProp('accounts');
const accountsCons = over(accountsLens, map(Account))
const HDWallet = compose(HDWalletsCons, accountsCons)

export default HDWallet
