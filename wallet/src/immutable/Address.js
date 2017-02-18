import { Record } from 'immutable-ext'

const AddressType = Record({
  addr: '',
  priv: null,
  tag: 0,
  label: '',
  created_time: 0,
  created_device_name: '',
  created_device_version: ''
})

const Address = (obj) => new AddressType(obj)

export default Address
