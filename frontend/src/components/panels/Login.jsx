import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { compose } from 'ramda'

import { Wallet } from 'dream-wallet/lib/immutable'
import { createApi } from 'dream-wallet/lib/network'
import { decryptWallet } from 'dream-wallet/lib/WalletCrypto'

let link = (ref, p) => (event) => ref.setState({ [p]: event.target.value })

const styles = {
  input: {
    width: 360
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.api = createApi()
    this.state = {
      guid: 'f9df366a-3fc3-4826-827f-fb3c1e8ce616',
      sharedKey: '00efae13-985b-4858-81ad-71bd8b5ac863',
      password: '100 cent'
    }
  }

  render () {
    let { loadWallet } = this.props
    let { guid, sharedKey, password } = this.state

    let print = (s) => (r) => console.log(s, r) || r

    let login = () => {
      this.api.fetchWalletWithSharedKey(guid, sharedKey)
        .then(response => JSON.parse(response.payload))
        .then(print('payload:'))
        .then(decryptWallet(password))
        .then((either) => {
          either
            .chain(compose(loadWallet, Wallet))
            .chain(console.log)
            .orElse(console.error)
        })
    }

    return (
      <div>
        <label>Login Form</label>
        <div>
          <TextField
            style={styles.input}
            value={guid}
            onChange={link(this, 'guid')}
            placeholder='guid'
          />
        </div>
        <div>
          <TextField
            style={styles.input}
            value={sharedKey}
            onChange={link(this, 'sharedKey')}
            placeholder='shared key'
          />
        </div>
        <div>
          <TextField
            style={styles.input}
            value={password}
            onChange={link(this, 'password')}
            placeholder='password'
            type='password'
          />
        </div>
        <RaisedButton onClick={login} primary label='go' />
      </div>
    )
  }
}

export default Login
