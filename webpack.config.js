/*
 * @Author: 夏夏夏
 * @Date: 2020-04-16 11:46:47
 * @LastEditors: 夏夏夏
 * @LastEditTime: 2020-04-21 10:00:52
 * @Description: file contentmo
 */

 
const path = require('path') 
// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 设置的环境变量都存在于process里面
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 把非js东西单独打包成静态资源文件，方便做静态资源缓存
// const ExtracPlugin = require('extract-text-webpack-plugin') webpack4不支持
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    // 通过调用process.env.NODE_ENV判断
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"': '"production"'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}

if (isDev) {
  config.module.rules.push({
      test: /\.styl/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  // 浏览器调试打开是正常编译前代码
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: '8000',
    host: '0.0.0.0', // 可以通过Host访问，同时可以通过ip访问
    overlay: { 
      errors: true, // 错误显示到网页上面
    },
    // open: true //启动webpack-server，自动打开浏览器
    // historyFallback: { // 单页应用，前端路由，没有映射的地址，映射到index上面
    // },
    hot: true //改了组件的代码，只重新渲染这个组件的代码   
  },
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 将内库代码和业务代码分开打包，让浏览器尽可能缓存静态文件
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = `[name].[chunkhash:8].js`
  config.module.rules.push({
    test: /\.styl/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it uses publicPath in webpackOptions.output
          publicPath: './',
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'css-loader',
      { 
        loader: 'postcss-loader', 
        options: { sourceMap: true } 
      },
      'stylus-loader'
    ]
  })
  config.plugins.push(
    // new ExtracPlugin('style.[contentHash:8].css')
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // })
  )

  config.optimization = {
    splitChunks: {
      name: 'runtime',
      chunks: 'initial',
      minChunks: 2
    }
  }
}

module.exports = config