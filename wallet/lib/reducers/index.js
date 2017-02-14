'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walletReducer = undefined;

var _redux = require('redux');

var _actions = require('../actions');

var _wallet = require('../wallet');

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = new _wallet2.default();

// export default function reducer (state = INITIAL_STATE, {type, payload, error}) {
//   switch(type) {
//     case SET_MESSAGE:
//         return { message: payload }
//     case CONCAT_MESSAGE:
//         return { message: state.message + ',' + payload }
//     case WIPE_MESSAGE:
//         return { message: '' }
//     default:
//         return state;
//   }
// }

var walletReducer = exports.walletReducer = function walletReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];
  var type = action.type;

  switch (type) {
    case _actions.DEFAULT_ACCOUNT_SET:
      {
        return state.setDefaultAccountIndex(action.index);
      }
    default:
      return state;
  }
};