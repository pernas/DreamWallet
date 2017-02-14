'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AES = exports.Iso10126 = exports.BLOCK_BIT_LEN = exports.KEY_BIT_LEN = exports.SALT_BYTES = exports.SUPPORTED_ENCRYPTION_VERSION = undefined;

var _crypto = require('crypto');

var crypto = _interopRequireWildcard(_crypto);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

////////////////////////////////////////////////////////////////////////////////
// constants
var SUPPORTED_ENCRYPTION_VERSION = exports.SUPPORTED_ENCRYPTION_VERSION = 3;
// import * as sjcl from 'sjcl'
var SALT_BYTES = exports.SALT_BYTES = 16;
var KEY_BIT_LEN = exports.KEY_BIT_LEN = 256;
var BLOCK_BIT_LEN = exports.BLOCK_BIT_LEN = 128;

////////////////////////////////////////////////////////////////////////////////
var Iso10126 = exports.Iso10126 = {
  /*
  *   Fills remaining block space with random byte values, except for the
  *   final byte, which denotes the byte length of the padding
  */
  pad: function pad(dataBytes, nBytesPerBlock) {
    var nPaddingBytes = nBytesPerBlock - dataBytes.length % nBytesPerBlock;
    var paddingBytes = crypto.randomBytes(nPaddingBytes - 1);
    var endByte = new Buffer([nPaddingBytes]);
    return Buffer.concat([dataBytes, paddingBytes, endByte]);
  },
  unpad: function unpad(dataBytes) {
    var nPaddingBytes = dataBytes[dataBytes.length - 1];
    return dataBytes.slice(0, -nPaddingBytes);
  }
};

////////////////////////////////////////////////////////////////////////////////
var AES = exports.AES = {
  CBC: 'aes-256-cbc',
  OFB: 'aes-256-ofb',
  ECB: 'aes-256-ecb',

  /*
  *   Encrypt / Decrypt with aes-256
  *   - dataBytes, key, and salt are expected to be buffers
  *   - default options are mode=CBC and padding=auto (PKCS7)
  */

  encrypt: function encrypt(dataBytes, key, salt, options) {
    options = options || {};
    (0, _assert2.default)(Buffer.isBuffer(dataBytes), 'expected `dataBytes` to be a Buffer');
    (0, _assert2.default)(Buffer.isBuffer(key), 'expected `key` to be a Buffer');
    (0, _assert2.default)(Buffer.isBuffer(salt) || salt === null, 'expected `salt` to be a Buffer or null');

    var cipher = crypto.createCipheriv(options.mode || AES.CBC, key, salt || '');
    cipher.setAutoPadding(!options.padding);

    if (options.padding) dataBytes = options.padding.pad(dataBytes, BLOCK_BIT_LEN / 8);
    var encryptedBytes = Buffer.concat([cipher.update(dataBytes), cipher.final()]);

    return encryptedBytes;
  },

  decrypt: function decrypt(dataBytes, key, salt, options) {
    options = options || {};
    (0, _assert2.default)(Buffer.isBuffer(dataBytes), 'expected `dataBytes` to be a Buffer');
    (0, _assert2.default)(Buffer.isBuffer(key), 'expected `key` to be a Buffer');
    (0, _assert2.default)(Buffer.isBuffer(salt) || salt === null, 'expected `salt` to be a Buffer or null');

    var decipher = crypto.createDecipheriv(options.mode || AES.CBC, key, salt || '');
    decipher.setAutoPadding(!options.padding);

    var decryptedBytes = Buffer.concat([decipher.update(dataBytes), decipher.final()]);
    if (options.padding) decryptedBytes = options.padding.unpad(decryptedBytes);

    return decryptedBytes;
  }
};