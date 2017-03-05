// import createWalletApi from './walletApi'
import { createWalletApi } from '../network'
import { WALLET_INITIAL_STATE } from '../reducers'
import * as A from '../actions'

const walletSyncMiddleware = ({ path, api } = {}) => (store) => (next) => (action) => {
  // api url configuration should probably be comming from options so the frontend can configure the url
  // let API = createWalletApi()
  let prevWallet = store.getState()[path]
  let result = next(action)
  let nextWallet = store.getState()[path]

  // Easily know when to sync, because of ✨immutable✨ data
  // the initial_state check could be done against full payload state

  // TODO: reuse save code for both cases. This code could be a lot better
  if (Array.isArray(prevWallet)) { // if multiple wallets

    if(action.type === A.MULTI_WALLET_DISPATCH) {
      let { index, action: walletAction } = action.payload
      let enhancedActions = A.enhanceActionCreatorsForMulti(index, A)

      if (walletAction.type !== A.PAYLOAD_CHECKSUM_CHANGE
          && prevWallet[index].get('password') !== ''
          && nextWallet[index].get('password') !== '' // we need a logged in control here
          && prevWallet[index].get('wallet') !== WALLET_INITIAL_STATE
          && prevWallet[index] !== nextWallet[index]) {
        api.saveWallet(nextWallet[index]).then(checksum => {
          store.dispatch(enhancedActions.changePayloadChecksum(checksum))
          return checksum
        }).then(
          () => console.log('--> wallet saved!!')
        ).catch(
          () => console.log('--> save failed!!')
        )
      }

    }
  } else { // single wallet case
    if (action.type !== A.PAYLOAD_CHECKSUM_CHANGE
        && prevWallet.get('password') !== ''
        && nextWallet.get('password') !== '' // we need a logged in control here
        && prevWallet.get('wallet') !== WALLET_INITIAL_STATE
        && prevWallet !== nextWallet) {
      api.saveWallet(nextWallet).then(checksum => {
        store.dispatch(A.changePayloadChecksum(checksum))
        return checksum
      }).then(
        () => console.log('--> wallet saved!!')
      ).catch(
        () => console.log('--> save failed!!')
      )
    }
  }


  return result
}

export default walletSyncMiddleware
