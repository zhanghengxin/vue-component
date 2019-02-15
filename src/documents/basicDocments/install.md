# 快速上手

----

### 使用 npm 安装
从[git仓库](http://192.168.0.247/BaiwangFE/bwUI)拉取项目，项目架构是基于vue-cli3.x进行了一部分改造，所以可以直接在项目目录直接执行

```bash
npm i
```

### 项目目录
```
├── libs // 组件库
│   ├── components //  组件库js源码
│   ├── mixins  // 组件库公用 mixin
│   ├── styles  // 组件库css源码
│   ├── utils  // 组件公用 API
│   └── index.js // 入口文件
├── src // 组件资源区和文档放置区
│   ├── assets // 静态资源
│   │   ├── font // 组件库公用icon
│   │   ├── scss
│   │   │   ├── color.scss 全局样色表
│   │   │   ├── doc.scss  示例文档样式
│   │   │   ├── index.scss  全局样式引用
│   │   │   ├── reset.scss  浏览器样式重置
│   │   └── logo.png // logo
│   ├── components // 公共组件
│   │   ├── CodeShow.vue // 文档组件
│   │   ├── ColorShow.vue // 颜色展示组件
│   │   ├── Header.vue // header组件
│   │   └── Nav.vue // 侧边栏组件
│   ├── documents // 示例文档
│   │   ├── basicDocments // 基础组件库展示文档
│   │   ├── businessLibs // 业务组件库展示文档
│   ├── utils // 项目资源目录
│   │   ├── menu.json //  组件渲染列表
│   │   ├── icon.json //  icon展示列表
│   └── router // 路由文件
│   │     └── index.js // 路由配置文件
│   ├── App.vue // 根文件
│   ├── main.js // 入口文件
├── tests //  测试资源

........略
```
一个完整的组件开发应该包括:组件代码、文档展示、样式归纳、测试用例模板等等，项目中集成了 [ESlint](https://standardjs.com/)、
SCSS，同学们有好的建议欢迎提出0.0
