import { Record } from 'immutable-ext'

const CacheType = Record({
  receiveAccount: '',
  changeAccount: ''
})

const Cache = (obj) => new CacheType(obj)

export default Cache
