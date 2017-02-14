'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_ACCOUNT_SET = exports.DEFAULT_ACCOUNT_SET = '@v3.DEFAULT_ACCOUNT_SET';

var setDefaultAccountIndex = exports.setDefaultAccountIndex = function setDefaultAccountIndex(index) {
  return { type: DEFAULT_ACCOUNT_SET, index: index };
};