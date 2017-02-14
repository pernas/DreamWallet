'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptSecPass = exports.encryptSecPass = exports.encryptWallet = exports.decryptWallet = exports.sha256 = exports.parseJSON = undefined;

var _crypto = require('crypto');

var crypto = _interopRequireWildcard(_crypto);

var _sjcl = require('sjcl');

var sjcl = _interopRequireWildcard(_sjcl);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _utils = require('./utils');

var U = _interopRequireWildcard(_utils);

var _ramda = require('ramda');

var _data = require('data.either');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// this is shit: wrong parse should not mean wrong password
var parseJSON = exports.parseJSON = function parseJSON(json) {
  try {
    return (0, _data.Right)(JSON.parse(json));
  } catch (e) {
    return (0, _data.Left)("Wrong password");
  }
};

var sha256 = exports.sha256 = function sha256(data) {
  return crypto.createHash('sha256').update(data).digest();
};

// decryptWallet :: Password -> payload JSON -> Either Error ImmutableWallet
var decryptWallet = exports.decryptWallet = (0, _ramda.curry)(function (password, data) {
  return decryptWrapper(password, data).chain(parseJSON);
}
// .map(fromJS)
);

// decruptWrapper :: Password -> JSON -> Either Error String
var decryptWrapper = (0, _ramda.curry)(function (password, wrapper) {
  try {
    return (0, _data.Right)(decryptDataWithPassword(wrapper.payload, password, wrapper.pbkdf2_iterations));
  } catch (e) {
    return (0, _data.Left)(e);
  }
});

var encryptWallet = exports.encryptWallet = (0, _ramda.curry)(function (data, password, pbkdf2Iterations, version) {
  (0, _assert2.default)(data, 'data missing');
  (0, _assert2.default)(password, 'password missing');
  (0, _assert2.default)(pbkdf2Iterations, 'pbkdf2Iterations missing');
  (0, _assert2.default)(version, 'version missing');

  return JSON.stringify({
    pbkdf2_iterations: pbkdf2Iterations,
    version: version,
    payload: encryptDataWithPassword(data, password, pbkdf2Iterations)
  });
});

// stretchPassword :: password -> salt -> iterations -> keylen -> Buffer
function stretchPassword(password, salt, iterations, keylen) {

  (0, _assert2.default)(salt, 'salt missing');
  (0, _assert2.default)(password, 'password missing');
  (0, _assert2.default)(iterations, 'iterations missing');
  (0, _assert2.default)(typeof sjcl.hash.sha1 === 'function', 'missing sha1, make sure sjcl is configured correctly');
  var hmacSHA1 = function hmacSHA1(key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha1); // eslint-disable-line new-cap
    this.encrypt = hasher.encrypt.bind(hasher);
  };
  salt = sjcl.codec.hex.toBits(salt.toString('hex'));
  var stretched = sjcl.misc.pbkdf2(password, salt, iterations, keylen || 256, hmacSHA1);
  return new Buffer(sjcl.codec.hex.fromBits(stretched), 'hex');
}

// decryptDataWithPassword :: data -> password -> iterations -> options -> Buffer
function decryptDataWithPassword(data, password, iterations, options) {
  (0, _assert2.default)(data, 'data missing');
  (0, _assert2.default)(password, 'password missing');
  (0, _assert2.default)(iterations, 'iterations missing');

  var dataHex = new Buffer(data, 'base64');
  var iv = dataHex.slice(0, U.SALT_BYTES);
  var payload = dataHex.slice(U.SALT_BYTES);
  //  AES initialization vector is also used as the salt in password stretching
  var salt = iv;
  // Expose stretchPassword for iOS to override
  var key = stretchPassword(password, salt, iterations, U.KEY_BIT_LEN);
  var res = decryptBufferWithKey(payload, iv, key, options);
  return res;
}

// payload: (Buffer)
// iv: initialization vector (Buffer)
// key: AES key (256 bit Buffer)
// options: (optional)
// returns: decrypted payload (e.g. a JSON string)
function decryptBufferWithKey(payload, iv, key, options) {
  options = options || {};
  options.padding = options.padding || U.Iso10126;

  var decryptedBytes = U.AES.decrypt(payload, key, iv, options);
  return decryptedBytes.toString('utf8');
}

function encryptDataWithPassword(data, password, iterations) {
  (0, _assert2.default)(data, 'data missing');
  (0, _assert2.default)(password, 'password missing');
  (0, _assert2.default)(iterations, 'iterations missing');

  var salt = crypto.randomBytes(U.SALT_BYTES);
  // Expose stretchPassword for iOS to override
  var key = stretchPassword(password, salt, iterations, U.KEY_BIT_LEN);

  return encryptDataWithKey(data, key, salt);
}

// data: e.g. JSON.stringify({...})
// key: AES key (256 bit Buffer)
// iv: optional initialization vector
// returns: concatenated and Base64 encoded iv + payload
function encryptDataWithKey(data, key, iv) {
  iv = iv || crypto.randomBytes(U.SALT_BYTES);
  var dataBytes = new Buffer(data, 'utf8');
  var options = { mode: U.AES.CBC, padding: U.Iso10126 };
  var encryptedBytes = U.AES.encrypt(dataBytes, key, iv, options);
  var payload = Buffer.concat([iv, encryptedBytes]);
  return payload.toString('base64');
}

var encryptSecPass = exports.encryptSecPass = (0, _ramda.curry)(function (sharedKey, pbkdf2Iterations, password, message) {
  return encryptDataWithPassword(message, sharedKey + password, pbkdf2Iterations);
});

var decryptSecPass = exports.decryptSecPass = (0, _ramda.curry)(function (sharedKey, pbkdf2Iterations, password, message) {
  return decryptDataWithPassword(message, sharedKey + password, pbkdf2Iterations);
});