# Circle 进度环

### 基础用法
<div class="example">
    <div class="example-box">
        <div>
            <bw-circle :percent="60" :radius="46" :strokew="6"><span class="foreigntext">60%</span></bw-circle> 
            <bw-circle :percent="50" :radius="46" :strokew="6" probarc="#80d2dd" textc="#80d2dd"><span class="foreigntext">50%</span></bw-circle>
            <bw-circle :percent="40">
            		<div class='foreigntext'>
            			<div>消费人群</div>
        				<div>40%</div>
            		</div>
            </bw-circle>
        </div>
    </div>

::: code
```html
    <div>
        <bw-circle :percent="60" :radius="46" :strokew="6"><span class="foreigntext">60%</span></bw-circle> 
        <bw-circle :percent="50" :radius="46" :strokew="6" probarc="#80d2dd" textc="#80d2dd">
            <span class="foreigntext">60%</span>
        </bw-circle>
        <bw-circle :percent="40">
            <div class='foreigntext'>
                <div>消费人群</div>
                <div>40%</div>
            </div>
        </bw-circle>
    </div>
```
:::
</div>

### 尺寸
<div class="example">
    <div class="example-box">
        <div>
        		<bw-circle size="small"></bw-circle>
            <bw-circle size="normal" :percent="40">
	            <div class='foreigntext'>
	                <div>40%</div>
	                <div>总占比</div>
	            </div>            
            </bw-circle>
            <bw-circle size="big"></bw-circle>
        </div>
    </div>

::: code
```html
    <div>
        <bw-circle size="small"></bw-circle>
        <bw-circle size="normal" :percent="40">
            <div class='foreigntext'>
                <div>消费人群</div>
                <div>40%</div>
            </div>        
        </bw-circle>
        <bw-circle size="big"></bw-circle>
    </div>
```
:::
</div>

### 配色
<div class="example">
    <div class="example-box">
        <div>
            <bw-circle comatch="essco"></bw-circle>
            <bw-circle comatch="secco" :percent="40">
            		<div class='foreigntext'>
            			<div>消费人群</div>
        				<div>40%</div>
            		</div>
            </bw-circle>
            <bw-circle comatch="neuco"></bw-circle>
        </div>
    </div>

::: code
```html
    <div>
        <bw-circle comatch="essco"></bw-circle>
        <bw-circle comatch="secco" :percent="40">
            <div class='foreigntext'>
                <div>消费人群</div>
                <div>40%</div>
            </div>        
        </bw-circle>
        <bw-circle comatch="neuco"></bw-circle>
    </div>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size   | 尺寸      | string  |  normal、big、small  |  normal     | 
| comatch  | 配色      | string  |  essco、secco、neuco  |   essco    |
| radius   | 半径      | number  |    |   50    |
| strokew  | 环宽      | number  |    |   5    |
| strokec  | 圆环颜色   | string  |    |  #eceef2    |
| probarc  | 进度条颜色 | string  |    |  #43a3fb    |
| percent  | 百分数    | number   |    |  30     |
| textc    | 文字颜色  | string   |    |  #2db7f5    |
| foreigntext    | 进度环内内容水平垂直居中  |    |    |      |
