import React, { Component } from 'react'
import TransactionList from '../TransactionList'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

class TransactionsPanel extends Component {
  constructor (props) {
    super(props)
    let addr = '1Lu1ejJQrEHiuzNi5Ud789m6x4XgkAk5Qh'
    this.state = { txs: [], addr }
  }

  loadInitial () {
    this.fetchAddr().then(data => {
      let { txs, addresses } = data
      this.setState({ txs, info: addresses[0] })
    })
  }

  loadMore (n = 50) {
    let { txs: oldTxs } = this.state
    this.fetchAddr(`&n=${n}&offset=${oldTxs.length}`).then(data => {
      let { txs: newTxs } = data
      let txs = oldTxs.concat(newTxs)
      this.setState({ txs })
    })
  }

  fetchAddr (q = '') {
    let { addr } = this.state
    let url = `https://blockchain.info/multiaddr?active=${addr}&cors=true${q}`
    return fetch(url).then(res => res.json())
  }

  render () {
    let { txs, info, addr } = this.state

    let reset = () => {
      this.setState({ info: null })
    }

    let TopView = () => (
      <div>
        <h2>Txs Component</h2>
        <TextField
          value={addr}
          style={{ width: 360, marginRight: 32 }}
          onChange={link(this, 'addr')}
          placeholder='address'
        />
        <RaisedButton
          label='load feed'
          onClick={this.loadInitial.bind(this)}
          primary
        />
      </div>
    )

    let FeedView = () => (
      <TransactionList
        transactions={txs}
        info={info}
        loadMoreTransactions={this.loadMore.bind(this)}
        onReset={reset}
      />
    )

    return info ? FeedView() : TopView()
  }
}

export default TransactionsPanel
