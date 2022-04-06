
// 在vue.config.js配置过这个js文件就可以去除
// module.exports = {
//     plugins: {
//         'postcss-pxtorem': {
//             rootValue: 75,//设置根元素的字体大小
//             propList: ['*'],//可以从px更改到rem的属性
//             exclude:/node_modules/i,//排除node_modules目录
//             selectorBlackList:['vant-','.my-'],//过滤掉vant-开头的元素选择器  ,my-开头的类选择器
//         },
//     },
// };