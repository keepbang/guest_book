const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    entry : './src',  // entry 경로 수정
    output: {
        path: path.resolve(__dirname, 'build'), // output 경로 수정
        filename: "index.js", // output 파일명 수정
    }
}