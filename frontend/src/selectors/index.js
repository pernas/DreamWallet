export const getSession = guid => state => state.session[guid]
export const getSelection = state => state.selection
export const getSelectedWallet = state => state.wallets[state.selection]
