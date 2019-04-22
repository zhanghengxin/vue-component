### 更新日志

### 0.4.8
## `2019-04-22`
<br>
<b-timeline>
    <b-timeline-item>
    优化 step组件状态的判定优先级规则优化（现在由current判定状态的优先级高于在steps组件上设置的status的优先级）
    </b-timeline-item>
    <b-timeline-item>
    优化 progress 优化参数设置
    </b-timeline-item>
    <b-timeline-item>
    修复 tree 和 label-tree 分离,解决不支持默认 render的问题
    </b-timeline-item>
    <b-timeline-item>
    修复 steps 组件按需引入优化
    </b-timeline-item>
</b-timeline>

### 0.4.7
## `2019-04-18`
<br>
<b-timeline>
    <b-timeline-item>
    新增 Spin组件，区分 Loading 组件【标签引入、自定义内容】
    </b-timeline-item>
    <b-timeline-item>
    新增 Form表单的验证 input、select error样式添加
    </b-timeline-item>
    <b-timeline-item>
    新增 Tag 组件 支持 name 属性
    </b-timeline-item>
    <b-timeline-item>
    新增 Icon 组件 loading 图标
    </b-timeline-item>
    <b-timeline-item>
    修复 Select没有下拉框数据时展示没有数据时的提示
    </b-timeline-item>
    <b-timeline-item>
    优化 Card修改border属性为bordered，测试用例修改
    </b-timeline-item>
    <b-timeline-item>
    优化 Switch 的 value、trueValue、falseValue 新增支持 String、Number 等数据格式
    </b-timeline-item>
    <b-timeline-item>
    优化 Progress 图标引入由图片改成icon
    </b-timeline-item>
    <b-timeline-item>
    优化 Dropdown默认展开位置placement 属性为 bottom
    </b-timeline-item>
</b-timeline>

### 0.4.6
## `2019-04-16`
<br>
<b-timeline>
    <b-timeline-item>
    新增 Badge 徽标组件
    </b-timeline-item>
    <b-timeline-item>
    新增 Drawer添加可拖拽功能
    </b-timeline-item>
    <b-timeline-item>
    新增 Table组件支持自定义页脚和表头
    </b-timeline-item>
    <b-timeline-item>
    修复 Menu、Form、Button、Steps、Tabs、grid 等组件的按需引入不正常的问题
    </b-timeline-item>
    <b-timeline-item>
    优化 Breadcrumb 组件的文档错误修改
    </b-timeline-item>
</b-timeline>

### 0.4.5
## `2019-04-12`
<br>
<b-timeline>
    <b-timeline-item>
    修复 table 当 data无数据时，拖拽和排序表格错位问题
    </b-timeline-item>
    <b-timeline-item>
    修复 modal 删除图标 修复
    </b-timeline-item>
    <b-timeline-item>
    优化 page 电梯以及下拉显示优化
    </b-timeline-item>
    <b-timeline-item>
    新增 table 添加多级表头拖拽编辑支持
    </b-timeline-item>
</b-timeline>

### 0.4.4
## `2019-04-11`
<br>
<b-timeline>
    <b-timeline-item>
    修复 select远程搜索，删除条件后显示不正常问题
    </b-timeline-item>
    <b-timeline-item>
    优化 menu的内部方法引用作调整
    </b-timeline-item>
    <b-timeline-item>
    优化 去掉全局通用utils冗余代码、无效方法、部分组件文档错误优化等
    </b-timeline-item>
    <b-timeline-item>
    新增 图标库更新显示和隐藏图标
    </b-timeline-item>
</b-timeline>

### 0.4.3
## `2019-04-11`
<br>
<b-timeline>
    <b-timeline-item>
    修复 Datepicker clear事件bug修复
    </b-timeline-item>
    <b-timeline-item>
    修复 Input的showpassword显示不正常问题
    </b-timeline-item>
    <b-timeline-item>
    新增 Switch支持loading效果
    </b-timeline-item>
    <b-timeline-item>
    新增 Message支持render功能
    </b-timeline-item>
</b-timeline>

