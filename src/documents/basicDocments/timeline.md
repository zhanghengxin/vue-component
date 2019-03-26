# Timeline 时间轴

### 基本用法

<div class='example'>
    <div class='example-box'>
        <b-timeline>
            <b-timeline-item>
                <p class="time">2003年</p>
                <p class="description">国家信息安全工程技术研究中心受国家税务总局委托，承担税务系统信息安全体系建设</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2006年</p>
                <p class="description">受国家税务总局委托，承建了国家税务总局百望呼叫中心推出了税控盘解决方案，覆盖了全国交通运输业和机动车销售行业20多万家</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2012年</p>
                <p class="description">承担“营改增”税制改革项目，启动交通运输业、部分现代服务业、铁路、邮政等行业营业税改征增值税试点，在全国36省市全面实施</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2014年</p>
                <p class="description">行业扩围和专票打通，同年成立百望金赋，建立了全国38个分公司、630个服务站、8000人的服务团队，全国“营改增”试点，推出了税控服务器的解决方案</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2015年5月4日</p>
                <p class="description">在北京正式成立。截止到2015年上半年发行了200万套税控装置百望股份中标工商银行、农业银行、交通银行、浙商银行、锦州银行营改增项目</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2016年</p>
                <p class="description">全面助力金融保险行业营改增，实现财税票一体化百望云平台上线，与阿里巴巴、万达、联想等行业领袖签订战略合作，推动“互联网+税务”生态发展</p>
            </b-timeline-item>
        </b-timeline>
    </div>
    
::: code
```html
    <template>
        <b-timeline>
            <b-timeline-item>
                <p class="time">2003年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2006年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2012年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2014年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2015年5月4日</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2016年</p>
                <p class="description"></p>
            </b-timeline-item>
        </b-timeline>
    </template>
```
:::
</div>

### 定义时间轴点颜色

<div class='example'>
    <div class='example-box'>
        <b-timeline>
            <b-timeline-item color='red'>
                <p class="time">2003年</p>
                <p class="description">国家信息安全工程技术研究中心受国家税务总局委托，承担税务系统信息安全体系建设</p>
            </b-timeline-item>
            <b-timeline-item color='orange'>
                <p class="time">2006年</p>
                <p class="description">受国家税务总局委托，承建了国家税务总局百望呼叫中心推出了税控盘解决方案，覆盖了全国交通运输业和机动车销售行业20多万家</p>
            </b-timeline-item>
            <b-timeline-item color='green'>
                <p class="time">2012年</p>
                <p class="description">承担“营改增”税制改革项目，启动交通运输业、部分现代服务业、铁路、邮政等行业营业税改征增值税试点，在全国36省市全面实施</p>
            </b-timeline-item>
            <b-timeline-item color='blue'>
                <p class="time">2014年</p>
                <p class="description">行业扩围和专票打通，同年成立百望金赋，建立了全国38个分公司、630个服务站、8000人的服务团队，全国“营改增”试点，推出了税控服务器的解决方案</p>
            </b-timeline-item>
            <b-timeline-item color='green'>
                <p class="time">2015年5月4日</p>
                <p class="description">在北京正式成立。截止到2015年上半年发行了200万套税控装置百望股份中标工商银行、农业银行、交通银行、浙商银行、锦州银行营改增项目</p>
            </b-timeline-item>
            <b-timeline-item color='#ccc'>
                <p class="time">2016年</p>
                <p class="description">全面助力金融保险行业营改增，实现财税票一体化百望云平台上线，与阿里巴巴、万达、联想等行业领袖签订战略合作，推动“互联网+税务”生态发展</p>
            </b-timeline-item>
        </b-timeline>
    </div>
    
::: code
```html
    <template>
        <b-timeline>
            <b-timeline-item color='red'>
                <p class="time">2003年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item color='orage'>
                <p class="time">2006年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item color='green'>
                <p class="time">2012年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item color='blue'>
                <p class="time">2014年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item color='green'>
                <p class="time">2015年5月4日</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item color='#ccc'>
                <p class="time">2016年</p>
                <p class="description"></p>
            </b-timeline-item>
        </b-timeline>
    </template>
```
:::
</div>

