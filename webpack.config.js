import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: withModules
          ? {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            }
          : false,
        sourceMap: !isProd,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
        sourceMap: !isProd,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd,
      },
    },
  ].filter(Boolean);
};

export default {
  target: !isProd ? 'web' : 'browserslist',
  entry: path.resolve(srcPath, './main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.scss$/,
        use: getSettingsForStyles(false),
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource'
      // }
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    new TsCheckerPlugin(),
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
      silent: true,
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
