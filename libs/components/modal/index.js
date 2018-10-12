/**
 * modal
 * author by @zhengshuai
 */
import Modal from './Confirm'

// modal 实例 单一
let modalInstance

const getModalInstance = (render = undefined) => {
    if (!modalInstance) {
        modalInstance = Modal.Instance({
            closable: false,
            maskClosable: false,
            footerHide: true,
            center: false,
            render: render
        })
    }
    return modalInstance
}

// 创建 modal 弹框
const confirmModal = options => {
    const { render } = options
    let instance = getModalInstance(render)
    options.onRemove = () => {
        modalInstance = null
    }
    instance.show(options)
}

// info 提示
Modal.info = options => {
    options.icon = 'info'
    confirmModal(options)
}

// success 提示
Modal.success = options => {
    options.icon = 'success'
    confirmModal(options)
}

// warning 提示
Modal.warning = options => {
    options.icon = 'warning'
    confirmModal(options)
}

// warn 提示
Modal.warning = Modal.warning

// error 提示
Modal.error = options => {
    options.icon = 'error'
    confirmModal(options)
}

// confirm 提示
Modal.confirm = options => {
    options.icon = 'confirm'
    confirmModal(options)
}

Modal.remove = function () {
    if (!modalInstance) {
        return false
    }

    const instance = getModalInstance()

    instance.remove()
}

export default Modal
