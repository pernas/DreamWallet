import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import bitcoin from 'bitcoinjs-lib'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

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

const randomWatchOnly = () => {
  const keyPair = bitcoin.ECPair.makeRandom()
  const addr = keyPair.getAddress()
  const label = 'new watch only'
  const created_time = Date.now()
  const created_device_name = 'DREAM_WALLET'
  const created_device_version = '0.0.0'
  return {addr, label, created_time, created_device_name, created_device_version}
}

class Test extends Component {
  constructor (props) {
    super(props)
    this.state = { password: 'my second password' }
  }

  render () {
    const { addAddress, clearWallet, secondPasswordOn, secondPasswordOff } = this.props
    const { password } = this.state
    return (
      <div>
        <h2>Test Component</h2>
        <div style={styles.row}>
          <TextField style={styles.input} value={password} onChange={link(this, 'password')} placeholder='password' />
          <RaisedButton style={styles.rowButton} primary label='password on' onClick={() => secondPasswordOn(password)} />
          <RaisedButton style={styles.rowButton} secondary label='password off' onClick={() => secondPasswordOff(password)} />
        </div>
        <div style={styles.row}>
          <RaisedButton style={styles.rowButton} secondary label='Empty Wallet' onClick={clearWallet} />
          <RaisedButton style={styles.rowButton} primary label='New Address' onClick={() => addAddress(random())} />
          <RaisedButton style={styles.rowButton} primary label='New Watch-Only' onClick={() => addAddress(randomWatchOnly())} />
        </div>
      </div>
    )
  }
}

export default Test