### 最后一个

<div class='example'>
    <div class='example-box'>
        <b-timeline pending>
            <b-timeline-item>
                <p class="time">2003年</p>
                <p class="description">国家信息安全工程技术研究中心受国家税务总局委托，承担税务系统信息安全体系建设</p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2006年</p>
                <p class="description">受国家税务总局委托，承建了国家税务总局百望呼叫中心推出了税控盘解决方案，覆盖了全国交通运输业和机动车销售行业20多万家</p>
            </b-timeline-item>
            <b-timeline-item>
                <a href="#">查看更多</a>
            </b-timeline-item>
        </b-timeline>
    </div>
    
::: code
```html
    <template>
        <b-timeline pending>
            <b-timeline-item>
                <p class="time">2003年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <p class="time">2006年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <a href="#">查看更多</a>
            </b-timeline-item>
        </b-timeline>
    </template>
```
:::
</div>

### 自定义时间轴点

<div class='example'>
    <div class='example-box'>
        <b-timeline>
            <b-timeline-item>
                <b-icon type='dianpiao' slot='dot'></b-icon>
                <p class="time">2003年</p>
                <p class="description">国家信息安全工程技术研究中心受国家税务总局委托，承担税务系统信息安全体系建设</p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='juanshi' slot='dot'></b-icon>
                <p class="time">2006年</p>
                <p class="description">受国家税务总局委托，承建了国家税务总局百望呼叫中心推出了税控盘解决方案，覆盖了全国交通运输业和机动车销售行业20多万家</p>
            </b-timeline-item>
            <b-timeline-item>   
                <b-icon type='pupiao' slot='dot'></b-icon>
                <p class="time">2012年</p>
                <p class="description">承担“营改增”税制改革项目，启动交通运输业、部分现代服务业、铁路、邮政等行业营业税改征增值税试点，在全国36省市全面实施</p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='huoyun' slot='dot'></b-icon>
                <p class="time">2014年</p>
                <p class="description">行业扩围和专票打通，同年成立百望金赋，建立了全国38个分公司、630个服务站、8000人的服务团队，全国“营改增”试点，推出了税控服务器的解决方案</p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='jidongche' slot='dot'></b-icon>
                <p class="time">2015年5月4日</p>
                <p class="description">在北京正式成立。截止到2015年上半年发行了200万套税控装置百望股份中标工商银行、农业银行、交通银行、浙商银行、锦州银行营改增项目</p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='zhuanpiao' slot='dot'></b-icon>
                <p class="time">2016年</p>
                <p class="description">全面助力金融保险行业营改增，实现财税票一体化百望云平台上线，与阿里巴巴、万达、联想等行业领袖签订战略合作，推动“互联网+税务”生态发展</p>
            </b-timeline-item>
        </b-timeline>
    </div>
    
::: code
```html
    <template>
        <b-timeline>
            <b-timeline-item>
                <b-icon type='dianpiao' slot='dot'></b-icon>
                <p class="time">2003年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='juanshi' slot='dot'></b-icon>
                <p class="time">2006年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>   
                <b-icon type='pupiao' slot='dot'></b-icon>
                <p class="time">2012年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='huoyun' slot='dot'></b-icon>
                <p class="time">2014年</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='jidongche' slot='dot'></b-icon>
                <p class="time">2015年5月4日</p>
                <p class="description"></p>
            </b-timeline-item>
            <b-timeline-item>
                <b-icon type='zhuanpiao' slot='dot'></b-icon>
                <p class="time">2016年</p>
                <p class="description"></p>
            </b-timeline-item>
        </b-timeline>
    </template>
```
:::
</div>

<style scoped>
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .description{
        padding-left: 5px;
    }
</style>

### Timeline props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| pending | 最后一个节点是否为幽灵节点 | Boolean | `true` `false` | true |

### TimelineItem props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| color | 时间轴点颜色，可自定义色值 | String | `blue` `red` `green` `orange` | blue |

### Slots
| 事件名 | 说明 |
| ---- | ---- |
| dot | 自定义时间轴点图标等 |
| | 基本内容 |
