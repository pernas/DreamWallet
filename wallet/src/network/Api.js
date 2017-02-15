const Async = require('control.async')(Task)
import 'isomorphic-fetch'
import Task from 'data.task'

export const API_BLOCKCHAIN_INFO = 'https://api.blockchain.info/'
export const BLOCKCHAIN_INFO = 'https://blockchain.info/'
export const API_CODE = '1770d5d9-bcea-4d28-ad21-6cbd5be018a8'

class Api {
  constructor (options = {}) {
    let {
      rootUrl = BLOCKCHAIN_INFO,
      apiUrl = API_BLOCKCHAIN_INFO,
      apiCode = API_CODE
    } = options
    this.apiUrl = apiUrl
    this.rootUrl = rootUrl
    this.apiCode = apiCode
  }

  /* Permitted extra headers:
     sessionToken -> "Authorization Bearer <token>" */
  request (action, method, data, extraHeaders) {
    data = data || {}
    if (this.apiCode != null) data.api_code = this.apiCode

    var url = this.rootUrl + method
    var body = data ? Api.encodeFormData(data) : ''

    var options = {
      method: action,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'omit'
    }

    if (extraHeaders) {
      if (extraHeaders.sessionToken) {
        options.headers['Authorization'] = 'Bearer ' + extraHeaders.sessionToken
      }
    }

    if (action === 'GET') url += '?' + body
    if (action === 'POST') options.body = body

    return Async.fromPromise(fetch(url, options))
                             .chain(Api.checkStatus)
                             .chain(Api.extractData)
                            //  .chain(handleNTPResponse(time))
  }

  // fetchWalletTask :: () -> Task Error JSON
  fetchWallet (guid, sharedKey) {
    var data = { guid, sharedKey, method: 'wallet.aes.json', format: 'json' }
    return this.request('POST', 'wallet', data)
  }

  // checkStatus :: Response -> Task Error Response
  static checkStatus (r) {
    return r.ok
      ? Task.of(r)
      : Task.rejected({ initial_error: 'http network error, status ' + r.status })
    // r.ok ? Task.of(r) : Task.rejected(r)
  }

  // extractData :: Response -> Task Error (JSON | BLOB | TEXT)
  static extractData (r) {
    const responseOfType = (t) => r.headers.get('content-type') && r.headers.get('content-type').indexOf(t) > -1
    switch (true) {
      case responseOfType('application/json'):
        return Async.fromPromise(r.json())
      case responseOfType('image/jpeg'):
        return Async.fromPromise(r.blob())
      default:
        return Async.fromPromise(r.text())
    }
  }

  // encodeFormData :: Object -> String
  static encodeFormData (data) {
    return Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&')
  }
}

export default Api
