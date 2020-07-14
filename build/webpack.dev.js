const webpack =  require('webpack');
const  commonConfig = require('./webpack.common');
const {merge} = require('webpack-merge');

// "presets": [["@babel/preset-env",{
//     useBuiltIns: 'usage', //按需转换，有用到什么就引入什么，在webpack4中，如果使用了这个在main.js中不用引入'@babel/polyfill'也时可以的
//     targets: { //大于浏览器的这些版本就不做转换了
//         edge: "17",
//         firefox: "60",
//         chrome: "67",
//         safari: "11.1",
//       },
// }]],

const devConfig=  {
    mode: "development", //模式 不写默认是production,   production:打包后会进行压缩，development不会进行压缩
    devtool: 'cheap-module-eval-source-map', //报错位置提示   开发环境用'cheap-module-source-map' cheap:1.只提示到行不精确到列，2.只检查自己业务模块代码，不检查第三放模块代码
    devServer:{ //文件修改完成无需每次npm run start,会自动帮我们完成这个动作
        contentBase: './dist', //设置服务器所在位置
        open: true, //自动帮我们打开浏览器
        publicPath: '/',
        hot: true, //使用模块热更新
        hotOnly: true, //html失效的时候不要刷新
        
        proxy:{
            "/api":{
                target:'www.baidu.com', //代理服务器
                pathRewrite: {"^/api" : ""}, //地址栏将不再显示出/api
                
            }
        }, //设置跨域
        // host: "0.0.0.0", //设置服务器外部能访问 webpack-dev-server --host 0.0.0.0
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
    
    
  ],
    
    optimization: { //生成环境下注释
    usedExports: true, //开启Tree Shaking, development下，生成环境下会自动开启
  },

//注意： loader是从下到上，从右到左的顺序执行的！！！

}

module.exports = merge(commonConfig, devConfig);