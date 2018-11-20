// 获取开票 时 可用税率
export default {
    data () {
        return {
            taxRates: []
        }
    },
    created () {
        this.getTaxRates()
    },
    methods: {
        getTaxRates () {
            // let data = {
            //     dictType: 'KYSL'
            // }
            // this.http.userPost('/sys/getSysDict', data).then(resp => {
            //     let res = resp.data ? resp.data.results : []
            //     this.taxRates = res.map(item => {
            //         return {
            //             label: item.dictName,
            //             value: +item.dictCode
            //         }
            //     })
            // })
            this.taxRates = [
                {label: '3%', value: 0.03}
            ]
        }
    }
}
