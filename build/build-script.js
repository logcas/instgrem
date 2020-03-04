const baseConfig = require('./webpack.base');
const outputPath = baseConfig.output.path;
const webpack = require('webpack');
const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');
const fs = require('fs');
const ora = require('ora');

const rmDirSpinner = ora('正在清除目录中的旧的构建信息...').start();

fs.rmdir(outputPath, {
  recursive: true
} ,err => {
  if (err) {
    rmDirSpinner.fail('清理失败，构建结束');
    console.error(err);
    return;
  }

  rmDirSpinner.succeed('清理输出目录文件完成');

  const clientBuildSpinner = ora('正在构建 Client Bundle...');
  const serverBuildSpinner = ora('正在构建 Server Bundle...');
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  Promise.all([
    new Promise((resolve, reject) => {
      clientBuildSpinner.start();
      clientCompiler.run((err, stats) => {
        if (err) {
          clientBuildSpinner.fail('Client Bundle 构建失败');
          reject(new Error({
            msg: 'Client Bundle 构建失败',
            reason: err,
            stats
          }));
          return;
        }
        clientBuildSpinner.succeed('Client Bundle 构建成功');
        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      serverBuildSpinner.start();
      serverCompiler.run((err, stats) => {
        if (err) {
          serverBuildSpinner.fail('Server Bundle 构建失败');
          reject(new Error({
            msg: 'Server Bundle 构建失败',
            reason: err,
            stats
          }));
          return;
        }
        serverBuildSpinner.succeed('Server Bundle 构建成功');
        resolve();
      });
    })
  ]).then(() => {
    console.log('构建成功');
  }).catch(err => {
    console.error(err.msg);
    console.error(err.reason);
  });
});