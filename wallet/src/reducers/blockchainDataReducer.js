import { List, OrderedMap } from 'immutable'
import { set, over } from 'ramda'
import { iLensPath } from '../lens'
import { Data, WalletInfo, Info, Block, AddressInfo, Tx } from '../immutable'
import { WALLET_CLEAR, WALLET_DATA_LOAD, CONTEXT_TXS_LOAD, CONTEXT_TXS_CLEAR } from '../actions'

const INITIAL_STATE = Data()

let makeTxsLens = (context) => iLensPath(['addressesInfo', context, 'transactions'])

const blockchainDataReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case WALLET_DATA_LOAD: {
      let { payload } = action
      // NOTE: more of this setting should be handled by the data structures themselves
      state = state.set('info', Info({ latest_block: Block(payload.info.latest_block) }))
      state = state.set('walletInfo', WalletInfo(payload.wallet))
      let as = OrderedMap(payload.addresses.map(AddressInfo).map(a => [a.address, a]))
      state = state.set('addressesInfo', as)
      return state
    }
    case CONTEXT_TXS_LOAD: {
      // NOTE: how to handle txs for groups (all legacy addresses)? selector?
      let { payload } = action
      let txs = List(payload.txs.map(Tx))
      let txsLens = makeTxsLens(payload.addresses[0].address)
      return over(txsLens, t => t.concat(txs), state)
    }
    case CONTEXT_TXS_CLEAR: {
      let { payload: context } = action
      return set(makeTxsLens(context), List(), state)
    }
    case WALLET_CLEAR: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default blockchainDataReducer
