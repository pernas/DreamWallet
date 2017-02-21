import Data from '../immutable/Data'

export const TRANSACTIONS_ADD = '@v3.TRANSACTIONS_ADD'
export const TRANSACTIONS_ADD_MUL = '@v3.TRANSACTIONS_ADD_MUL'
export const TRANSACTIONS_CLEAR = '@v3.TRANSACTIONS_CLEAR'

export const addTransaction = (tx) => ({ type: TRANSACTIONS_ADD, payload: tx })
export const addTransactions = (txs) => ({ type: TRANSACTIONS_ADD_MUL, payload: txs })
export const clearTransactions = () => ({ type: TRANSACTIONS_CLEAR })

export const BLOCKCHAIN_DATA_LOAD = '@v3.BLOCKCHAIN_DATA_LOAD'
export const BLOCKCHAIN_DATA_CLEAR = '@v3.BLOCKCHAIN_DATA_CLEAR'

const INITIAL_STATE = Data()

const transactionsReducer = (state = INITIAL_STATE, action) => {
  let { type } = action
  switch (type) {
    case BLOCKCHAIN_DATA_LOAD: {
      let { payload: data } = action
      return data
    }
    case BLOCKCHAIN_DATA_CLEAR: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}

export default transactionsReducer
