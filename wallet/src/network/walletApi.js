/* eslint-disable semi */
import Either from 'data.either'
import Task from 'data.task'
import { lensProp, view, over, compose } from 'ramda'
import * as WCrypto from '../WalletCrypto'
import Promise from 'es6-promise'
import { Wallet } from '../immutable'
Promise.polyfill()
import createApi from './Api'
const ApiTask = createApi(undefined, Task);

// helpers
const eitherToTask = e => e.fold(Task.rejected, Task.of)
const taskToPromise = t => new Promise((res, rej) => t.fork(rej, res))

// lenses
const payload = lensProp('payload')

export const getTask = (guid, sharedKey, password) =>
    ApiTask.fetchWalletWithSharedKey(guid, sharedKey)
    .map(over(payload, JSON.parse))
    .map(view(payload))
    .map(WCrypto.decryptWallet(password))
    .chain(eitherToTask)
    .map(Wallet)

export const get = compose(taskToPromise, getTask)
