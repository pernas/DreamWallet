// export const DEFAULT_ACCOUNT_SET = '@v3.DEFAULT_ACCOUNT_SET'
export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const WALLET_LOAD = '@v3.WALLET_LOAD'

// export const setDefaultAccountIndex = (index) => ({ type: DEFAULT_ACCOUNT_SET, index })
export const addAddress = (address) => ({ type: ADDRESS_ADD, address })
export const loadWallet = (wallet) => ({ type: WALLET_LOAD, payload: wallet })
