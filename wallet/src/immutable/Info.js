import { Record } from 'immutable'
import Block from './Block'

const Info = Record({
  latest_block: Block()
})

export default Info
