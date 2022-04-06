const pxtorem = require('postcss-pxtorem');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HotHashWebpackPlugin = require('hot-hash-webpack-plugin')
const WebpackBar = require('webpackbar');
module.exports = {
    // mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    outputDir: 'dist',
    assetsDir: 'static',
    // publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    publicPath:'/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    pxtorem({
                        rootValue: 75,//设置根元素的字体大小
                        propList: ['*'],//可以从px更改到rem的属性
                        exclude:/node_modules/i,//排除node_modules目录
                        selectorBlackList:['vant-','.my-'],//过滤掉vant-开头的元素选择器  ,my-开头的类选择器
                    })
                ]
            }
        }
    },
    devServer: {
        port: 8899, // 端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名， 127.0.0.1， 真机 0.0.0.0
        https: true, //协议
        open: false, //启动服务时自动打开浏览器访问
        proxy: {  // 开发环境代理配置
            [process.env.VUE_APP_API]: {  // 意思是当请求是以 dev-api 开头的请求，都走代理
                target: 'http://tp6-vue2.local.sumeils.com/',// 目标服务器地址，代理访问：http://localhost:8001
                changeOrigin: true,   // 开启代理服务器，就会给你代理转发
                pathRewrite: {
                    // /dev-api/db.json 最终会转发到 http://localhost:8001/db.json
                    ['^' + process.env.VUE_APP_BASE_API]: '',  // 就是将请求地址中的 /dev-api 前缀替换成空的
                }
            }
        }
    },
    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";
//             // 这里修改下
// 			config.optimization.minimizer = [
// 				new UglifyJsPlugin({
// 					uglifyOptions: {
// 						compress: {
// 							warnings: false,
// 							drop_console: true, //console
// 							drop_debugger: true,
// 							pure_funcs: ['console.log'] //移除console
// 						}
// 					}
// 				})
// 			]
            //打包文件大小配置
            config["performance"] = {
                "maxEntrypointSize":10000000,
                "maxAssetSize":30000000
            }
        } else {
            // 为开发环境修改配置...
            config.mode = "development";
        }
    },
    chainWebpack: (config) => {
        if(process.env.NODE_ENV === 'production') {
            config.output.filename('./js/[name].[chunkhash:8].js');
            config.output.chunkFilename('./js/[name].[chunkhash:8].js');
            config.plugin('extract-css').tap(args => [{
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }]);
            config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version : '1.0.0'}]);
            config.plugin('webpackBar').use(WebpackBar);

            config.optimization.minimize(true)
                .minimizer('terser')
                .tap(args => {
                    let { terserOptions } = args[0];
                    terserOptions.compress.drop_console = true;
                    terserOptions.compress.drop_debugger = true;
                    return args
                });
            config.optimization.splitChunks({
                cacheGroups: {
                    common: {
                        name: 'common',
                        chunks: 'all',
                        minSize: 1,
                        minChunks: 2,
                        priority: 1
                    },
                    vendor: {
                        name: 'chunk-libs',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10
                    }
                }
            });
        }
    }
};
