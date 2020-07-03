const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过自动注入所有生成的包来为应用程序生成一个HTML文件
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //  它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

module.exports = {
    mode: "production", //模式 不写默认是production,   production:打包后会进行压缩，development不会进行压缩
    entry: "./src/main.js", // 打包入口文件
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
            use: ['vue-style-loader','css-loader','sass-loader','postcss-loader']
        }]
    },
    plugins: [
        // new HtmlWebpackPlugin({template: './public/index.html'}),
        new HtmlWebpackPlugin({template: './public/index.html'}),
        // 请确保引入这个插件！
        new VueLoaderPlugin() 
      ],
    output: { //出口
        filename: 'app.js', //文件名
        path: path.resolve(__dirname,'dist'), //出口文件路径 绝对地址
        // publicPath:'./'
    }
    //注意： loader是从下到上，从右到左的顺序执行的！！！
}