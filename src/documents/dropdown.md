# Dropdown下拉菜单
常用的操作按钮
-----
### 基础用法
使用```type``` 属性来定义Button 的样式

<div class="example">
    <div class="example-box">
            <Dropdown>
                <button>下拉</button>
                <DropdownMenu slot="list">
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                </DropdownMenu>
            </Dropdown>
    </div>

::: code
```html
           <Dropdown>
                <button>下拉</button>
                <DropdownMenu slot="list">
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                    <DropdownItem>1111</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
           </Dropdown>
```
:::
</div>
