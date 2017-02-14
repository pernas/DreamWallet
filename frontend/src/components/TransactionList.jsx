import React from 'react';
import { map, addIndex } from 'ramda';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import InfiniteScroll from 'react-infinite-scroller';

const mapI = addIndex(map)

const TransactionList = (props) => {

  const header =
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Date: { JSON.stringify(props.mouse, null, 2) } </TableHeaderColumn>
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
      {/*  { tx.totalInput } */}
      <TableRowColumn> { new Date(tx.time * 1000).toGMTString() } </TableRowColumn>
      <TableRowColumn> <a href={'https://www.blockchain.info/tx/' + tx.hash}>{tx.hash}</a></TableRowColumn>
      <TableRowColumn> <ul> {mapI(input, tx.inputs)} </ul> </TableRowColumn>
      <TableRowColumn> <ul> {mapI(output, tx.out)} </ul> </TableRowColumn>
      <TableRowColumn> { tx.fee } </TableRowColumn>
      <TableRowColumn> <RaisedButton primary={tx.result >= 0} secondary={tx.result < 0} label={tx.result} /> </TableRowColumn>
    </TableRow>
  )

  const body = <TableBody displayRowCheckbox={false}> { mapI(txRow, props.transactions) } </TableBody>
  const tableView = <Table allRowsSelected={false}> {header} {body} </Table>
  // ///////////////////////////////////////////////////////////////////////////
  const toolBar =
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text="Transactions" />
        <FontIcon className="muidocs-icon-custom-sort" />
        <ToolbarSeparator />
        <RaisedButton label={props.info.address} primary={true} />
        <IconMenu
          iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          }
        >
          <MenuItem primaryText={"balance: " + props.info.final_balance} />
          <MenuItem primaryText={"transactions: " + props.transactions.length + ' / ' + props.info.n_tx} />
          <MenuItem primaryText={"sent: " + props.info.total_sent} />
          <MenuItem primaryText={"received: " + props.info.total_received} />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>

  // ///////////////////////////////////////////////////////////////////////////
    const nTX = props.transactions.length
    const totalTX = props.info.n_tx
    return (
    <div className="view-container">
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMoreTransactions.bind(this, nTX)}
        hasMore={nTX < totalTX}
        loader={<div className="loader">Loading ...</div>}
      >
      {toolBar}
      {tableView}
    </InfiniteScroll>
    </div>
  )
}

TransactionList.propTypes = {
  transactions: React.PropTypes.array.isRequired,
  info: React.PropTypes.object.isRequired,
  loadMoreTransactions: React.PropTypes.func.isRequired
}


export default TransactionList
