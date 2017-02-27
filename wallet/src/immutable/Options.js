import { Record } from 'immutable-ext'

const OptionsType = Record({
  pbkdf2_iterations: 5000,
  fee_per_kb: 10000,
  html5_notifications: false,
  logout_time: 600000
})

const Options = (obj) => new OptionsType(obj)

export default Options
