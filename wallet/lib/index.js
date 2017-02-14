'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walletActions = exports.walletSyncMiddleware = exports.walletReducer = undefined;

var _reducers = require('./reducers');

var _walletSyncMiddleware = require('./walletSyncMiddleware');

var _actions = require('./actions');

var walletActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log('hi'); /* eslint-disable semi */

exports.walletReducer = _reducers.walletReducer;
exports.walletSyncMiddleware = _walletSyncMiddleware.walletSyncMiddleware;
exports.walletActions = walletActions;