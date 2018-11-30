/**
 * --------------------------------------------------------------------------- *
 *
 * @Project: BWCloudPrepose-catering
 * @FileName: helper
 * @Dependence: --
 * @Description: --
 * @CreatedBy: zhangliao
 * @CreateDate: 2018/3/1 上午11:45
 * @LastModifiedBy: zhangliao
 * @LastModifiedDate: 2018/3/1 上午11:45
 *
 * --------------------------------------------------------------------------- *
 */

import typeUtil from '../utils/typeUtil'
import globalStore from '../store/index'

export const keyUtil = {
    capitalize (str) {
        str += ''
        return str.charAt(0).toUpperCase() + str.substring(1)
    },
    getGetterName (keyName) {
        return `get${this.capitalize(keyName)}`
    },
    getSetterName (keyName) {
        return `set${this.capitalize(keyName)}`
    },
    getChangeName (keyName) {
        return `change${this.capitalize(keyName)}`
    }
}

const paramPolyfill = (keyList) => {
    let targetKeyList = []
    if (typeUtil.isArray(keyList)) {
        targetKeyList = keyList
    } else if (typeUtil.isString(keyList)) {
        targetKeyList.push(keyList)
    }
    return targetKeyList
}

/**
 * 一次性生成多个getter
 * 比如email => getEmail
 * @param keyList 字段名，可以为数组或者单个字符串
 * @param baseObjGetter 获取要更改属性值的对象的 方法, 确保重写了对象后也能正确赋值
 * @returns {{}}
 */
export const generateGetters = (keyList, baseObjGetter) => {
    let targetKeyList = paramPolyfill(keyList)

    let result = {}
    targetKeyList.forEach(key => {
        result[keyUtil.getGetterName(key)] = (state, getters) => {
            const baseObj = baseObjGetter(state)
            return baseObj[key]
        }
    })

    return result
}

/**
 * 一次性生成多个mutation
 * @param keyList 字段名，可以为数组或者单个字符串
 * @param baseObjGetter 获取要更改属性值的对象的 方法，确保重写了对象后也能正确赋值
 */
export const generateMutations = (keyList, baseObjGetter) => {
    let targetKeyList = paramPolyfill(keyList)
    let result = {}
    targetKeyList.forEach(key => {
        result[keyUtil.getChangeName(key)] = (state, payload) => {
            const baseObj = baseObjGetter(state)
            if (['sellerInfo'].includes(key)) {
            }
            baseObj[key] = payload
            return baseObj[key]
        }
    })
    return result
}

/**
 * 生成多个带setter的计算属性
 * 比如 email => {
 *    email:{
 *      get(){}.
 *      set(value){}
 *    }
 * }
 * @param keyList 字段名，可以为数组或者单个字符串
 * @param baseObjGetter 获取要更改属性值的对象的 方法，确保重写了对象后也能正确赋值
 * @param store store对象
 * @returns {{}}
 */

export const generateComputed = (keyList, baseObjGetter, store = globalStore) => {
    let targetKeyList = paramPolyfill(keyList)

    let result = {}
    targetKeyList.forEach(key => {
        if (typeUtil.isString(key)) {
            result[key] = {
                get () {
                    const baseObj = baseObjGetter(store.state)
                    return baseObj[key]
                },
                set (value) {
                    store.commit(keyUtil.getChangeName(key), value)
                }
            }
        } else if (typeUtil.isObject(key)) {
            let {propName, fixedValue} = key
            result[propName] = {
                get () {
                    const baseObj = baseObjGetter(store.state)
                    return baseObj[propName]
                },
                set (value) {
                    store.commit(keyUtil.getChangeName(propName), fixedValue)
                }
            }
        }
    })

    return result
}

export default {
    keyUtil,
    generateGetters,
    generateComputed,
    generateMutations
}
