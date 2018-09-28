# 快速上手

----

### 使用 npm 安装
从[git仓库](http://192.168.0.247/BaiwangFE/bwUI)拉取项目，项目架构是基于vue-cli2.x进行了一部分改造，所以可以直接在项目目录直接执行

```bash
cnpm i
```




### 项目目录
```
├── build  // 配置文件目录
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config // 基本配置
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── libs // 组件库
│   ├── page // page 源码 【例子】
│   ├── utils  // 组件公用 API
│   ├── common.js  //组件库公共资源
│   └── index.js // 入口文件
├── src // 组件资源区和文档放置区
│   ├── assets // 静态资源
│   │   ├── scss //
│   │   │   ├── bwUI.scss 全局组件库样式
│   │   │   ├── color.scss 全局样色表
│   │   │   ├── doc.scss  示例文档样式
│   │   │   ├── index.scss  全局样式引用
│   │   │   ├── reset.scss  浏览器样式重置
│   │   └── logo.png // logo
│   ├── components // 公共组件
│   │   ├── CodeShow.vue // 文档组件
│   │   ├── Header.vue // header组件
│   │   └── Nav.vue // 侧边栏组件
│   ├── documents // 示例文档
│   │   ├── page.md // 按钮组件文档【例子】
│   ├── utils // 项目资源目录
│   │   ├── menu.json //  组件渲染列表
│   └── router // 路由文件
│   │     └── index.js // 路由配置文件
│   ├── App.vue // 根文件
│   ├── main.js // 入口文件
├── test //  测试资源
│   ├── unit // karma + moche
│   │   ├── specs // 测试用例库
│   │   │   ├── icon.spec.js  // icon 组件测试用例【例子】
│   │   └──  index.js // 入口
│   │   │──  karma.conf.js // 配置文件
│   │   │──  utils // API
........略
```
一个完整的组件开发应该包括:组件代码、文档展示、样式归纳、测试用例模板等等，项目中集成了 [ESlint](https://standardjs.com/)、
SCSS，同学们有好的建议欢迎提出0.0
