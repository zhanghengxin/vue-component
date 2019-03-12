### 引入 bwUi

在 `webpack` 入口页面 `main.js` 中如下配置：
```
import Vue from 'vue'
import App from './App'
import router from './router'
import bwUi from 'bwUi'
import 'bwUi/dist/styles/bwUi.css'

Vue.use(bwUi)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

```

### 按需加载

在 `webpack` 入口页面 `main.js` 中如下配置：
```

import Vue from 'vue'
import App from './App'
import router from './router'
import { Icon } from 'bwUi'
import 'bwUi/dist/styles/bwUi.css'
Vue.component(Icon.name, Icon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

```
执行 cnpm i babel-plugin-import -D

在`.babelrc`中配置
```
"plugins": [
    "transform-vue-jsx",
    "transform-runtime",
    ["import", {
        "libraryName": "bwUi",
        "libraryDirectory": "components"
    }]
]
```