const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  return {
    cache: false,
    mode: isProduction ? 'production' : 'development',
    entry: {
      "flip": './packages/flip/index.js',
    },
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    devServer: isProduction ? undefined : {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    optimization: isProduction ? {
      moduleIds: 'hashed',
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        },
      }
    } : undefined,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contentHash].js' : '[name].bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'flip.html',
        chunks: isProduction ? ['runtime~flip', 'vendors', 'flip'] : ['flip'],
        title: 'Flip Demo',
        template: 'public/index.html'
      })
    ]
  }
};