### 0.4.2
## `2019-04-09`
<br>
<b-timeline>
    <b-timeline-item>
    优化 Datapicker适配Input label-width属性
    </b-timeline-item>
    <b-timeline-item>
    新增 Select组件分组功能
    </b-timeline-item>
    <b-timeline-item>
    优化 input的icon属性去掉 由prefix、suffix代替传入icon的type【不兼容更新，详细请看文档】
    </b-timeline-item>
    <b-timeline-item>
    修复 Datepicker、Notice、Table组件 IE10/9 样式优化
    </b-timeline-item>
    <b-timeline-item>
    修复 Loading 展示兼容问题【ie9】、 Modal多层嵌套兼容问题【ie9-10】
    </b-timeline-item>
</b-timeline>

### 0.4.1
## `2019-04-08`
<br>
<b-timeline>
    <b-timeline-item>
        <h3>ie 兼容性处理</h3>
        <ul>
            <li>修复 Transfer IE下样式问题</li>
            <li>修复 table 组件 ie9 - 11显示隐藏列功能兼容问题解决 、滚动条显示不正常问题优化</li>
            <li>修复 Button、Input 样式显示不正常【IE9-11】 </li>
        </ul>
    </b-timeline-item>
    <b-timeline-item>
    <h3>Datepicker【部分不兼容重构】</h3>
    <ul>
        <li>重构 type 和range 合并，由 type 统一控制，type支持date/daterange/datetime/datetimerange/year/month</li>
        <li>重构 format  日期格式化由原先 YYYY-MM-DD 转化为 yyyy-MM-dd</li>
        <li>重构 将 shortcuts、disabledDate合并于 options 属性中，详见文档实例</li>
        <li>新增 支持 multiple 属性，date模式下，可多选日期</li>
        <li>优化 placeholder 不再支持默认显示</li>
    </ul>
    </b-timeline-item>
    <b-timeline-item>
        优化 menu、grid、steps的样式和文档调整
    </b-timeline-item>
    <b-timeline-item>
        优化 Button组件的 Round 修改为 shape 按钮形状，可选值为circle或者不设置
    </b-timeline-item>
    <b-timeline-item>
        新增 table 远程过滤、 默认过滤、远程排序
    </b-timeline-item>
    <b-timeline-item>
        新增 Poptip 组件
    </b-timeline-item>
    <b-timeline-item>
        新增 input新增show-password功能
    </b-timeline-item>
    <b-timeline-item>
        新增 button 新增long 开启后，按钮的长度为 100%
    </b-timeline-item>
    <b-timeline-item>
        修复 input，select的label状态width设置框的宽度
    </b-timeline-item>
    <b-timeline-item>
        修复 select远程搜索 bug
    </b-timeline-item>

</b-timeline>


### 0.4.0
## `2019-03-26`
<br>
<b-timeline>
    <b-timeline-item>
    优化 datepicker 组件时间范围面板联动当月显示=>隔月显示
    </b-timeline-item>
    <b-timeline-item>
    优化 部分组件展示文档不规范调整
    </b-timeline-item>
</b-timeline>

### 0.3.9
## `2019-03-26`
<br>
<b-timeline>
    <b-timeline-item>
    修复 select 默认值不生效的问题
    </b-timeline-item>
</b-timeline>


### 0.3.8
## `2019-03-26`
<br>
<b-timeline>
    <b-timeline-item>
    修复 table 兼容多级表头后，如果 index是固定列的时候显示不正常的问题
    </b-timeline-item>
</b-timeline>

### 0.3.7
## `2019-03-25`
<br>
<b-timeline>
    <b-timeline-item>
    优化 labelTree 兼容 select
    </b-timeline-item>
    <b-timeline-item>
    优化 select、input的width与labelwidth控制的宽度
    </b-timeline-item>
    <b-timeline-item>
    优化 datepicker 统一type传参后错误传参的兼容
    </b-timeline-item>
    <b-timeline-item>
    新增 button的路由跳转支持
    </b-timeline-item>
</b-timeline>

### 0.3.6
## `2019-03-25`
<br>
<b-timeline>
    <b-timeline-item>
    新增 table 多级表头
    </b-timeline-item>
    <b-timeline-item>
    修复 table 先过滤后排序后显示不正常问题
    </b-timeline-item>
</b-timeline>

### 0.3.5
## `2019-03-22`
<br>
<b-timeline>
    <b-timeline-item>
    优化 radio 结构调整
    </b-timeline-item>
    <b-timeline-item>
    修复 select、input的 label 模式屏幕缩放，边框显示不正常问题修复【修改了 width 的使用方式，由输入框的宽度改为整体的宽度】
    </b-timeline-item>
