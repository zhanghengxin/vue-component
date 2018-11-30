# Circle 进度环

### 基础用法
<div class="example">
    <div class="example-box">
        <div>
            <b-circle :percent="60" :radius="48" :strokew="6"><span>60%</span></b-circle> 
            <b-circle :percent="50" :radius="46" :strokew="6" probarc="#80d2dd" textc="#80d2dd"><span>50%</span></b-circle>
            <b-circle :percent="40">
            		<div>
            			<div>消费人群</div>
        				<div>40%</div>
            		</div>
            </b-circle>
        </div>
    </div>

::: code
```html
    <div>
        <b-circle :percent="60" :radius="46" :strokew="6"><span>60%</span></b-circle> 
        <b-circle :percent="50" :radius="46" :strokew="6" probarc="#80d2dd" textc="#80d2dd">
            <span>60%</span>
        </b-circle>
        <b-circle :percent="40">
            <div>
                <div>消费人群</div>
                <div>40%</div>
            </div>
        </b-circle>
    </div>
```
:::
</div>

### 尺寸
<div class="example">
    <div class="example-box">
        <div>
        		<b-circle size="small"></b-circle>
            <b-circle size="normal" :percent="40">
	            <div>
	                <div>40%</div>
	                <div>总占比</div>
	            </div>            
            </b-circle>
            <b-circle size="big"></b-circle>
        </div>
    </div>

::: code
```html
    <div>
        <b-circle size="small"></b-circle>
        <b-circle size="normal" :percent="40">
            <div>
                <div>消费人群</div>
                <div>40%</div>
            </div>        
        </b-circle>
        <b-circle size="big"></b-circle>
    </div>
```
:::
</div>

### 配色
<div class="example">
    <div class="example-box">
        <div>
            <b-circle comatch="essco"></b-circle>
            <b-circle comatch="secco" :percent="40">
            		<div>
            			<div>消费人群</div>
        				<div>40%</div>
            		</div>
            </b-circle>
            <b-circle comatch="neuco"></b-circle>
        </div>
    </div>

::: code
```html
    <div>
        <b-circle comatch="essco"></b-circle>
        <b-circle comatch="secco" :percent="40">
            <div>
                <div>消费人群</div>
                <div>40%</div>
            </div>        
        </b-circle>
        <b-circle comatch="neuco"></b-circle>
    </div>
```
:::
</div>

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size   | 尺寸      | string  |  normal、big、small  |  -    | 
| comatch  | 配色      | string  |  essco、secco、neuco  |   essco    |
| radius   | 半径      | number  |    -  |   50    |
| strokew  | 环宽      | number  |    -  |   5    |
| percent  | 百分数    | number   |    -   |  30     |
| strokec  | 圆环颜色   | string  |     -   |   #eceef2    |
| probarc  | 进度条颜色 | string  |      -  |    -    |
| textc    | 文字颜色  | string   |     -  |    #495060   |
