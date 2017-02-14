import React, {Component} from 'react'
import TransactionList from '../components/TransactionList'
import * as api from '../api'
import * as actions from '../actions'
import { connect } from 'react-redux'
import {TX_PER_LOAD} from '../config'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { createSelector } from 'reselect'
import { createArraySelector } from 'reselect-map'
import { split, path, reduce, add, compose, map, addIndex, over, view, lens, prop, negate, assoc, identity } from 'ramda';
import withMouse from '../hocs/withMouse'


// import { withRouter } from 'react-router'
const walletContext = ['1KuptQBmqEJ4BWVpvPZHXjBPbiURYozhNv','12KyEpvLuzgEXr9rHNFhaKrLra1jmfx5CK','1HsURu3a1N8nMDbjMSHzawiJ9obNbW3pbu','13beLdmPQrvdTDvwNdYHYFMmY4Vq1DHH3Q','1PxQTJeF6PrLTto3QkzZgjEZe4jGHzR9E1','1JQhMst1KyRkji8Gp3AHsVEZAcfzccfbyZ','13GKq3b3jfwjaKgWXLBGs3ynJWSUBuuZ23','16FFsrfKxeKt7JWhtpB4VrGBjQ1kKv5o3p','1PZuicD1ACRfBuKEgp2XaJhVvnwpeETDyn','xpub6DHN1xpggNEUfaV926XgSfRSgRtDx9nE3gEpndGZPwaAjiJzDqQfGGf5vDNZzvQe2ycq5EiUdhcJGzQ3xKL2W6eGCzs8Z2prKqoqxtu1rZC','xpub6DHN1xpggNEV3vp7csZK9kpjW3H1UQijRFA2XUoJG77jnCogqhKPC9e7eM89Ess3ujLVQLmaAicM42AWdWob8ZenHkt6eNUvF7EK5h9hd3c','xpub6DHN1xpggNEV4jSERQX9dZnYQDedLz9S3dkBHHVZwt7VhVuzfQ9VQQ3vVbkXeWZGqoE1X7P2e13UZZ9jGybojgHuuERiUeytxvXFwmaE4Ta','xpub6DHN1xpggNEV8dyMqvRVwQxRGpdCf6D2TFtLMJ76sA3Vmzy1EKKZETwpPCX4cRfRxX2FhMCE7Dcu7LcC4LM8BEz52sL13uwdCMY1cEVF175']
// const walletContext = ['xpub6DHN1xpggNEUfaV926XgSfRSgRtDx9nE3gEpndGZPwaAjiJzDqQfGGf5vDNZzvQe2ycq5EiUdhcJGzQ3xKL2W6eGCzs8Z2prKqoqxtu1rZC','xpub6DHN1xpggNEV3vp7csZK9kpjW3H1UQijRFA2XUoJG77jnCogqhKPC9e7eM89Ess3ujLVQLmaAicM42AWdWob8ZenHkt6eNUvF7EK5h9hd3c','xpub6DHN1xpggNEV4jSERQX9dZnYQDedLz9S3dkBHHVZwt7VhVuzfQ9VQQ3vVbkXeWZGqoE1X7P2e13UZZ9jGybojgHuuERiUeytxvXFwmaE4Ta','xpub6DHN1xpggNEV8dyMqvRVwQxRGpdCf6D2TFtLMJ76sA3Vmzy1EKKZETwpPCX4cRfRxX2FhMCE7Dcu7LcC4LM8BEz52sL13uwdCMY1cEVF175']
// const walletContext = ['xpub6DHN1xpggNEUfaV926XgSfRSgRtDx9nE3gEpndGZPwaAjiJzDqQfGGf5vDNZzvQe2ycq5EiUdhcJGzQ3xKL2W6eGCzs8Z2prKqoqxtu1rZC']

