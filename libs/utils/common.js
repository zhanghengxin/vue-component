/**
 * Created by gaoguoqing on 2018/9/6.
 *
 */
const prefix = 'b-'
export { prefix }

// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

// Find brothers components
export function findBrothersComponents (context, componentName, exceptSelf = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
    })
    let index = res.findIndex(item => item._uid === context._uid)
    if (exceptSelf) res.splice(index, 1)
    return res
}

// Find component downward
export function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null
    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}

/**
* propsInit
* @param {Obj} params
* params.props {Array} props name
* params.config {Obj} props config
*/
export function propsInit (params) {
    let propsInitObj = {}
    for (let val of params.props) {
        propsInitObj[val] = params.config
    }
    return propsInitObj
}
