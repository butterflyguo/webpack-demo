const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过自动注入所有生成的包来为应用程序生成一个HTML文件
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //  它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
const { CleanWebpackPlugin }  = require('clean-webpack-plugin'); //  在打包之前先帮我们删除上次打包生成的dist文件夹

module.exports = {
    entry:  "./src/main.js", // 打包入口文件
    // entry:{
    //     main: './src/main.js',
    //     sub: "./src/main1.js"
    // },
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
            exclude: /node_modules/, //除了mode_modules文件里的
            loader: "babel-loader" //用来将es6转es5
        }],
    },
    plugins: [
        // new HtmlWebpackPlugin({template: './public/index.html'}),
        new HtmlWebpackPlugin({filename: 'index.html',template: './public/index.html'}),//会在打包结束之后，自动生成一个html文件，并把打包生成的js自动引入到这个html中
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(['dist'],{
        //     root: path.resolve(__dirname, '../')
        // }),//在打包之前先帮我们删除上次打包生成的dist文件夹
        new CleanWebpackPlugin()
      ],
      optimization: { 
        splitChunks: { //模块分离，如果为{}，就是现在的默认配置项
            chunks: 'async',//有三个值 all, async,  initial 所有，异步，同步
            minSize: 30000,//文件大于30kb才开始分割
            // minRemainingSize: 0, //解开注释会报错，官网默认是有的，还没找到原因
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6, //同时加载的模块数最多是6个
            maxInitialRequests: 4, //入口文件最多拆分4个文件
            automaticNameDelimiter: '~', //文件生成的时候名字中间的链接符
            cacheGroups: { //同步模块
              vendors: { //属于node_modules里的文件
                test: /[\\/]node_modules[\\/]/, 
                priority: -10, //同时满足vendors和default时，值越大优先级越高
                filename: 'vendors.js' //都统一打包到vendors.js文件里
              },
              default: { //不属于node_modules里的文件
                // minChunks: 2,
                priority: -20,
                reuseExistingChunk: true, //如果一个模块被打包过了，再次打包的时候就忽略这个模块用之前使用过的模块
                filename: 'common.js' //都统一打包到common.js文件里
              }
            }
          }
      },
    
    output: { //出口
        // publicPath:'/',
        // filename: 'index.js', //文件名
        filename: '[name].js', //文件名 (同时打包出多个js文件，每个文件名同entry的键名相同)
        path: path.resolve(__dirname,'../dist'), //出口文件路径 绝对地址
    }
    //注意： loader是从下到上，从右到左的顺序执行的！！！
}

