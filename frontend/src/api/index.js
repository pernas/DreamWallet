import Promise from 'es6-promise'
import 'isomorphic-fetch'
import {API_BASE_URL, API_CODE} from '../config'
Promise.polyfill()

export const getTransactions = (walletContext, addressesOfInterest, offset, n) =>
  getHistory(walletContext, addressesOfInterest, 0, offset, n)
    // .then(response => response.txs)


// NETWORK
// ////////////////////////////////////////////////////////////////////////////
// encodeFormData :: Object -> url encoded params
const encodeFormData = function (data) {
  if (!data) return '';
  var encoded = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');
  return encoded;
};

const request = function (action, method, data) {
  data = data || {};
  if (API_CODE != null) data.api_code = API_CODE;

  var url = API_BASE_URL + method;
  var body = data ? encodeFormData(data) : '';

  var options = {
    method: action,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'omit'
  };

  if (action === 'GET') url += '?' + body;
  if (action === 'POST') options.body = body;

  var handleNetworkError = function () {
    return Promise.reject({ initial_error: 'Connectivity error, failed to send network request' });
  };

  var checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
      if (
        response.headers.get('content-type') &&
        response.headers.get('content-type').indexOf('application/json') > -1
      ) {
        return response.json();
      } else if (
        response.headers.get('content-type') &&
        response.headers.get('content-type').indexOf('image/jpeg') > -1
      ) {
        return response.blob();
      } else if (data.format === 'json') {
        return response.json();
      } else {
        return response.text();
      }
    } else {
      return response.text().then(Promise.reject.bind(Promise));
    }
  };

  return fetch(url, options)
    .catch(handleNetworkError)
    .then(checkStatus);
};

const getHistory = function (walletContext, addressesOfInterest, txFilter, offset, n) {
  offset = offset || 0;
  n = n || 0;

  var data = {
    active: walletContext.join('|'),
    onlyShow: addressesOfInterest.join('|'),
    format: 'json',
    offset: offset,
    no_compact: true,
    n: n,
    language: 'en',
    no_buttons: true
  };

  if (txFilter !== undefined && txFilter !== null) {
    data.filter = txFilter;
  }
  return request('POST', 'multiaddr', data);
};
