const config = require('./webpack.dev.config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})
.listen(8080, 'localhost', (err, result) => {
  if (err) return console.log(err)
  console.log('Listening at http://localhost:8080/')
})
