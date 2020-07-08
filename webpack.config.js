const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过自动注入所有生成的包来为应用程序生成一个HTML文件
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //  它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
const { CleanWebpackPlugin }  = require('clean-webpack-plugin'); //  在打包之前先帮我们删除上次打包生成的dist文件夹
const webpack =  require('webpack');


module.exports = {
    mode: "development", //模式 不写默认是production,   production:打包后会进行压缩，development不会进行压缩
    entry:  "./src/main.js", // 打包入口文件
    // entry:{
    //     main: './src/main.js',
    //     sub: "./src/main1.js"
    // },
    devtool: 'cheap-module-eval-source-map', //报错位置提示   开发环境用'cheap-module-source-map' cheap:1.只提示到行不精确到列，2.只检查自己业务模块代码，不检查第三放模块代码
    devServer:{ //文件修改完成无需每次npm run start,会自动帮我们完成这个动作
        contentBase: './dist', //设置服务器所在位置
        open: true, //自动帮我们打开浏览器
        publicPath: './assets/',
        hot: true, //使用模块热更新
        hotOnly: true, //html失效的时候不要刷新
        proxy:{
            "/api":{
                target:'www.baidu.com', //代理服务器
                pathRewrite: {"^/api" : ""}, //地址栏将不再显示出/api
                
            }
        }, //设置跨域
        host: "0.0.0.0", //设置服务器外部能访问 webpack-dev-server --host 0.0.0.0
    },
    module: {
        rules:[
        //     {
        //     test: /\.(png|jpe?g|gif)$/i, //不需要加引号
        //     use: [{
        //             loader: 'file-loader', //将文件发送到输出文件夹并返回(相对)URL
        //             options: {
        //                 name: '[name]_[hash].[ext]', //使打包后的文件名为： 原本文件名_hash值.文件类型
        //                 outputpath: 'imgs/' 
        //             }
        //     }]
        // },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i, //不需要加引号
            use: [{
                    loader: 'url-loader', //将文件发送到输出文件夹并返回(相对)URL
                    options: {
                        esModule: false,//es6规范 vue-loader在13.x以后通过require导入的包默认esModule是true；造成直接通过require方法引入的静态资源无法使用；需要手动添加default属性；
                        name: '[name]_[hash].[ext]', //使打包后的文件名为： 原本文件名_hash值.文件类型
                        outputpath: 'imgs/' ,
                        limit: 20480, //20kb 大于20kb的图片会像file-loader一样打包到dist/imgs下，如果小于20kb会将图片压缩成base64位,并添加到dist目录下输出js文件里
                        // mimetype: 'image/png', //用来指定图片以base64格式打包进入js后的格式 默认是image/jpeg ,但是并不影响实际大小
                        // fallback: 'vue-style-loader'
                    }
            }]
        },{
            test: /\.vue$/,
            loader: 'vue-loader' //用来打包.vue文件模块
           
        },{
            test: /\.css$/, //不需要加引号
            use: ['vue-style-loader','css-loader','postcss-loader'], // 前后顺序不能写反。打包css文件并添加到html的header标签里面,'css-loader'识别.css文件直接的关系'style-loader'将css添加到html的header标签里面,
        },{
            test: /\.scss$/,
            use: ['vue-style-loader',{
                loader:'css-loader',
                options: {
                    importLoaders: 2,
                    // modules: true
                }
            },'sass-loader','postcss-loader']
        },{ 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader", //用来将es6转es5
            options: {
                "presets": [["@babel/preset-env",{
                    useBuiltIns: 'usage' //按需转换，有用到什么就引入什么
                }]]
            } }]
    },
    plugins: [
        // new HtmlWebpackPlugin({template: './public/index.html'}),
        new HtmlWebpackPlugin({template: './public/index.html'}),//会在打包结束之后，自动生成一个html文件，并把打包生成的js自动引入到这个html中
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),//在打包之前先帮我们删除上次打包生成的dist文件夹
        new webpack.HotModuleReplacementPlugin()
      ],
    output: { //出口
        // publicPath:'/',
        // filename: 'index.js', //文件名
        filename: '[name].js', //文件名 (同时打包出多个js文件，每个文件名同entry的键名相同)
        path: path.resolve(__dirname,'dist'), //出口文件路径 绝对地址
        // publicPath:'./'
    }
    //注意： loader是从下到上，从右到左的顺序执行的！！！
}