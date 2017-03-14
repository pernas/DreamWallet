import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import * as actions from '../actions'
import * as WalletActions from 'dream-wallet/lib/actions'
import Login from './panels/Login'
import TransactionsPanel from './panels/TransactionsPanel'
import Test from './panels/Test'
import Info from './panels/Info'
import SendForm from './panels/SendForm'
import { getXpubs, getAddrInfo, getTransactions, getWalletContext } from 'dream-wallet/lib/selectors'
import { head, compose, map, identity } from 'ramda'
import { WALLET_IMMUTABLE_PATH, BLOCKCHAIN_DATA_PATH } from '../config'
import { createSelector } from 'reselect'
import { createListSelector } from 'reselect-map'


const styles = {
  panel: {
    flex: 2,
    height: '100%',
    padding: 16,
    marginLeft: 32,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll'
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
    overflow: 'scroll',
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
    // this.state = { panel: 'login' }
  }
  render () {
    let { panel } = this.props
    let combinedActions = {...WalletActions, ...actions }
    let connectPanel = connect((state) => state, combinedActions)
    // form
    const onSubmit = (values) => {console.log(values)}
    let formProps = { onSubmit }
    // let connectForm = connect(() => formProps)
    let createWalletContext = state => ({ walletContext: getWalletContext(state[WALLET_IMMUTABLE_PATH]).toJS() })
    let connectForm = connect((state) => createWalletContext(state), formProps)

    const log = (x) => {console.log('this is a expensive computation'); return x;}
    const transformTx = compose(log)

    const transactionsSelector = (xpub) => createSelector(
      [ getTransactions(BLOCKCHAIN_DATA_PATH)(xpub) ],
      (data) => data.map(transformTx)
    )

    const transactionsSelectorMap = (xpub) => createListSelector(
      (getTransactions(BLOCKCHAIN_DATA_PATH)(xpub)),
      tx => transformTx(tx)
    )

    const mapStateToPropsTxs = (state) => {
      const xpub = head(getXpubs(state[WALLET_IMMUTABLE_PATH]).toJS())
      const txs = transactionsSelectorMap(xpub)(state)
      const info = getAddrInfo(BLOCKCHAIN_DATA_PATH)(xpub)(state)
      return ({
        xpub: xpub,
        txs: txs,
        info: info
      })
    }
    let connectTransactions = connect(mapStateToPropsTxs, combinedActions)

    const panels = ({
      'login': connectPanel(Login),
      'txs': connectTransactions(TransactionsPanel),
      'test': connectPanel(Test),
      'info': connectPanel(Info)
      // 'send': connectForm(SendForm)
    })

    let SelectedPanel = panels[panel]
    return (
      <Paper style={styles.panel} zDepth={3}>
        <PanelHeader active={panel} panels={panels} onChangePanel={(panel) => this.props.dispatch(actions.switchPanel(panel))} />
        <div style={styles.controls}>{SelectedPanel ? <SelectedPanel panel={panel} /> : null}</div>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  panel: state.panel
})

const mapDispatchToProps = dispatch => ({
  dispatch
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel)
