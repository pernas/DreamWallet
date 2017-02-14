'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var walletSyncMiddleware = exports.walletSyncMiddleware = function walletSyncMiddleware(options) {
  return function (store) {
    return function (next) {
      return function (action) {
        var prevWallet = store.getState()[options.path];
        var result = next(action);
        var nextWallet = store.getState()[options.path];

        // Easily know when to sync, because of ✨immutable✨ data
        if (prevWallet !== nextWallet) {
          console.log('Syncing with server...');
        }
        return result;
      };
    };
  };
};