export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const WALLET_LOAD = '@v3.WALLET_LOAD'
export const WALLET_CLEAR = '@v3.WALLET_CLEAR'

export const addAddress = (address) => ({ type: ADDRESS_ADD, payload: address })
export const loadWallet = (wallet) => ({ type: WALLET_LOAD, payload: wallet })
export const clearWallet = () => ({ type: WALLET_CLEAR })
