import React, { Component } from 'react'
import TransactionList from '../TransactionList'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

class TransactionsPanel extends Component {
  constructor (props) {
    super(props)
    const addr = this.props.xpub ? this.props.xpub : ""
    this.state = { addr }
  }

  render () {
    let { requestTxs, clearTxs, info, txs } = this.props
    let { addr } = this.state
    let load = () => requestTxs(addr)
    let clear = () => clearTxs(addr)

    let TopView = () => (
      <div>
        <h2>Txs Component</h2>
        <TextField
          name='address'
          disabled
          value={addr}
          style={{ width: 360, marginRight: 32 }}
          onChange={link(this, 'addr')}
          placeholder='address'
        />
        <RaisedButton
          label='load feed'
          onClick={load}
          primary
        />
      </div>
    )

    let FeedView = () => (
      <TransactionList
        transactions={txs}
        info={info}
        loadMoreTransactions={load}
        onReset={clear}
      />
    )

    return info ? FeedView() : TopView()
  }
}

export default TransactionsPanel
