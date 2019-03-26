export const generateId = function () {
    return Math.floor(Math.random() * 10000)
}
function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = context.$parent
    let name = parent.$options._componentTag
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options._componentTag
    }
    return parent
}

export {findComponentUpward}
