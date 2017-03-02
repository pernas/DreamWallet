import { Record } from 'immutable-ext'

// NOTE: need to make this more immutable
const TxType = Record({
  hash: '',
  result: null,
  ver: null,
  inputs: [],
  vin_sz: 0,
  out: [],
  vout_sz: 0,
  block_height: null,
  relayed_by: '',
  lock_time: 0,
  // size: null, // BUG: immutable js doesn't like `size` in records
  time: null,
  tx_index: null
})

export default TxType
