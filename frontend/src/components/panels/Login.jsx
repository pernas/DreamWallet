import React, { Component } from 'react'
import { TextField, AutoComplete }from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { createWalletApi } from 'dream-wallet/lib/network'
import { keys } from 'ramda'

const styles = {
  input: {
    width: 360
  }
}

// corrupted wallet example
// guid: 1c562564-6417-41eb-a1f7-19bb754fcbe3
// sk: d9008326-f4b3-4183-8d23-65869c07fda6
// pwd: m13rd4
// priv 2: Gydcze5Z3LxVDwwmtQmHJP1ijKfSCijbBE3mz8vRQtVM
// second password: adeu

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {guid: '', password: ''}
    this.api = createWalletApi()
  }

  handleUpdateInput (t) { this.setState({ guid: t }) }
  getSessions () { return keys(this.props.session) }

  render () {
    let { loginState, loginStart } = this.props
    let { guid, password } = this.state
    let login = () => loginStart({guid, password})

    return (
      <div>
        <h2>Login Component</h2>
        <ul>
          <li>Pending: {String(loginState.pending)}</li>
          <li>Success: {String(loginState.success)}</li>
          <li>Error: {String(loginState.error)}</li>
        </ul>
        <div>
          <AutoComplete
            name='guid'
            style={styles.input}
            filter={AutoComplete.noFilter}
            searchText={this.state.guid}
            onUpdateInput={this.handleUpdateInput.bind(this)}
            floatingLabelText="guid"
            openOnFocus={true}
            fullWidth={true}
            dataSource={this.getSessions.bind(this)()}
          />
        </div>
        <div>
          <TextField
            name='password'
            style={styles.input}
            value={password}
            onChange={link(this, 'password')}
            floatingLabelText="password"
            type='password'
          />
        </div>
        <RaisedButton onClick={login} primary label='go' />
      </div>
    )
  }
}

export default Login
