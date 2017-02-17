import { combineReducers } from 'redux';
import { DEFAULT_ACCOUNT_SET, LOAD_WALLET } from '../actions'
import { Wallet } from '../immutable'

const INITIAL_STATE = new Wallet()

// export default function reducer (state = INITIAL_STATE, {type, payload, error}) {
//   switch(type) {
//     case SET_MESSAGE:
//         return { message: payload }
//     case CONCAT_MESSAGE:
//         return { message: state.message + ',' + payload }
//     case WIPE_MESSAGE:
//         return { message: '' }
//     default:
//         return state;
//   }
// }

export const walletReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case DEFAULT_ACCOUNT_SET: {
      return state.setDefaultAccountIndex(action.index)
    }
    // case LOAD_WALLET: {
    //   return state.setDefaultAccountIndex(action.index)
    // }
    default:
      return state
  }
}
