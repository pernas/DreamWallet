import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { walletActions } from 'dream-wallet'
import * as Actions from '../actions'

const Test = (props) => {
  const login = () => props.dispatch(Actions.login())
  const logout = () => props.dispatch(Actions.logout())
  // const randomize = () => props.dispatch(walletActions.setDefaultAccountIndex(Math.floor(Math.random() * 6) + 1))
  const addAddress = () => props.dispatch(walletActions.addAddress('1FqrtG9cDK1VVTE5DrpAZtdDZ4QhtZcdPv'))

  return (
    <div>
      <h1> My Test Component </h1>
      <div> {'Login status: ' + props.status.isLoggedIn} </div>
      {/* <div> Default Account:  { props.wallet } </div> */}
      <RaisedButton primary label='LOGIN' onClick={login} />
      <RaisedButton secondary label='LOGOUT' onClick={logout} />
      {/* <RaisedButton primary label='Randomize Default' onClick={randomize}/> */}
      <RaisedButton secondary label='Add Address' onClick={addAddress} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  status: state.status,
  wallet: state.wallet
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Test)
