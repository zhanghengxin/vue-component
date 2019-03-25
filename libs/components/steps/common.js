/**
 * @author 靳宏灿
 * @date 2018/9/10
 * @Description: steps的公共信息
 */
import { prefix } from '../../utils/common'

// steps 的状态表 顺序不能随便动
const statusList = ['wait', 'process', 'finish', 'error', 'single']

// steps状态对应的class
const getStatusClass = (status = 'wait') => {
    return `${prefix}step-status-${status}`
}

const stepsName = `${prefix}steps`
const stepName = `${prefix}step`

export default {
    statusList, getStatusClass, stepsName, stepName
}
