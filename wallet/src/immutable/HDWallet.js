import { Record, List } from 'immutable-ext'
import Account from './Account'
import { compose, map } from 'ramda'
import { over } from 'ramda-lens'
import * as Lens from '../lens'

const HDWalletType = Record({
  seed_hex: '',
  passphrase: '',
  mnemonic_verified: false,
  default_account_idx: 0,
  accounts: List(),
})

const HDWalletsCons = (obj) => new HDWalletType(obj)
const accounts = over(Lens.accounts, map(Account))
const HDWallet = compose(accounts, HDWalletsCons)

export default HDWallet
