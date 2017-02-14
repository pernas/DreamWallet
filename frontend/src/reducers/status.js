import * as Actions from '../actions'

export const INITIAL_STATE = {}
let assign = (state, next) => Object.assign({}, state, next)

const status = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case Actions.LOGGED_IN: {
      return assign(state, { isLoggedIn: true })
    }
    case Actions.LOGGED_OUT: {
      return assign(state, { isLoggedIn: false })
    }
    default:
      return state
  }
}

export default status
