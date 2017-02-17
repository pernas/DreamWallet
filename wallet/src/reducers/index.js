import { combineReducers } from 'redux';
import { LOAD_WALLET } from '../actions'
import { Wallet } from '../immutable'

// const INITIAL_STATE = Wallet()

// console.log(INITIAL_STATE)
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

export const walletReducer = (state = {}, action) => {
  let { type } = action
  switch (type) {
    // case DEFAULT_ACCOUNT_SET: {
    //   return state.setDefaultAccountIndex(action.index)
    // }
    case LOAD_WALLET: {
      return state
    }
    default:
      return state
  }
}