</b-timeline>

### 0.3.4
## `2019-03-20`
<br>
<b-timeline>
    <b-timeline-item>
    修复 radio 动态没有回显的问题
    </b-timeline-item>
    <b-timeline-item>
    修复 page 下拉页动态弹出位置不正常的问题
    </b-timeline-item>
    <b-timeline-item>
    优化 select、input的代码结构\样式显示、支持label状态的行内显示
    </b-timeline-item>
    <b-timeline-item>
    优化 datepicker的width/labelWidth属性
    </b-timeline-item>
    <b-timeline-item>
    优化 tree 适配 select 重构
    </b-timeline-item>
    <b-timeline-item>
    新增 table 扩展功能
    </b-timeline-item>
</b-timeline>

### 0.3.3
## `2019-03-18`
<br>
<b-timeline>
    <b-timeline-item>
    新增 自定义输入框格式【支持销项定制新需求】
    </b-timeline-item>
</b-timeline>

### 0.3.2
## `2019-03-15`
<br>
<b-timeline>
    <b-timeline-item>
    修复 select先赋值value后赋值list的问题
    </b-timeline-item>
    <b-timeline-item>
    优化 select下拉框的下拉更新触发
    </b-timeline-item>
    <b-timeline-item>
    优化 select 文档显示
    </b-timeline-item>
    <b-timeline-item>
    优化 datepicker单一组件扩展支持timepicker/datetimepicker，优化split-panels属性
    </b-timeline-item>
    <b-timeline-item>
    优化 部分组件按需引入报错的问题【Message、input等】
    </b-timeline-item>
</b-timeline>

### 0.3.1
## `2019-03-13`
<br>
<b-timeline>
    <b-timeline-item>
    优化 select、input width默认值设置为100%
    </b-timeline-item>
    <b-timeline-item>
    修复 input-suffix【后缀自定义】的slot
    </b-timeline-item>

</b-timeline>

### 0.3.0
## `2019-03-12`
<br>
<b-timeline>
    <b-timeline-item>
    优化 Button 鼠标放上去之后，边框色视觉效果
    </b-timeline-item>
    <b-timeline-item>
    新增 radio，switch 组件新增 on-click 事件，在change 事件前执行
    </b-timeline-item>
    <b-timeline-item>
    修复 radio组件的边框颜色适配问题
    </b-timeline-item>
</b-timeline>

### 0.2.9
## `2019-03-11`
<br>
<b-timeline>
    <b-timeline-item>
    table 表格添加过滤功能
    </b-timeline-item>
    <b-timeline-item>
    datepicker支持split-panels属性
    </b-timeline-item>
     <b-timeline-item>
        icon 添加过滤、纳税申报新图标
     </b-timeline-item>
</b-timeline>

### 0.2.8
## `2019-03-07`
<br>
<b-timeline>
    <b-timeline-item>
    优化 input与select的placeholder的颜色
    </b-timeline-item>
    <b-timeline-item>
        优化 去掉input在IE浏览器中原生清空icon
    </b-timeline-item>
    <b-timeline-item>
    优化 input设置label与disabled时的样式问题
     </b-timeline-item>
</b-timeline>

### 0.2.7
## `2019-03-06`
<br>
<b-timeline>
    <b-timeline-item>
    修复 select的clearable、input-number的icon显示隐藏在不设置width时的问题
    </b-timeline-item>
</b-timeline>

### 0.2.6
## `2019-03-06`
<br>
<b-timeline>
    <b-timeline-item>
    修复 page 组件动态修改 page属性,没有生效的问题
    </b-timeline-item>
</b-timeline>

### 0.2.5
## `2019-03-05`
<br>
<b-timeline>
    <b-timeline-item>
        修改 select 向外暴露的值  由code、name 修改为 value、label
    </b-timeline-item>
    <b-timeline-item>
        修改 input  在label fixed为false下设置width出现样式问题
    </b-timeline-item>
    <b-timeline-item>
       新增 input-number  加减icon显示隐藏效果
    </b-timeline-item>
    <b-timeline-item>
        datepicker 组件选择月份和年份图标展示不对称的效果优化
    </b-timeline-item>
    <b-timeline-item>
        table 组件支持type='index'的方式写入表格序号,并且完善了 index-info的使用文档
    </b-timeline-item>
</b-timeline>