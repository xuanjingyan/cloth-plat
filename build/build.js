'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
const fs = require("fs");
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
const paths = require("../config/serverPath.js")
const len = process.argv.length;
const SERVER_TYPE = process.argv[len - 1];//获取命令行参数
console.log(`后端服务器地址:${paths[SERVER_TYPE]}`);
const dir = path.join(__dirname,"../src/serverPath.js")
fs.writeFileSync(dir,`export default {baseUrl: "${paths[SERVER_TYPE]}"}`);
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
