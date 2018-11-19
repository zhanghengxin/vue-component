export default {
    computed: {
        // 服务器 或 盘
        isDishOrServer () {
            const organizationInfo = JSON.parse(sessionStorage.getItem('organizationInfo'))
            const desposit = organizationInfo.tgType + ''
            const deviceType = organizationInfo.deviceType + ''
            if ((deviceType === '0') || (deviceType === '1' && desposit === '0')) {
                // 服务器 用户
                return 'server'
            } else if (deviceType === '1' && desposit !== '0') {
                // 盘用户
                return 'dish'
            } else {}
        },
        // 是否魔盒
        isMagicBox () {
            const organizationInfo = JSON.parse(sessionStorage.getItem('organizationInfo'))
            const desposit = organizationInfo.tgType + ''
            const deviceType = organizationInfo.deviceType + ''
            if (deviceType === '1' && desposit === '0') {
                return true
            } else {
                return false
            }
        }
    }
}
