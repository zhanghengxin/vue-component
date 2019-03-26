更新日志
### 0.3.8
## `2019-03-28`
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