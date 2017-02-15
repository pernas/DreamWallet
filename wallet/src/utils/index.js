import {Api} from '../network'
import { fromJS } from 'immutable';
// import { Left, Right } from 'data.either';
import * as R from 'ramda';
import * as RL from 'ramda-lens';
import * as WCrypto from '../WalletCrypto';

const immLens = key => RL.lens((x) => x.get(key), (val, x) => x.set(key, val));
const payload = R.lensProp('payload');
const ipayload = immLens('payload');
const A = new Api();
console.log(Api)
// const decrypter = R.curry((password, encWrapper) => {
//   const immEncWrapperNoPass = fromJS(encWrapper);
//   const immEncWrapper = immEncWrapperNoPass.set('password', password);
//   const encPayload = R.view(payload, encWrapper);
//   const immDecPayloadE = R.compose(R.map(fromJS), R.map(kaka), WCrypto.decryptWallet(password))(encPayload);
//   const replacer = (d) => RL.set(R.compose(ipayload, ipayload), d, immEncWrapper);
//   return immDecPayloadE.chain(replacer);
// });

export const loadWallet = (guid, sharedKey, password) =>
  A.fetchWalletWithSharedKey(guid, sharedKey)

  // R.compose(
    // R.map(decrypter(password)),
    // R.map(R.over(payload, JSON.parse)),
    // Api.fetchWalletWithSharedKey )(guid, sharedKey);
