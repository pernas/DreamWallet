/* eslint-disable semi */
import Either from 'data.either'
import Task from 'data.task'
import { lensProp, view, over, compose, map, identity } from 'ramda'
import * as WCrypto from '../WalletCrypto'
import Promise from 'es6-promise'
import { Wallet } from '../immutable'
Promise.polyfill()
import { futurizeP } from 'futurize'
import createApi from './Api'

const createWalletApi = ({rootUrl, apiUrl, apiCode} = {}, returnType) => {

  const ApiPromise = createApi({rootUrl, apiUrl, apiCode});
  // helpers
  const eitherToTask = e => e.fold(Task.rejected, Task.of)
  const taskToPromise = t => new Promise((res, rej) => t.fork(rej, res))
  const promiseToTask = futurizeP(Task)
  const future = returnType ? futurizeP(returnType) : identity
  // lenses
  const payload = lensProp('payload')

  const getWalletTask = (guid, sharedKey, password) =>
      promiseToTask(ApiPromise.fetchWalletWithSharedKey)(guid, sharedKey)
      .map(over(payload, JSON.parse))
      .map(view(payload))
      .map(WCrypto.decryptWallet(password))
      .chain(eitherToTask)
      .map(Wallet)

  const getWallet = compose(taskToPromise, getWalletTask)

  // export const get = compose(taskToPromise, getTask)
  const Api = map(future, ApiPromise)

  return {
    ...Api,
    getWallet: future(getWallet)
  }
}
export default createWalletApi
