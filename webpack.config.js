const path = require('path');

module.exports = {
  entry: './src/hooks.js',
  output: {
    filename: 'hooks.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Hooks',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
