import { mapObjIndexed } from 'ramda'

export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const ADDRESS_LABEL = '@v3.ADDRESS_LABEL'
export const WALLET_LOAD = '@v3.WALLET_LOAD'
export const WALLET_CLEAR = '@v3.WALLET_CLEAR'
export const SECOND_PASSWORD_ON = '@v3.SECOND_PASSWORD_ON'
export const SECOND_PASSWORD_OFF = '@v3.SECOND_PASSWORD_OFF'
export const MAIN_PASSWORD_CHANGE = '@v3.MAIN_PASSWORD_CHANGE'
export const PAYLOAD_CHECKSUM_CHANGE = '@v3.PAYLOAD_CHECKSUM_CHANGE'
export const WALLET_DATA_REQUEST = '@v3.WALLET_DATA_REQUEST'
export const WALLET_DATA_LOAD = '@v3.WALLET_DATA_LOAD'
export const CONTEXT_TXS_LOAD = '@v3.CONTEXT_TXS_LOAD'
export const TXS_LOAD_REQUEST = '@v3.TXS_LOAD_REQUEST'
export const CONTEXT_TXS_CLEAR = '@v3.CONTEXT_TXS_CLEAR'
export const MULTI_WALLET_DISPATCH = '@v3.MULTI_WALLET_DISPATCH'
export const MULTI_WALLET_NEW = '@v3.MULTI_WALLET_NEW'

export const addAddress = (address, secondPassword) =>
  ({ type: ADDRESS_ADD, payload: {address, secondPassword} })
export const addLabel = (address, label) =>
  ({ type: ADDRESS_LABEL, payload: {address, label} })
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
export const loadWalletData = (data) =>
  ({ type: WALLET_DATA_LOAD, payload: data })
export const requestWalletData = (wallet) =>
  ({ type: WALLET_DATA_REQUEST, payload: wallet })
export const loadContextTxs = (data) =>
  ({ type: CONTEXT_TXS_LOAD, payload: data })
export const requestTxs = (context) =>
  ({ type: TXS_LOAD_REQUEST, payload: context })
export const clearTxs = (context) =>
  ({ type: CONTEXT_TXS_CLEAR, payload: context })
export const dispatchMultiWallet = (index, action) =>
  ({ type: MULTI_WALLET_DISPATCH, payload: { index, action } })
export const newMultiWallet = () =>
  ({ type: MULTI_WALLET_NEW })

export const enhanceActionCreatorsForMulti = (index, actionCreators) => (
  mapObjIndexed((a) => (...args) => dispatchMultiWallet(index, a(...args)), actionCreators)
)
