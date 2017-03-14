import React from 'react'
import { map, addIndex } from 'ramda'
import RaisedButton from 'material-ui/RaisedButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import InfiniteScroll from 'react-infinite-scroller'

const mapI = addIndex(map)

const styles = {
  scroll: {
    height: '100%',
    overflow: 'scroll'
  }
}

const TransactionList = (props) => {
  const transactions = props.transactions.toJS()
  const info = props.info.toJS()
  const header =
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn>From</TableHeaderColumn>
        <TableHeaderColumn>To</TableHeaderColumn>
        <TableHeaderColumn>Fee</TableHeaderColumn>
        <TableHeaderColumn>Value</TableHeaderColumn>
      </TableRow>
    </TableHeader>

  const input = (i, id) => (
    <li key={id}> { `${i.prev_out.addr}` } </li>
  )

  const output = (o, id) => (
    <li key={id}> { `${o.addr}` } </li>
  )

  const txRow = (tx, id) => (
    <TableRow key={id}>
      {/* tx.totalInput */}
      <TableRowColumn> { new Date(tx.time * 1000).toGMTString() } </TableRowColumn>
      <TableRowColumn> <a href={'https://www.blockchain.info/tx/' + tx.hash}>{tx.hash}</a></TableRowColumn>
      <TableRowColumn> <ul> {mapI(input, tx.inputs)} </ul> </TableRowColumn>
      <TableRowColumn> <ul> {mapI(output, tx.out)} </ul> </TableRowColumn>
      <TableRowColumn> { tx.fee } </TableRowColumn>
      <TableRowColumn> <RaisedButton primary={tx.result >= 0} secondary={tx.result < 0} label={tx.result} /> </TableRowColumn>
    </TableRow>
  )

  let body = <TableBody displayRowCheckbox={false}> { mapI(txRow, transactions) } </TableBody>
  let tableView = <Table allRowsSelected={false}>{header}{body}</Table>
  let nTx = transactions.length
  let totalTx = info.n_tx

  let iconMenuButton = (
    <IconButton touch>
      <NavigationExpandMoreIcon />
    </IconButton>
  )

  let toolBar = (
    <Toolbar>
      <ToolbarGroup firstChild>
        <ToolbarTitle text='Transactions' style={{ marginLeft: 32 }} />
        <RaisedButton label={info.address} primary />
        <IconMenu iconButtonElement={iconMenuButton} >
          <MenuItem primaryText={'balance: ' + info.final_balance} />
          <MenuItem primaryText={'transactions: ' + transactions.length + ' / ' + info.n_tx} />
          <MenuItem primaryText={'sent: ' + info.total_sent} />
          <MenuItem primaryText={'received: ' + info.total_received} />
        </IconMenu>
      </ToolbarGroup>
      <ToolbarGroup>
        <RaisedButton label='reset' onClick={props.onReset} />
      </ToolbarGroup>
    </Toolbar>
  )

  return (
    <div className='view-container' style={styles.scroll}>
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMoreTransactions.bind(this, nTx)}
        hasMore={nTx < totalTx}
        loader={<div className='loader'>Loading ...</div>}
        useWindow={false}
      >
        {toolBar}
        {tableView}
      </InfiniteScroll>
    </div>
  )
}

// TransactionList.propTypes = {
//   transactions: React.PropTypes.array.isRequired,
//   info: React.PropTypes.object.isRequired,
//   loadMoreTransactions: React.PropTypes.func.isRequired
// }

export default TransactionList
