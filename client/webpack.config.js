'use strict';
const path = require('path');
const webpack = require('webpack');

const { ASSETS_HOST, ASSETS_PORT } = process.env;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const public_path = path.join(__dirname, 'static');
const src_path = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index'),
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },

  mode: process.env.NODE_ENV || 'development',

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: [
      '*',
      '.mjs',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.scss',
      '.css',
      '.svg',
    ],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: public_path,
      publicPath: '/',
    },

    host: ASSETS_HOST,
    port: ASSETS_PORT,
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: ['ts-loader'],
      },
      {
        // SCSS styles included in js
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[local]___[contenthash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        include: [path.resolve(__dirname, 'src')],
      },

       {
        // SCSS styles
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: 'dist/css' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: [path.resolve(__dirname, 'stylesheets')],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: 'dist/css' },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Car Base Parking',
      template: path.join(__dirname, 'static', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
