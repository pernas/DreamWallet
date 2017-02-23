// import createWalletApi from './walletApi'
import { createWalletApi } from '../network'
import { WALLET_INITIAL_STATE } from '../reducers'

const walletSyncMiddleware = (API) => (options) => (store) => (next) => (action) => {
  // api url configuration should probably be comming from options so the frontend can configure the url
  // let API = createWalletApi()
  let prevWallet = store.getState()[options.path]
  let result = next(action)
  let nextWallet = store.getState()[options.path]

  // Easily know when to sync, because of ✨immutable✨ data
  // the initial_state check could be done against full payload state

  if (prevWallet.get('password') !== ''
      && nextWallet.get('password') !== '' // we need a logged in control here
      && prevWallet.get('wallet') !== WALLET_INITIAL_STATE
      && prevWallet !== nextWallet) {
    API.saveWallet(nextWallet).then(
      () => console.log('--> saved!!')
    ).catch(
      () => console.log('--> save failed!!')
    )
  }
  return result
}

export default walletSyncMiddleware
