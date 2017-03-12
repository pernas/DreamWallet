
export const SECOND_PASSWORD_ERROR = 'SECOND_PASSWORD_ERROR'
export const INCONSISTENT_WALLET_STATE_ERROR = 'INCONSISTENT_WALLET_STATE_ERROR'
export const SAVE_SESSION = 'SAVE_SESSION'
export const PANEL_SWITCH = 'PANEL_SWITCH'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export const login = () => ({ type: LOGGED_IN })
export const logout = () => ({ type: LOGGED_OUT })

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const loginStart = credentials => ({ type: LOGIN_START, payload: credentials })
export const loginSuccess = () => ({ type: LOGIN_SUCCESS })
export const loginError = payload => ({ type: LOGIN_ERROR, payload, error: true })

export const secondPasswordError = (payload) => ({ type: SECOND_PASSWORD_ERROR, payload, error: true })
export const inconsistentWalletStateError = (payload) => ({ type: INCONSISTENT_WALLET_STATE_ERROR, payload, error: true })

export const saveSession = (payload) => ({ type: SAVE_SESSION, payload })

export const switchPanel = panel => ({
  type: PANEL_SWITCH,
  payload: panel
})
