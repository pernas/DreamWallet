import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

let link = (that, p) => (event) => that.setState({ [p]: event.target.value })

const styles = {
  input: {
    width: 360,
    marginRight: 32
  },
  row: {
    marginBottom: 16
  }
}

class Test extends Component {
  constructor (props) {
    super(props)
    this.state = { addr: '1FqrtG9cDK1VVTE5DrpAZtdDZ4QhtZcdPv' }
  }

  render () {
    let { addAddress, clearWallet } = this.props
    let { addr } = this.state

    return (
      <div>
        <h2>Test Component</h2>
        <div style={styles.row}>
          <TextField style={styles.input} value={addr} onChange={link(this, 'addr')} placeholder='address' />
          <RaisedButton secondary label='Add Address' onClick={() => addAddress(addr)} />
        </div>
        <div style={styles.row}>
          <RaisedButton primary label='Empty Wallet' onClick={clearWallet} />
        </div>
      </div>
    )
  }
}

export default Test
