# 组件开发规范【持续补充中。。】

----

### 建议

在开始组件库开发之前，至少要先阅读并且练习一遍 vue的一些[基础知识](https://cn.vuejs.org/v2/guide/),以及遵守 vue 的开发
[风格指南](https://cn.vuejs.org/v2/style-guide/)

### 组件样式
所有组件样式不建议用 scope 属性，而是添加统一前缀 【b-组件名-属性的模式】，以下是组件样式示例：

// button组件  示例
```bash
.b-btn {
...
}

.b-btn-info {
  color: white;
  background-color: $LightPrimary; // 所有颜色统一用全局颜色表的变量来写，方便统一管理
  border-color: $LightPrimary;
}

.b-btn-white {
  color: $LightPrimary;
  background-color: white;
  border-color: $Border;
}

.b-btn-small {
  height: 25px;
}

.b-btn-normal {
  height: 32px;
}
```

### 测试
初期 UI 测试采用常见的的Karma + Mocha单元测试，测试用例请参考test/unit/specs/Icon.spec.js,测试用例编写以后，执行 npm run unit 进行测试

以下是测试用例执行成功的截图

![avatar](../assets/image/test.jpg)
