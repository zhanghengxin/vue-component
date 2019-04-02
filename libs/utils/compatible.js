/**
 * Created by gaoguoqing on 2019/3/11.
 *
 */

function isIe () {
    const inBrowser = typeof window !== 'undefined'
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    return UA && /msie|trident/.test(UA)
}

export function preventDefault (event) {
    if (isIe()) { // 判断IE浏览器
        window.event.returnValue = false
    } else {
        event.preventDefault()
    }
}

(function () {
    var lastTime = 0
    var vendors = ['ms', 'moz', 'webkit', 'o']
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame']
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime()
            var timeToCall = Math.max(0, 16 - (currTime - lastTime))
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
    if (!('classList' in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
                var self = this
                
                function update (fn) {
                    return function (value) {
                        var classes = self.className.split(/\s+/g),
                            index = classes.indexOf(value)
                        fn(classes, index, value)
                        self.className = classes.join(' ')
                    }
                }
                
                return {
                    add: update(function (classes, index, value) {
                        if (!~index) classes.push(value)
                    }),
                    
                    remove: update(function (classes, index) {
                        if (~index) classes.splice(index, 1)
                    }),
                    
                    toggle: update(function (classes, index, value) {
                        if (~index) {
                            classes.splice(index, 1)
                        } else {
                            classes.push(value)
                        }
                    }),
                    
                    contains: function (value) {
                        return !!~self.className.split(/\s+/g).indexOf(value)
                    },
                    
                    item: function (i) {
                        return self.className.split(/\s+/g)[i] || null
                    }
                }
            }
        })
    }
}())
