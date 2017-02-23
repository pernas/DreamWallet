/* eslint-disable semi */
import Task from 'data.task'
import { lensProp, over, compose, map, identity } from 'ramda'
import * as WCrypto from '../WalletCrypto'
import Promise from 'es6-promise'
import { Wallet } from '../immutable'
Promise.polyfill()
import { futurizeP } from 'futurize'
import createApi from './Api'
import { Map } from 'immutable-ext'

const createWalletApi = ({rootUrl, apiUrl, apiCode} = {}, returnType) => {
  const ApiPromise = createApi({rootUrl, apiUrl, apiCode});
  // helpers
  const eitherToTask = e => e.fold(Task.rejected, Task.of)
  const taskToPromise = t => new Promise((resolve, reject) => t.fork(reject, resolve))
  const promiseToTask = futurizeP(Task)
  const future = returnType ? futurizeP(returnType) : identity

  const getWalletTask = (guid, sharedKey, password) =>
    promiseToTask(ApiPromise.fetchWalletWithSharedKey)(guid, sharedKey)
      .map(over(lensProp('payload'), JSON.parse))
      .map(WCrypto.decryptPayload(password))
      .chain(eitherToTask)
      .map(over(lensProp('wallet'), Wallet))
      .map(Map)

  const getWallet = compose(taskToPromise, getWalletTask)

  const saveWalletTask = (state) =>
    promiseToTask(ApiPromise.saveWallet)(WCrypto.encryptState(state))

  const saveWallet = compose(taskToPromise, saveWalletTask)

  // ////////////////////////////////////////////////////////////////
  // export const get = compose(taskToPromise, getTask)
  const Api = map(future, ApiPromise)

  return {
    ...Api,
    getWallet: future(getWallet),
    saveWallet: future(saveWallet)
  }
}
export default createWalletApi
