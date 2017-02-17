import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import ControlPanel from './ControlPanel'

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
  }
}

class Main extends Component {
  render () {
    return (
      <div style={styles.wrapper}>
        <Paper style={styles.json} zDepth={3}>
          <pre>{JSON.stringify(this.props.wallet.toJS(), null, 2)}</pre>
        </Paper>
        <ControlPanel />
      </div>
    )
  }
}

let connectMain = connect(
  (state) => ({ wallet: state.wallet })
)

export default connectMain(Main)
