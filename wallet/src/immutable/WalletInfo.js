import { Record } from 'immutable'

const WalletInfo = Record({
  n_tx: null,
  n_tx_filtered: null,
  total_received: null,
  total_sent: null,
  final_balance: null
})

export default WalletInfo
