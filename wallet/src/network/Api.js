import 'isomorphic-fetch'
import Promise from 'es6-promise'
Promise.polyfill()

export const BLOCKCHAIN_INFO = 'https://blockchain.info/'
export const API_BLOCKCHAIN_INFO = 'https://api.blockchain.info/'
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
    // options
    let options = {
      method: action,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      credentials: 'omit'
    }
    if (extraHeaders) {
      if (extraHeaders.sessionToken) {
        options.headers['Authorization'] = 'Bearer ' + extraHeaders.sessionToken
      }
    }
    // body
    const apicode = { api_code: this.apiCode }
    const body = Api.encodeFormData(this.apiCode ? {...data, ...apicode} : {...data})

    switch (action) {
      case 'GET':
        const urlGET = this.rootUrl + method + '?' + body
        return fetch(urlGET, options).then(Api.checkStatus).then(Api.extractData)
      case 'POST':
        const urlPOST = this.rootUrl + method
        options.body = body
        return fetch(urlPOST, options).then(Api.checkStatus).then(Api.extractData)
      default:
        return Promise.reject({error: 'HTTP_ACTION_NOT_SUPPORTED'})
    }
  }

  // fetchWalletWithSharedKey :: () -> Promise JSON
  fetchWalletWithSharedKey (guid, sharedKey) {
    var data = { guid, sharedKey, method: 'wallet.aes.json', format: 'json' }
    return this.request('POST', 'wallet', data)
  }

  // checkStatus :: Response -> Promise Response
  static checkStatus (r) {
    return r.ok ? Promise.resolve(r)
                : Promise.reject({ status: r.status, statusText: r.statusText})
  }

  // extractData :: Response -> Promise (JSON | BLOB | TEXT)
  static extractData (r) {

    const responseOfType = (t) =>
      r.headers.get('content-type') &&
      r.headers.get('content-type').indexOf(t) > -1

    switch (true) {
      case responseOfType('application/json'):
        return r.json()
      case responseOfType('image/jpeg'):
        return r.blob()
      default:
        return r.text()
    }
  }

  // encodeFormData :: Object -> String
  static encodeFormData (data) {
    return data
      ? Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&')
      : ''
  }
}

export default Api
