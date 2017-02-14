import React from 'react'
import { Provider } from 'react-redux'
import '../assets/css/main.css'
import Main from '../components/Main'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>
)

App.propTypes = {
  store: React.PropTypes.object
}

export default App
