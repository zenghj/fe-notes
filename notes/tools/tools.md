[toc]
## 工具
### vscode
#### node debug

##### debug当前聚焦编辑的文件
debug配置
```js
  {
    // debug当前聚焦编辑的文件
    "type": "node",
    "request": "launch",
    "name": "Current File",
    "program": "${file}"
  }
```
##### debug npm scripts

use [ndb](https://www.npmjs.com/package/ndb)

## 常用的webpack插件
### 图片压缩
* [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
```js
// 基础配置
module.exports = {
  // ...
  module: {
    rules: [
    //...
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        options: {
          // webpack2.x and newer
          // 只在 production 时压缩
          disable: process.env.NODE_ENV !== 'production'
        },
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre'
      }
    // ...
    ]
  }
}
// 更细致的配置可以配置不同格式的图片压缩质量级别，请参考官方文档
```

### 移动端rem单位
* [px2rem-loader](https://github.com/Jinjiang/px2rem-loader)
```js
// 基础配置
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'px2rem-loader',
        // options here
        options: {
          remUnit: 75,
          remPrecision: 8
        }
      }]
    }]
  }
}
```