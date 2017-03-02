import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ControlPanel from './ControlPanel'
import { Immutable } from 'dream-wallet'
import { newMultiWallet } from 'dream-wallet/lib/actions'
import { setSelection } from '../actions'
const toJS = Immutable.WalletUtils.toJS

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
  walletPicker: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottom: '1px solid #ddd'
  },
  divider: {
    height: 32,
    width: 1,
    background: '#ddd',
    marginRight: 8
  },
  mr8: {
    marginRight: 8
  }
}

const WalletPicker = ({ wallets, selected, onSelect, onNewWallet }) => (
  <div style={styles.walletPicker}>
    <RaisedButton
      primary
      disabled={wallets.length >= 3}
      style={styles.mr8}
      onClick={onNewWallet}
      label='New'
    />
    <div style={styles.divider} />
    {wallets.map((w, i) => (
      <RaisedButton key={i} style={styles.mr8} onClick={() => onSelect(i)}>
        <span style={selected === i ? { color: '#00bcd4' } : {}}>
          {w.get('wallet').guid ? w.get('wallet').guid.split('-')[0] : <i>Empty</i>}
        </span>
      </RaisedButton>
    ))}
  </div>
)

class Main extends Component {
  render () {
    let { wallets, newMultiWallet, selected, setSelection } = this.props

    return (
      <div style={styles.wrapper}>
        <Paper style={styles.json} zDepth={3}>
          <WalletPicker wallets={wallets} selected={selected} onSelect={setSelection} onNewWallet={newMultiWallet} />
          <pre>{JSON.stringify(toJS(wallets[selected].get('wallet')), null, 2)}</pre>
        </Paper>
        <ControlPanel selected={selected} />
      </div>
    )
  }
}

let connectMain = connect(
  (state) => ({ wallets: state.wallets, selected: state.selection }),
  { newMultiWallet, setSelection }
)

export default connectMain(Main)
