/*
	自动清理模块，需下载安装
	这个模块在每次打包时，将自动清空打包出口文件夹。
	如果你使用了打包分离的相关模块，建议不使用它。因为分离后，打包将会导致出口文件夹中未改动的文件被删除
*/
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {

    // 配置插件
    plugins: [
        // 实例化模块对象：自动清理打包出口文件夹
        new CleanWebpackPlugin(),
    ],

};

