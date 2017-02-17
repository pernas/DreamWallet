import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import * as actions from '../actions'
import * as WalletActions from 'dream-wallet/lib/actions'
import Login from './panels/Login'
import Test from './panels/Test'

const styles = {
  panel: {
    flex: 2,
    padding: 16,
    marginLeft: 32
  },
  header: {
    paddingBottom: 16,
    borderBottom: '1px solid #ddd'
  },
  controls: {
    marginTop: 16
  },
  panelButton: {
    marginRight: 16
  }
}

let combinedActions = Object.assign({}, WalletActions, actions)
let connectPanel = connect((state) => state, combinedActions)

const panels = ({
  'login': connectPanel(Login),
  'test': connectPanel(Test)
})

const PanelButton = ({ active, forPanel: p, onClick }) => (
  <RaisedButton style={styles.panelButton} primary={active === p} label={p} onClick={() => onClick(p)} />
)

const PanelHeader = ({ active, onChangePanel }) => (
  <div style={styles.header}>
    <PanelButton forPanel='login' active={active} onClick={onChangePanel} />
    <PanelButton forPanel='test' active={active} onClick={onChangePanel} />
  </div>
)

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { panel: 'login' }
  }
  render () {
    let { panel } = this.state
    let SelectedPanel = panels[panel]
    return (
      <Paper style={styles.panel} zDepth={3}>
        <PanelHeader active={panel} onChangePanel={(panel) => this.setState({ panel })} />
        <div style={styles.controls}>{SelectedPanel ? <SelectedPanel /> : null}</div>
      </Paper>
    )
  }
}

export default ControlPanel
