<template>
    <div :class="[prefixCls+'-box']">
        <div :class="[prefixCls+'-title']">
            <span><i>机动车销售统一发票</i></span>
        </div>
        <table :class="[prefixCls+'-table']">
            <tbody>
                <tr height="30">
                    <td :class="[prefixCls+'-table-td']">发票代码：{{invoiceData.invoiceCode}}</td>
                    <td :class="[prefixCls+'-table-td']">发票号码：{{invoiceData.invoiceNo}}</td>
                    <td :class="[prefixCls+'-table-td']">开票日期：{{invoiceData.invoiceDate}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import { prefix } from '../../../utils/common'

const prefixCls = prefix + 'invoice'
export default {
    name: '',
    data () {
        return {
            prefixCls: prefixCls
        }
    },
    props: {
        invoiceData: {
            type: Object,
            default: function () {
                return {}
            }
        }
    }
}
</script>
