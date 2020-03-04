const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');
const webpack = require('webpack');
const MFS = require('memory-fs');

module.exports = function createDevServer(app, cb) {
  let ready;
  let bundle;
  let clientManifest;
  let ssrTemplate;
  let csrTemplate;

  const readyPromise = new Promise(resolve => ready = resolve);

  const update = () => {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, clientManifest, {
        ssr: ssrTemplate,
        csr: csrTemplate
      });
    }
  }

  let devMiddleware;
  function clientManifestUpdatePlugin() {}
  clientManifestUpdatePlugin.prototype.apply = function(compiler) {
    compiler.hooks.done.tap('clientDone', stats => {
      if (stats.hasErrors()) {
        return;
      }
      clientManifest = JSON.parse(
        devMiddleware.fileSystem.readFileSync('/vue-ssr-client-manifest.json', 'utf-8')
      );
      ssrTemplate = require('fs').readFileSync('./templates/index.ssr.dev.html', 'utf-8');
      csrTemplate = devMiddleware.fileSystem.readFileSync('/index.csr.html');
      console.log('manifest build');
      update();
    });
  }

  clientConfig.plugins.push(
    new clientManifestUpdatePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  );
  clientConfig.entry = [
    'webpack-hot-middleware/client',
    clientConfig.entry
  ];
  clientConfig.output.path = '/';
  clientConfig.output.filename = '[name].js';

  const clientCompiler = webpack(clientConfig);

  devMiddleware = require('koa-webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath
  });

  app.use(devMiddleware);

  app.use(require('koa-webpack-hot-middleware')(clientCompiler, {
    heartbeat: 5000
  }));

  serverConfig.output.path = '/dist';
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err;
    }
    if (stats.hasErrors()) {

      return;
    }
    bundle = JSON.parse(mfs.readFileSync('/dist/vue-ssr-server-bundle.json', 'utf-8'));
    console.log('bundle build');
    update();
  });

  return readyPromise;
}