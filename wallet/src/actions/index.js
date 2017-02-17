// export const DEFAULT_ACCOUNT_SET = '@v3.DEFAULT_ACCOUNT_SET'
export const ADDRESS_ADD = '@v3.ADDRESS_ADD'
export const LOAD_WALLET = '@v3.LOAD_WALLET'

// export const setDefaultAccountIndex = (index) => ({ type: DEFAULT_ACCOUNT_SET, index })
export const addAddress = (address) => ({ type: ADDRESS_ADD, address })
export const loadwallet = (wallet) => ({ type: LOAD_WALLET, payload: wallet })
