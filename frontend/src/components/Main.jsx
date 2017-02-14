import React from 'react'
import Header from './Header'
import Test from './Test'
import TransactionListContainer from '../containers/TransactionListContainer'

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div id="page-wrap">
        {/* <Header /> */}
        {/* <TransactionListContainer /> */}
        <Test/>
      </div>
    )
  }
}

export default Main
