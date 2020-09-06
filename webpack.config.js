const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        index: [
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs/'),
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread', 'transform-class-properties']
                }
              }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
    devtool: 'inline-source-map'
};