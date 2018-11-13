<template>
    <table :class="[prefixCls+'-table']" style="border: none;">
        <tr>
            <td width="30%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                货物或应税劳务、服务名称
            </td>
            <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                规格型号
            </td>
            <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                单位
            </td>
            <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                数量
            </td>
            <td width="10%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                单价
            </td>
            <td width="15%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                金额
            </td>
            <td width="5%" :class="[prefixCls+'-table-detail',prefixCls+'-table-column']">
                税率
            </td>
            <td width="15%" :class="[prefixCls+'-table-column']">
                税额
            </td>
        </tr>
        <tr v-for="(item,index) in detailData">
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                {{item.goodsName}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                {{item.goodsSpecification}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-left']">
                {{item.goodsUnit}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                {{item.goodsQuantity}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                {{item.goodsPrice}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                {{item.goodsTotalPrice}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                {{getGoodsTaxRate(item.goodsTaxRate)}}
            </td>
            <td :class="[prefixCls+'-table-detail',prefixCls+'-table-right']">
                {{item.goodsTotalTax}}
            </td>
        </tr>
    </table>
</template>

<!--<tr v-for="item in goodsList" v-if="ifMoreThan8Records">-->
<!--<td class="align_left borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsName"> </span></td>-->
<!--<td class="align_left borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsSpecification"></span>-->
<!--</td>-->
<!--<td class="align_left borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsUnit"></span>-->
<!--</td>-->
<!--<td class="align_right borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsQuantity"></span>-->
<!--</td>-->
<!--<td class="align_right borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsPrice"></span>-->
<!--</td>-->
<!--<td class="align_right borderRight">-->
<!--<span class="content_td_blue" v-text="item.goodsTotalPrice"></span>-->
<!--</td>-->
<!--<td class="align_right borderRight">-->
<!--<span class="content_td_blue"-->
<!--v-text="getGoodsTaxRate(item.goodsTaxRate)"></span>-->
<!--</td>-->
<!--<td class="align_right">-->
<!--<span class="content_td_blue" v-text="item.goodsTotalTax"></span>-->
<!--</td>-->
<!--</tr>-->


<script>
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'invoice'

export default {
    name: 'invoice-detail',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        detailData: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods: {
        getGoodsTaxRate (goodsTaxRate) {
            if (goodsTaxRate) {
                return goodsTaxRate * 100 + '%'
            } else {
                return '0%'
            }
        }
    }
}
</script>

