
const {merge} = require('webpack-merge');
const  commonConfig = require('./webpack.common');

// "presets": [["@babel/preset-env",{
//     useBuiltIns: 'usage', //按需转换，有用到什么就引入什么，在webpack4中，如果使用了这个在main.js中不用引入'@babel/polyfill'也时可以的
//     targets: { //大于浏览器的这些版本就不做转换了
//         edge: "17",
//         firefox: "60",
//         chrome: "67",
//         safari: "11.1",
//       },
// }]],

const prodConfig = {
    mode: "production", //模式 不写默认是production,   production:打包后会进行压缩，development不会进行压缩
    devtool: 'cheap-module-source-map', //报错位置提示   开发环境用'cheap-module-source-map' cheap:1.只提示到行不精确到列，2.只检查自己业务模块代码，不检查第三放模块代码
    //注意： loader是从下到上，从右到左的顺序执行的！！！
}
module.exports =  merge(commonConfig,prodConfig);