export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const WALLET_LOAD = '@v3.WALLET_LOAD'
export const WALLET_CLEAR = '@v3.WALLET_CLEAR'
export const SECOND_PASSWORD_ON = '@v3.SECOND_PASSWORD_ON'
export const SECOND_PASSWORD_OFF = '@v3.SECOND_PASSWORD_OFF'

export const addAddress = (address) => ({ type: ADDRESS_ADD, payload: address })
export const loadWallet = (wallet) => ({ type: WALLET_LOAD, payload: wallet })
export const clearWallet = () => ({ type: WALLET_CLEAR })
export const secondPasswordOn = (password) => ({ type: SECOND_PASSWORD_ON, payload: password })
export const secondPasswordOff = (password) => ({ type: SECOND_PASSWORD_OFF, payload: password })
