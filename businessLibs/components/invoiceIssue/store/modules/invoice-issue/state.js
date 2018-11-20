/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: states
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/3/1 上午10:11
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/3/1 上午10:11
 *
 * --------------------------------------------------------------------------- *
 */

import { getDefaultCurrentData } from '../../stateHelper'

const initState = {
    // 客户分类
    customerCategory: [],
    // 客户选择列表
    customerList: [],
    // 商品分类
    goodsCategory: [],
    // 商品列表
    goodsList: [],
    // 负数清单列表
    negativeList: [],
    // 是否开具完成
    isIssue: false,
    // 显示选择客户的弹层
    showCustomerSelector: false,
    // 当前操作的是购方还是销方
    currentCustomerType: '',
    // 显示商品选择弹层
    showGoodsSelector: false,
    // 添加商品的弹层
    showAddGoods: false,
    // 展示差额设置弹层
    showDifference: false,
    // 显示折扣弹层
    showDiscountSelector: false,
    // 显示负数开票模态框 是否点击下一步
    showCommonNeigativeNext: false,
    //   defaultDetailTpl: getDefaultDetailTpl(),
    // 是否负数票
    isNegative: false,
    // 显示 清单列表弹层
    showListGoodsSelector: false,
    // 编辑复制 页面 商品行 不重新 计算
    showCommonCopyEdit: false,
    // 负票开具 是否存在数据
    isExistOriginalData: true,
    // 复制页面 点击含税不含税 开启 重新计算
    isOpenReComputed: false,
    // 红字信息表编号 弹层
    showRedInfoNoSelector: false,
    // 编辑的时候带过来的 信息
    editOtherInfo: {},
    // 是否批量编辑自动暂存
    isAutoStage: false,
    currentData: getDefaultCurrentData()
}

export default initState
