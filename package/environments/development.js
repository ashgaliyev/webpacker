const Base = require('./base')
const devServer = require('../dev_server')
const { outputPath: contentBase, publicPath } = require('../config')

module.exports = class extends Base {
  constructor() {
    super()

    if (devServer.hmr) {
      // NOTE: next line is not needed if starting the server with `--hot` option
      // https://webpack.js.org/configuration/dev-server/#devserverhot
      // this.plugins.append('HotModuleReplacement', new webpack.HotModuleReplacementPlugin())
      this.config.output.filename = '[name]-[hash].js'
    }

    this.config.merge({
      mode: 'development',
      cache: true,
      devtool: 'cheap-module-source-map',
      output: {
        pathinfo: true
      },
      devServer: {
        clientLogLevel: 'none',
        compress: devServer.compress,
        quiet: devServer.quiet,
        disableHostCheck: devServer.disable_host_check,
        host: devServer.host,
        port: devServer.port,
        https: devServer.https,
        hot: devServer.hmr,
        contentBase,
        inline: devServer.inline,
        useLocalIp: devServer.use_local_ip,
        public: devServer.public,
        publicPath,
        historyApiFallback: {
          disableDotRule: true
        },
        headers: devServer.headers,
        overlay: devServer.overlay,
        stats: {
          entrypoints: false,
          errorDetails: true,
          modules: false,
          moduleTrace: false
        },
        watchOptions: devServer.watch_options
      }
    })
  }
}
