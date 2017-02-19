export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const WALLET_LOAD = '@v3.WALLET_LOAD'
export const WALLET_CLEAR = '@v3.WALLET_CLEAR'
export const SECOND_PASSWORD_ON = '@v3.SECOND_PASSWORD_ON'
export const SECOND_PASSWORD_OFF = '@v3.SECOND_PASSWORD_OFF'

export const addAddress = (address, secondPassword) => ({ type: ADDRESS_ADD, payload: {address, secondPassword}})
export const loadWallet = (wallet) => ({ type: WALLET_LOAD, payload: wallet })
export const clearWallet = () => ({ type: WALLET_CLEAR })
export const secondPasswordOn = (newWallet) => ({ type: SECOND_PASSWORD_ON, payload: newWallet })
export const secondPasswordOff = (newWallet) => ({ type: SECOND_PASSWORD_OFF, payload: newWallet })
