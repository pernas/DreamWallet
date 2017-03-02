import { Record, OrderedMap } from 'immutable'
import Info from './Info'
import WalletInfo from './WalletInfo'

const Data = Record({
  info: Info(),
  walletInfo: WalletInfo(),
  addressesInfo: OrderedMap()
})

export default Data
