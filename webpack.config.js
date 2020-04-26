const path = require('path');

module.exports = {
  entry: {
    '@mewui/core/umd/index': [path.join(__dirname, 'src', 'index.ts')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'MewUICore',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  }
}