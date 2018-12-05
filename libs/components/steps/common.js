/**
 * @author 靳宏灿
 * @date 2018/9/10
 * @Description: steps的公共信息
 */

// steps 的状态表 顺序不能随便动
const statusList = ['wait', 'process', 'finish', 'error', 'single']

// steps状态对应的class
const getStatusClass = (status = 'wait') => {
    return `b-step-status-${status}`
}

export default {
    statusList, getStatusClass
}
