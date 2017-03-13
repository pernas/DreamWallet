import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import ControlPanel from './ControlPanel'
import { Immutable } from 'dream-wallet'
import { WALLET_IMMUTABLE_PATH } from '../config'
import { getWallet } from 'dream-wallet/lib/selectors'
import { assoc } from 'ramda'

const styles = {
  wrapper: {
    display: 'flex',
    flex: 1,
    padding: 32
  },
  json: {
    flex: 1,
    padding: 16,
    overflow: 'scroll'
  },
  mr8: {
    marginRight: 8
  }
}

class Main extends Component {
  render () {
    return (
      <div style={styles.wrapper}>
        <Paper style={styles.json} zDepth={3}>
          <pre>{JSON.stringify(getWallet(this.props[WALLET_IMMUTABLE_PATH]).toJS(), null, 2)}</pre>
        </Paper>
        <ControlPanel />
      </div>
    )
  }
}

let connectMain = connect(
  (state) => assoc(WALLET_IMMUTABLE_PATH, state[WALLET_IMMUTABLE_PATH], {})
)

export default connectMain(Main)
