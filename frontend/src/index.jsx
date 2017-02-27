import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore.dev'
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import { rootSaga } from 'dream-wallet/lib/sagas'

const store = configureStore()
// store.runSaga(rootSaga)

injectTapEventPlugin()

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
