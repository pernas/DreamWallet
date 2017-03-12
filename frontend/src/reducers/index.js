import { combineReducers } from 'redux'
import login from './login'
import { walletReducer, blockchainDataReducer } from 'dream-wallet/lib/reducers'
import { SAVE_SESSION, PANEL_SWITCH } from '../actions'
import { merge } from 'ramda'
import { reducer as formReducer } from 'redux-form'

const session = (state = {}, action) => {
  let { type } = action
  switch (type) {
    case SAVE_SESSION: {
      return merge(state, action.payload)
    }
    default:
      return state
  }
}

const panel = (state = 'login', action) => {
  let { type, payload } = action
  switch (type) {
    case PANEL_SWITCH: {
      return payload
    }
    default:
      return state
  }
}

const reducers = ({wpath, dpath}) => combineReducers({
  panel: panel,
  form: formReducer,
  session: session,
  loginState: login,
  [dpath]: blockchainDataReducer,
  [wpath]: walletReducer
})

export default reducers
