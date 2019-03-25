/**
 * Created by gaoguoqing on 2019/3/11.
 *
 */

function isIe () {
    const inBrowser = typeof window !== 'undefined'
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    return UA && /msie|trident/.test(UA)
}

// Find component downward
export function preventDefault (event) {
    if (isIe()) { // 判断IE浏览器
        window.event.returnValue = false
    } else {
        event.preventDefault()
    }
}
