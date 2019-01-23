'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  watch: false,

  devtool: 'inline-source-map',
};
