import React, { Component } from 'react'
import { WALLET_IMMUTABLE_PATH, BLOCKCHAIN_DATA_PATH } from '../../config'
import { getWallet, isDoubleEncrypted } from 'dream-wallet/lib/selectors'

const styles = {
  input: {
    width: 260,
    marginRight: 32
  },
  row: {
    marginBottom: 16
  },
  rowButton: {
    marginRight: 10
  }
}

const Info = props => {
  const balance = props[BLOCKCHAIN_DATA_PATH].get('walletInfo').get('final_balance')
  const nTx = props[BLOCKCHAIN_DATA_PATH].get('walletInfo').get('n_tx')
  const wallet = getWallet(props[WALLET_IMMUTABLE_PATH])

  return (
    <div>
      <h2>Wallet Info</h2>
      <ul>
        <li>Balance: {String(balance)} satoshis </li>
        <li>Transactions: {String(nTx)} </li>
        <li>Second password: {String(isDoubleEncrypted(wallet))} </li>
      </ul>
    </div>
  )
}

export default Info
