// import { Left, Right } from 'data.either';
import { fromJS } from 'immutable';
import * as R from 'ramda';
import * as RL from 'ramda-lens';
import * as WCrypto from '../WalletCrypto';
import { Api } from '../network'
const API = new Api();

const immLens = key => RL.lens((x) => x.get(key), (val, x) => x.set(key, val));
const payload = R.lensProp('payload');
const ipayload = immLens('payload');

const decrypter = R.curry((password, encWrapper) => {
  const immEncWrapperNoPass = fromJS(encWrapper);
  const immEncWrapper = immEncWrapperNoPass.set('password', password);
  const encPayload = R.view(payload, encWrapper);
  const immDecPayloadE = R.compose(R.map(fromJS), WCrypto.decryptWallet(password))(encPayload);
  const replacer = (d) => RL.set(R.compose(ipayload, ipayload), d, immEncWrapper);
  return immDecPayloadE.chain(replacer);
});

export const getWallet = (guid, sharedKey, password) =>
  API.fetchWalletWithSharedKey(guid, sharedKey)
     .then(R.over(payload, JSON.parse))
     .then(decrypter(password))
