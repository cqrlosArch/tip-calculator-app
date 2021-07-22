const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].min.js',
    clean: true
  },
  devtool: 'source-map'
};