class TransactionListContainer extends Component {
  constructor(props) {
    super(props);
    this.loadMoreTransactions = this.loadMoreTransactions.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: walletContext[0] };
  }

  componentWillMount() {
    api
      .getTransactions(walletContext, [this.state.value], 0, TX_PER_LOAD)
      .then((data) => this.props.dispatch(actions.receiveTransactions(data)))
      .catch((err) => { console.log(err)})
  }

  loadMoreTransactions(offset) {
    if(offset < this.props.info.n_tx) {
      api
        .getTransactions(walletContext, [this.state.value], offset, TX_PER_LOAD)
        .then((data) => this.props.dispatch(actions.addMoreTransactions(data)))
        .catch((err) => { console.log(err)})
    }
  }

  handleChange (event, index, value) {
    this.setState({value})
    api
      .getTransactions(walletContext, [value], 0, TX_PER_LOAD)
      .then((data) => this.props.dispatch(actions.receiveTransactions(data)))
      .catch((err) => { console.log(err)})
  };

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          { walletContext.map((e,i) => <MenuItem key={i} value={e} primaryText={e} /> ) }
        </DropDownMenu>

        <TransactionList
          {...this.props}
          transactions={this.props.transactions}
          info={this.props.info}
          loadMoreTransactions={this.loadMoreTransactions}
          mouse={this.props.mouse}
        />
      </div>
    )
  }
}

// TransactionListContainer.propTypes = {
//   walletContext: React.PropTypes.array.isRequired,
//   addressesOfInterest: React.PropTypes.array.isRequired
// }

// const getVisibilityFilter = (state) => state.visibilityFilter
// const getTodos = (state) => state.todos
const getData = (state) => state.transactions.data
const getInfo = (state) => state.transactions.info

var resultLens = lens(prop('result'), assoc('result'))
var inputLens = lens(prop('inputs'), assoc('inputs'))
var outputLens = lens(prop('out'), assoc('out'))
var prevOutLens = lens(prop('prev_out'), assoc('prev_out'))
var valueLens = lens(prop('value'), assoc('value'))


const negateResults = over(resultLens, negate)

// function isAccountChange (x) {
//   return (isAccount(x) && x.xpub.path.split('/')[1] === '1');
// }
const splitOrNot = (str) => str ? split('/', str) : '0'
const isChange = (coin) => {
  const x = (compose(splitOrNot, path(['xpub','path']))(coin)[1]) === '1';
  console.log(x)
  return x
}

const printa = (x) => {
  console.log('printing...')
  console.log(x)
  return x
}

const log = (x) => {console.log(x); return x;}
const addChange = (coin) => assoc('change', isChange(coin), coin)
const addTotalInput = (t) => assoc('totalInput', reduce(add, 0, map(compose(view(valueLens), view(prevOutLens)), view(inputLens, t))), t)
const addTotalOutput = (t) => assoc('totalOutput', reduce(add, 0, map(compose(view(valueLens)), view(outputLens, t))), t)
const addFee = (t) => assoc('fee', prop('totalInput', t) - prop('totalOutput', t), t)
const transformTx = compose(log, addFee, addTotalOutput, addTotalInput)
// const transformTx = compose(addTotalOutput, addTotalInput, negateResults)

const transactionsSelector = createSelector(
  [ getData ],
  (data) => data.map(transformTx)
)

const transactionsSelectorMap = createArraySelector(
  [ getData ],
  (tx) => transformTx(tx)
)

const infoSelector = createSelector(
  [ getInfo ],
  (info) => info
)

const mapStateToProps = (state) => {
  return {
    transactions: transactionsSelectorMap(state),
    info: infoSelector(state)
  }
}

// const mapStateToProps = state => ({
//   transactions: state.transactions
// })

const mapDispatchToProps = dispatch => ({
  dispatch
})


// export default withRouter(UserListContainer)
export default withMouse(connect( mapStateToProps
                      , mapDispatchToProps)(TransactionListContainer))
