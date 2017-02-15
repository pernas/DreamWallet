
const walletSyncMiddleware = (options) => (store) => (next) => (action) => {
  let prevWallet = store.getState()[options.path]
  let result = next(action)
  let nextWallet = store.getState()[options.path]

  // Easily know when to sync, because of ✨immutable✨ data
  if (prevWallet !== nextWallet) {
    console.log('Syncing with server...')
  }
  return result
}

export default walletSyncMiddleware
