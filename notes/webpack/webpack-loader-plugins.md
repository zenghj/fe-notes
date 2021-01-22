[toc]
# 阅读常见webpack loader & plugin 
## loader

### url-loader
比较简单，
对source的长度做判断 
  小于limit或者limit没有设置就导出为base64模块
  否则使用 fallback loader || file-loader 对模块进行处理

### file-loader
根据规则生成文件emit路径和 publicPath；调用this.emitFile生成文件；返回publicPath也就是最后部署后文件的引用路径（比如 import 一张图片, 如果通过file-loader处理，import 得到的是这个图片部署的路径）

### vue-loader

稍微复杂一点，大致就是把 .vue文件解析成 template/script/style 三个block（可以加额外的customBlock），然后生成一段导出vue component的代码字符串导出

### babel-loader