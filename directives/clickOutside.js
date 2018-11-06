export default {
    bind (el, binding, vnode) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false
            }
            if (binding.expression) {
                binding.value(e)
            }
        }
        el._vueClickOutSide_ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    unbind (el, binding) {
        document.removeEventListener('click', el._vueClickOutSide_)
        delete el._vueClickOutSide_
    }
}
