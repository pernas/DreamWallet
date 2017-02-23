import { compose } from 'ramda'
import { getWalletContext } from '../selectors'
import { WALLET_LOAD, loadWalletData, TXS_LOAD_REQUEST, loadContextTxs } from '../actions'

// NOTE: very similar to socket middleware... make common interface?
const blockchainDataMiddleware = ({ api } = {}) => (store) => {
  const { dispatch, getState } = store

  let actions = {
    [WALLET_LOAD]: ({ payload: wallet }) => {
      api.fetchBlockchainData(getWalletContext(wallet.get('wallet')), { n: 0 })
        .then(compose(store.dispatch, loadWalletData))
    },
    [TXS_LOAD_REQUEST]: ({ payload: context }) => {
      // NOTE: context must be a single address, for now
      context = Array.isArray(context) ? context[0] : context
      let currentTxs = getState().blockchainData.addressesInfo.get(context).transactions
      api.fetchBlockchainData(context, { n: 50, offset: currentTxs.size })
        .then(compose(dispatch, loadContextTxs))
    }
  }

  return (next) => (action) => {
    let { type } = action
    if (actions[type]) actions[type](action)
    return next(action)
  }
}

export default blockchainDataMiddleware
