# Transfer 穿梭框

### 基础用法

<div class='example'>
    <div class='example-box'>
        <b-transfer
            :data="data"
            :target-keys="targetKeys"
            @on-change="handleChange">
        </b-transfer>
    </div>

::: code

```html
    <b-transfer
        :data="data"
        :target-keys="targetKeys"
        @on-change="handleChange">
    </b-transfer>
    <script>
        export default {
        data () {
            return {
                data: this.getMockData(),
                targetKeys: this.getTargetKeys()
            }
        },
        methods: {
            getMockData () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            }
        }
    }
    </script>
```

:::
</div>

### 可搜索

设置属性 `filterable` 为 true，显示搜索框

<div class='example'>
    <div class='example-box'>
        <b-transfer
            filterable
            :data="data1"
            :target-keys="targetKeys1"
            @on-change="handleChange1">
        </b-transfer>
    </div>

::: code

```html
    <b-transfer
        filterable
        :data="data"
        :target-keys="targetKeys1"
        @on-change="handleChange1">
    </b-transfer>
    <script>
        export default {
        data () {
            return {
                data1: this.getMockData(),
                targetKeys1: this.getTargetKeys()
            }
        },
        methods: {
            getMockData () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            }
        }
    }
    </script>
```

:::
</div>

### 自定义渲染行

设置属性 `render-format` 定义渲染行数据

<div class='example'>
    <div class='example-box'>
        <b-transfer
            :data="data2"
            :render-format="renderFormat"
            :target-keys="targetKeys2"
            @on-change="handleChange2">
        </b-transfer>
    </div>

::: code

```html
    <b-transfer
        :data="data2"
        :render-format="renderFormat"
        :target-keys="targetKeys2"
        @on-change="handleChange2">
    </b-transfer>
    <script>
        export default {
        data () {
            return {
                data2: this.getMockData(),
                targetKeys2: this.getTargetKeys()
            }
        },
        methods: {
            getMockData () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            },
            renderFormat (item) {
                return item.label + ' - ' + item.description;
            }
        }
    }
    </script>
```

:::
</div>

<script>
    export default {
        data () {
            return {
                data: this.getMockData(),
                data1: this.getMockData1(),
                data2: this.getMockData2(),
                targetKeys: this.getTargetKeys(),
                targetKeys1: this.getTargetKeys1(),
                targetKeys2: this.getTargetKeys2()
            }
        },
        methods: {
            getMockData () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getMockData1 () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getMockData2 () {
                let mockData = []
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'Desc',
                        disabled: false
                    });
                }
                return mockData
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            getTargetKeys1 () {
                return this.getMockData1()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            getTargetKeys2 () {
                return this.getMockData2()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key)
            },
            handleChange (newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                this.targetKeys1 = newTargetKeys
            },
            handleChange2 (newTargetKeys, direction, moveKeys) {
                this.targetKeys2 = newTargetKeys
            },
            renderFormat (item) {
                return item.label + ' - ' + item.description;
            }
        }
    }
</script>

### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| data | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外 | Array  |  | [] |
| targetKeys | 显示在右侧框数据的key集合 | Array | [] |
| render-format | 自定义行数据渲染 | Function | | 默认显示label，没有时显示key |
| titles | 标题集合，顺序从左至右 | Array | | ['源列表', '目的列表'] |
| list-style | 穿梭框 list 自定义样式 | Object | | {} |
| filterable | 是否显示搜索框 | Boolean | `true`、`false` | false |
| filter-placeholder | 搜索框的占位 | String |  | 请输入 |
| not-found-text | 当列表为空时显示的内容 | String | | 列表为空 |

### events 
| 事件名	      | 说明	    | 返回值 |
|---------- |-------- |---------- |
| on-change | 选项在两栏之间转移时的回调函数  | targetKeys, direction, moveKeys |
| on-selected-change | 选中项发生变化时触发  | sourceSelectedKeys, targetSelectedKeys |

### slot 

| 参数 | 说明 |
| ---- | ---- |
| | 自定义底部内容 |