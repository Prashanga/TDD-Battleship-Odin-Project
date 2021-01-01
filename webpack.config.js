const path = require('path');

module.exports = {
  entry: './src/GamePlay.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
  },
  watch: true
};