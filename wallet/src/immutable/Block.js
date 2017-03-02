import { Record } from 'immutable'

const Block = Record({
  block_index: null,
  hash: '',
  height: null,
  time: null
})

export default Block
