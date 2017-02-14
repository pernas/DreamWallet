'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWallet = exports.request = exports.API_CODE = exports.BLOCKCHAIN_INFO = exports.API_BLOCKCHAIN_INFO = undefined;

require('isomorphic-fetch');

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

var _data3 = require('data.task');

var _data4 = _interopRequireDefault(_data3);

var _WalletCrypto = require('../WalletCrypto');

var WCrypto = _interopRequireWildcard(_WalletCrypto);

var _data5 = require('data.either');

var _ramda = require('ramda');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Async = require('control.async')(_data4.default);
var API_BLOCKCHAIN_INFO = exports.API_BLOCKCHAIN_INFO = 'https://api.blockchain.info/';
var BLOCKCHAIN_INFO = exports.BLOCKCHAIN_INFO = 'https://blockchain.info/';
var API_CODE = exports.API_CODE = '1770d5d9-bcea-4d28-ad21-6cbd5be018a8';
var SERVER_TIME_OFFSET = null;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var isNumber = function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
};

// checkStatus :: Response -> Task Error Response
var checkStatus = function checkStatus(r) {
  return r.ok ? _data4.default.of(r) : _data4.default.rejected({ initial_error: 'http network error, status ' + r.status });
};
// r.ok ? Task.of(r) : Task.rejected(r)

// extractData :: Response -> Task Error (JSON | BLOB | TEXT)
var extractData = function extractData(r) {
  var responseOfType = function responseOfType(t) {
    return r.headers.get('content-type') && r.headers.get('content-type').indexOf(t) > -1;
  };
  switch (true) {
    case responseOfType('application/json'):
      return Async.fromPromise(r.json());
    case responseOfType('image/jpeg'):
      return Async.fromPromise(r.blob());
    default:
      return Async.fromPromise(r.text());
  }
};

// encodeFormData :: Object -> String
var encodeFormData = function encodeFormData(data) {
  return Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');
};

////////////////////////////////////////////////////////////////////////////////
// API EXPORTS

/* Permitted extra headers:
   sessionToken -> "Authorization Bearer <token>" */
var request = exports.request = function request(action, method, data, extraHeaders) {
  data = data || {};
  if (API_CODE != null) data.api_code = API_CODE;

  var url = BLOCKCHAIN_INFO + method;
  var body = data ? encodeFormData(data) : '';
  var time = new Date().getTime();

  var options = {
    method: action,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'omit'
  };

  if (extraHeaders) {
    if (extraHeaders.sessionToken) {
      options.headers['Authorization'] = 'Bearer ' + extraHeaders.sessionToken;
    }
  }

  if (action === 'GET') url += '?' + body;
  if (action === 'POST') options.body = body;

  return Async.fromPromise(fetch(url, options)).chain(checkStatus).chain(extractData);
  //  .chain(handleNTPResponse(time))
};

// fetchWalletTask :: () -> Task Error JSON
var fetchWallet = exports.fetchWallet = function fetchWallet(guid, sharedKey) {
  var data = { guid: guid, sharedKey: sharedKey, method: 'wallet.aes.json', format: 'json' };
  return request('POST', 'wallet', data);
};