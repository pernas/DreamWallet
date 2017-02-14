// @flow
import * as api from '../api'

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS'
export const FETCHING_TRANSACTIONS = 'FETCHING_TRANSACTIONS'
export const ADD_MORE_TRANSACTIONS = 'ADD_MORE_TRANSACTIONS'


export const receiveTransactions = txs => ({
  type: RECEIVE_TRANSACTIONS,
  transactions: txs
})

export const addMoreTransactions = txs => ({
  type: ADD_MORE_TRANSACTIONS,
  transactions: txs
})

export const fetchingTransactions = (isFetching) => ({
  type: FETCHING_TRANSACITONS,
  isFetching
})

//////////////////////////////////////////////////////////////

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export const login = () => ({ type: LOGGED_IN })
export const logout = () => ({ type: LOGGED_OUT })
