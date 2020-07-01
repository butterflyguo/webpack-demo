const path = require('path');

module.exports = {
    mode: "production", //模式 不写默认是production,   production:打包后会进行压缩，development不会进行压缩
    entery: "./index.js", // 入口文件
    output: { //出口
        filename: 'mian.js', //文件名
        path: path.resolve(_dirname,'dist') //出口文件路径 绝对地址
    }
}