/**
 * webpack.config.js 打包配置文件
 */


//引入nodejs内置模块，可以拿到当前文件的跟目录
const path = require('path');

//引入html打包的插件 
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    //入口
    entry: {
        /**公共模块 样式 js */
        commonCSS: './src/js/commonCSS.js',
        http: './src/utils/http.js',
        /**其他的三方插件 */
        captcha: './src/lib/captcha/captcha-mini.js',
        /**页面自己的模块 */
        index: './src/js/index.js',
        login:'./src/js/login.js',
        register:'./src/js/register.js',
        crowd_funding: './src/js/crowd_funding.js',
        good_products: './src/js/good_products.js',
        youpin_live: './src/js/youpin_live.js',
    },   //相对路径
    //出口
    output: {
        path: path.resolve(__dirname, 'dist'),   //绝对路径  所有的打包完成之后的文件都放在这个
        filename: 'js/[name].js',         //资源打包完成之后生成的js文件     
        publicPath: './'                //打包完成之后的html文件引入其他资源的基础路径（相对路径）
    },
    //loader 
    module: {
        rules: [
            {
                test: /\.css$/,          //正则表达式  匹配需要应用这个规则的所有文件是哪些
                // use: ['style-loader', 'css-loader']       //使用哪些三方包去处理匹配出来的这些文件 
                //css-loader:将css文件能够让webpack识别
                //style-loader: 将js中的css代码提取到页面上 写到style标签里面

                //提取js中的css形成独立的css文件  不将css通过style的方式写入页面
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/, //配置less处理器
                // use: ['style-loader', 'css-loader', 'less-loader']
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp)$/, //配置css中的图片打包
                loader: 'url-loader',     //只有一个处理的loader的写法  
                //可以通过url-loader 将图片压缩为 base64编码格式的图片
                //大图就不压缩  小图可以压缩
                options: {
                    name: '[hash:16].[ext]',  // 图片输出的名字hash长度16位 默认32位
                    limit: 30 * 1024,  // 限制 小于30kb base64处理
                    esModule: false,  //默认css中的图片以ES6的模块进行打包，但是html中图片只能以node下的commonjs规范进行打包
                    //有可能存在图片打包的冲突，要求直接将css打包模块设置为node的模块打包
                    outputPath: 'img'
                },
            },
            {
                test: /\.html$/,    //配置html文件打包
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/, //配置iconfont文件打包
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'   //输出的目录
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }

        ]
    },
    // 4. 插件
    plugins: [
        // new 插件名({
        //     配置  key:value
        // })
        // 主页
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/register.html',         //以哪个html文件作为打包的模板
            filename: 'register.html',
            //页面绑定模块
            chunks: ['register', 'commonCSS', 'http']
        }),
        // 注册
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/login.html',         //以哪个html文件作为打包的模板
            filename: 'login.html',
            //页面绑定模块
            chunks: ['login', 'commonCSS', 'http']
        }),
        // 登录
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/index.html',         //以哪个html文件作为打包的模板
            filename: 'index.html',
            //页面绑定模块
            chunks: ['index', 'commonCSS', 'http']
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/crowd_funding.html',         //以哪个html文件作为打包的模板
            filename: 'crowd_funding.html',
            //页面绑定模块
            chunks: ['crowd_funding', 'commonCSS', 'http']
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/good_products.html',         //以哪个html文件作为打包的模板
            filename: 'good_products.html',
            //页面绑定模块
            chunks: ['good_products', 'commonCSS', 'http']
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/youpin_live.html',         //以哪个html文件作为打包的模板
            filename: 'youpin_live.html',
            //页面绑定模块
            chunks: ['youpin_live', 'commonCSS', 'http']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin()

    ],
    //mode 环境   development:开发环境(代码可读性)  production：生产环境（线上环境） 代码极致压缩 混淆
    mode: process.env.NODE_ENV,
    //开发服务器配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
