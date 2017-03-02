import { Record, List } from 'immutable'

const AddressInfo = Record({
  address: '',
  n_tx: 0,
  total_received: 0,
  total_sent: 0,
  final_balance: 0,
  change_index: 0,
  account_index: 0,
  transactions: List()
})

export default AddressInfo
