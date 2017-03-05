import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { createWalletApi } from 'dream-wallet/lib/network'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

const walletInfo = [
  {
    guid: 'f9df366a-3fc3-4826-827f-fb3c1e8ce616',
    sharedKey: '00efae13-985b-4858-81ad-71bd8b5ac863',
    password: '100 cent'
  },
  {
    guid: '024753b6-360e-4783-9382-46420ca22b90',
    sharedKey: '94205e6f-b383-4d77-90c8-b3b4ad37001f',
    password: 'password123'
  }
]

const styles = {
  input: {
    width: 360
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    let { panel } = props
    this.state = panel === 'login2' ? walletInfo[1] : walletInfo[0]
    this.api = createWalletApi()
  }

  render () {
    let { loginState, loginStart } = this.props
    let { guid, sharedKey, password } = this.state

    let login = () => {
      loginStart({guid, sharedKey, password})
    }

    return (
      <div>
        <h2>Login Component</h2>
        <ul>
          <li>Pending: {String(loginState.pending)}</li>
          <li>Success: {String(loginState.success)}</li>
          <li>Error: {String(loginState.error)}</li>
        </ul>
        <div>
          <TextField
            name='guid'
            style={styles.input}
            value={guid}
            onChange={link(this, 'guid')}
            placeholder='guid'
          />
        </div>
        <div>
          <TextField
            name='sharedKey'
            style={styles.input}
            value={sharedKey}
            onChange={link(this, 'sharedKey')}
            placeholder='shared key'
          />
        </div>
        <div>
          <TextField
            name='password'
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
