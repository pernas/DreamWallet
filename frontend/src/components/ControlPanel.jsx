import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import * as actions from '../actions'
import * as WalletActions from 'dream-wallet/lib/actions'
import Login from './panels/Login'
import TransactionsPanel from './panels/TransactionsPanel'
import Test from './panels/Test'

const styles = {
  panel: {
    flex: 2,
    height: '100%',
    padding: 16,
    marginLeft: 32,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    paddingBottom: 16,
    borderBottom: '1px solid #ddd'
  },
  controls: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 16
  },
  panelButton: {
    marginRight: 16
  }
}

const PanelButton = ({ active, forPanel: p, onClick }) => (
  <RaisedButton style={styles.panelButton} primary={active === p} label={p} onClick={() => onClick(p)} />
)

const PanelHeader = ({ active, panels, onChangePanel }) => (
  <div style={styles.header}>
    <div>
      {Object.keys(panels).map(p => (
        <PanelButton key={p} forPanel={p} active={active} onClick={onChangePanel} />
      ))}
    </div>
    <img src='/public/img/blockchain.png' height={32} />
  </div>
)

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { panel: 'login' }
  }
  render () {
    let { selected } = this.props
    let { panel } = this.state

    let { requestTxs, clearTxs } = WalletActions
    let enhancedActions = WalletActions.enhanceActionCreatorsForMulti(selected, WalletActions)
    let combinedActions = { ...enhancedActions, ...{ requestTxs, clearTxs }, ...actions }
    let connectPanel = connect((state) => state, combinedActions)

    const panels = ({
      'login': connectPanel(Login),
      'login2': connectPanel(Login),
      'txs': connectPanel(TransactionsPanel),
      'test': connectPanel(Test)
    })

    let SelectedPanel = panels[panel]
    return (
      <Paper style={styles.panel} zDepth={3}>
        <PanelHeader active={panel} panels={panels} onChangePanel={(panel) => this.setState({ panel })} />
        <div style={styles.controls}>{SelectedPanel ? <SelectedPanel panel={panel} selected={selected} /> : null}</div>
      </Paper>
    )
  }
}

export default ControlPanel
