# npm知识点记录

## npm(yarn)-link 
* https://docs.npmjs.com/cli/link
* https://yarnpkg.com/lang/en/docs/cli/link/
* https://www.jianshu.com/p/aaa7db89a5b2

以npm为例
在开发npm包[modulex]时,在[modulex]目录下执行`npm link`，[modulex]就被链接到全局安装包了，然后在你需要使用[modulex]的测试项目A中执行`npm link [modulex]`,这样项目A就可以正常使用[modulex]