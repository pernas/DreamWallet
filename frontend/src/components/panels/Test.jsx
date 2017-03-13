import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import bitcoin from 'bitcoinjs-lib'
import Base58 from 'bs58'
import { Immutable } from 'dream-wallet'
import SecondPasswordForm from './SecondPasswordForm'
import { WALLET_IMMUTABLE_PATH } from '../../config'
import { getWallet, isDoubleEncrypted } from 'dream-wallet/lib/selectors'

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
  const priv = Base58.encode(keyPair.d.toBuffer(32));
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
    this.state = {
      password: '',
      mainPassword: '',
      address: '',
      label: ''
    }
  }

  newAddress (addr, pwd) {
    const wallet = getWallet(this.props[WALLET_IMMUTABLE_PATH])
    Immutable.WalletUtils.isValidSecondPwd(pwd, wallet)
      ? this.props.addAddress(addr, pwd)
      : this.props.secondPasswordError(pwd)
  }

  activate (pwd) {
    Immutable.WalletUtils.encrypt(pwd, getWallet(this.props[WALLET_IMMUTABLE_PATH]))
      .map(this.props.secondPasswordOn)
      // this action maybe it is not accurate (this might happen
      // if an exception is launched inside encryption)
      .orElse(this.props.inconsistentWalletStateError)
  }
  deactivate (pwd) {
    const wallet = getWallet(this.props[WALLET_IMMUTABLE_PATH])
    Immutable.WalletUtils.isValidSecondPwd(pwd, wallet)
      ? Immutable.WalletUtils.decrypt(pwd, wallet)
        .map(this.props.secondPasswordOff)
        .orElse(this.props.inconsistentWalletStateError)
      : this.props.secondPasswordError(pwd)
  }

  onSubmit (values) {
    const wallet = getWallet(this.props[WALLET_IMMUTABLE_PATH])
    if(isDoubleEncrypted(wallet)) {
      this.deactivate(values.secondPassword)
    } else {
      this.activate(values.secondPassword)
    }
  }

  render () {
    const { clearWallet, addLabel, changeMainPassword } = this.props
    const { password, address, label, mainPassword } = this.state
    return (
      <div>
        <h2> Proper form component </h2>
        <SecondPasswordForm onSubmit={this.onSubmit.bind(this)}/>

        <h2>Test Actions</h2>
        <div style={styles.row}>
          {/* <RaisedButton style={styles.rowButton} secondary label='Empty Wallet' onClick={clearWallet} /> */}
          <RaisedButton style={styles.rowButton} primary label='New Address' onClick={() => this.newAddress(random(), password)} />
          <RaisedButton style={styles.rowButton} primary label='New Watch-Only' onClick={() => this.newAddress(randomWatchOnly(), password)} />
        </div>

        <div style={styles.row}>
          <TextField name='password' style={styles.input} value={password} onChange={link(this, 'password')} placeholder='second password' />
        </div>
        <div style={styles.row}>
          <TextField name='mainPassword' style={styles.input} value={mainPassword} onChange={link(this, 'mainPassword')} placeholder='wallet password' />
          <RaisedButton style={styles.rowButton} primary label='set new password' onClick={() => changeMainPassword(mainPassword)} />
        </div>
        <div style={styles.row}>
          <TextField name='address' style={styles.input} value={address} onChange={link(this, 'address')} placeholder='address' />
          <TextField name='label' style={styles.input} value={label} onChange={link(this, 'label')} placeholder='label' />
          <RaisedButton style={styles.rowButton} primary label='Label' onClick={() => addLabel(address, label)} />
        </div>

      </div>
    )
  }
}

export default Test
