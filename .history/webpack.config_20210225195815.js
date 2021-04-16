const path = require('path') // node.js的path模块，用于生成绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入html-webpack-plugin插件，生成一个HtmlWebpackPlugin类
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //引入clean-webpack-plugin插件，在每次生成dist入口文件时先清理dist文件

module.exports = {
    entry: './src/main.ts', // 入口文件为main.js文件
    output: {
      path: path.resolve(__dirname, 'dist'), // 配合path模块的resolve方法，生成绝对路径dist
      filename: 'main.js', // 绝对路径下的文件名，可随意取
    },
    devServer: { // webpack-dev-server插件
      contentBase: '/dist', // 打包的根路径，dist文件目录下
      open: true // 自动运行  然后去package.json文件进行配置，即可使用webpack-dev-server插件运行项目
    },
    module: { // 把webpack的插件转化成模块，这里是把style-loader与css-loader转化成模块
        rules: [  // 转换的规则
            {
                test: /\.css$/, // 正则匹配，这里是匹配css文件
                use: ['style-loader', 'css-loader'] // 这里是使用顺序，从后往前，即先执行css-loader，在执行style-loader
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/, // 正则匹配，这里是匹配icon文件
                use: ['file-loader']
            }
        ]
      },
      plugins: [ // 调用类
        new HtmlWebpackPlugin({
            template: './src/index.html' // 把src下的index.html文件作为模板自动生成入口文件dist
        }),
        new CleanWebpackPlugin()
      ],
    mode: 'development'
}
