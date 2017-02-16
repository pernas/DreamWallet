
import { Record } from 'immutable-ext'

const AddressType = Record({
  addr: null,
  priv: null,
  tag: 0,
  label: null,
  created_time: null,
  created_device_name: null,
  created_device_version: null
})

const Address = (obj) => new AddressType(obj)

export default Address
