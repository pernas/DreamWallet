export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const ADDRESS_LABEL = '@v3.ADDRESS_LABEL'
export const WALLET_LOAD = '@v3.WALLET_LOAD'
export const WALLET_CLEAR = '@v3.WALLET_CLEAR'
export const SECOND_PASSWORD_ON = '@v3.SECOND_PASSWORD_ON'
export const SECOND_PASSWORD_OFF = '@v3.SECOND_PASSWORD_OFF'
export const MAIN_PASSWORD_CHANGE = '@v3.MAIN_PASSWORD_CHANGE'
export const PAYLOAD_CHECKSUM_CHANGE = '@v3.PAYLOAD_CHECKSUM_CHANGE'

export const addAddress = (address, secondPassword) =>
  ({ type: ADDRESS_ADD, payload: {address, secondPassword}})
export const addLabel = (address, label) =>
  ({ type: ADDRESS_LABEL, payload: {address, label}})
export const loadWallet = (payload) =>
  ({ type: WALLET_LOAD, payload: payload })
export const clearWallet = () =>
  ({ type: WALLET_CLEAR })
export const secondPasswordOn = (newWallet) =>
  ({ type: SECOND_PASSWORD_ON, payload: newWallet })
export const secondPasswordOff = (newWallet) =>
  ({ type: SECOND_PASSWORD_OFF, payload: newWallet })
export const changeMainPassword = (password) =>
  ({ type: MAIN_PASSWORD_CHANGE, payload: password })
export const changePayloadChecksum = (checksum) =>
  ({ type: PAYLOAD_CHECKSUM_CHANGE, payload: checksum })
