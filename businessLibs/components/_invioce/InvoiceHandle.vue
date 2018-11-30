<template>
    <div class="yulan_wrap_right">
        <h3 class="yulan_wrap_right_top">操作</h3>
        <div v-for="item in invoiceState" class="yulan_wrap_right_cont">
            <div class="yulan_wrap_right_btm">
                <h4 class="yulan_wrap_right_btm_h4">
                    <BwIcon :type=" item.code =='0' ? 'chenggong1' : 'shibai1'"
                            :class=" item.code =='0' ? 'iconSuBg' : 'iconErBg'">
                    </BwIcon>
                    <!--<i class="icon iconfont bw-tianjia"></i>-->
                    <span :style=" item.code =='0' ? '' : 'color:#f44336'">{{item.message}}</span>
                    <div v-if="item.times" style="color: Orange">（销方被<span v-text="item.times"></span>个企业标注为黑名单企业，此标注为企业行为，与平台无关）
                    </div>
                </h4>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            invoiceState: {
                type: Array,
                default() {
                    return [{
                        message: "国税局查验通过",
                        code: "0",
                        type: "nationalTax"
                    }]
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .yulan_wrap_right {
        width: 200px;
        float: left;
        border: 1px solid #dedde2;
        font-size: 12px;
        color: #80848f;
        line-height: 18px;
        box-sizing: border-box;
        border-radius: 3px;
        margin-left: 5px;
    }

    .yulan_wrap_right_top {
        height: 50px;
        line-height: 50px;
        padding-left: 15px;
        border-bottom: 1px solid #dedde2;
        font-size: 14px;
    }

    .yulan_wrap_right_cont {
        padding: 8px 8px 0 10px;
    }

    .yulan_wrap_right_btm {
        margin-bottom: 15px;
    }

    .yulan_wrap_right_btm .wuliu {
        color: #6666cc;
        text-decoration: underline;
    }

    .yulan_wrap_right_btm_h4 {
        font-size: 12px;
        color: #495060;
    }

    .yulan_wrap_right_btm_h4:hover {
        color: #ff8f00;
    }

    .yulan_wrap_right_btm p {
        padding-left: 22px;
    }

    .yulan_wrap_right_btm i {
        margin-right: 4px;
    }

    .iconSuBg {
        color: white;
        border-radius: 50%;
        background: #1fca74;
    }

    .iconErBg {
        color: white;
        border-radius: 7px;
        background: #f44336;
    }

    .yulan_wrap_right_cont {
        .icon {
            font-size: 14px;
        }
    }
</style>