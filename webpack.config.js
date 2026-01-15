const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    taskpane: './src/taskpane.js',
    commands: './src/commands.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    server: 'https'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/taskpane.html',
      filename: 'taskpane.html',
      chunks: ['taskpane']
    }),
    new HtmlWebpackPlugin({
      template: './src/commands.html',
      filename: 'commands.html',
      chunks: ['commands']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'assets',
          noErrorOnMissing: true
        },
        {
          from: 'manifest.xml',
          to: 'manifest.xml'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
