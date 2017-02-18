import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import bitcoin from 'bitcoinjs-lib'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

const styles = {
  input: {
    width: 360,
    marginRight: 32
  },
  row: {
    marginBottom: 16
  },
  rowButton: {
    marginRight: 32
  }
}

const random = () => {
  const keyPair = bitcoin.ECPair.makeRandom()
  const addr = keyPair.getAddress()
  const priv = keyPair.d.toHex()
  const label = 'new address'
  const created_time = Date.now()
  const created_device_name = 'DREAM_WALLET'
  const created_device_version = '0.0.0'
  return {addr, priv, label, created_time, created_device_name, created_device_version}
}

class Test extends Component {
  constructor (props) {
    super(props)
    this.state = { addr: '1FqrtG9cDK1VVTE5DrpAZtdDZ4QhtZcdPv' }
  }

  render () {
    const { addAddress, clearWallet } = this.props
    const { addr } = this.state
    const key = {addr}
    return (
      <div>
        <h2>Test Component</h2>
        <div style={styles.row}>
          <TextField style={styles.input} value={addr} onChange={link(this, 'addr')} placeholder='address' />
          <RaisedButton secondary label='Add Address' onClick={() => addAddress(addr)} />
        </div>
        <div style={styles.row}>
          <RaisedButton style={styles.rowButton} primary label='Empty Wallet' onClick={clearWallet} />
          <RaisedButton style={styles.rowButton} primary label='New Address' onClick={() => addAddress(random())} />
        </div>
      </div>
    )
  }
}

export default Test
