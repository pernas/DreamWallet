import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import {walletActions} from 'wallet'
import * as Actions from '../actions'

const Test = (props) => {
  const login = () => props.dispatch(Actions.login())
  const logout = () => props.dispatch(Actions.logout())
  const randomize = () => props.dispatch(walletActions.setDefaultAccountIndex(Math.floor(Math.random() * 6) + 1))
  return (
    <div>
      <h1> My Test Component </h1>
      <div> {'Login status: ' + props.status.isLoggedIn} </div>
      <div> Default Account:  { props.wallet } </div>
      <RaisedButton primary={true} label='LOGIN' onClick={login}/>
      <RaisedButton secondary={true} label='LOGOUT' onClick={logout}/>
      <RaisedButton primary={true} label='Randomize Default' onClick={randomize}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    wallet: state.wallet
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})


export default connect( mapStateToProps, mapDispatchToProps)(Test)
