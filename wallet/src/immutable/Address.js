
import { Record } from 'immutable'

const AddressRecord = Record({
  addr: null,
  priv: null,
  tag: 0
})

class Address extends AddressRecord {
  get active () {
    return this.get('tag') === 0
  }

  get archived () {
    return !this.active
  }

  setActive () {
    return this.set('tag', 0)
  }

  setArchived () {
    return this.set('tag', 2)
  }
}

export default Address
