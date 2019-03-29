/**
 * Created by gaoguoqing on 2019/2/14.
 *
 */
import { createTest, createVue, destroyVM } from '../utils'
import { mount } from '@vue/test-utils'
import TableComponent from '&/components/table'
import { prefix } from '&/utils/common'

const tableCls = `${prefix}table`
const columns = [
    {
        title: 'Name',
        key: 'name',
        width: 200
    },
    {
        title: 'Age',
        key: 'age',
        width: 400
    }
]
const fixedColumns = [
    {
        title: 'Name',
        key: 'name',
        fixed: 'left',
        width: 200
    },
    {
        title: 'Age',
        key: 'age',
        width: 400
    }
]
const checkColumns = [
    {
        title: 'selection',
        type: 'selection',
        fixed: 'left',
        width: 80,
        align: 'center'
    },
    {
        title: 'Name',
        key: 'name',
        width: 200
    }
]
const data = [
    {
        name: '欧阳',
        age: 12,
        sex: '男'
    },
    {
        name: '青蛙',
        age: 18,
        sex: '男'
    }
]

describe('table', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('create', () => {
        vm = mount(TableComponent, {
            propsData: {
                data: data,
                columns: columns
            }
        })
        expect(vm.contains(`.${tableCls}`)).toBe(true)
    })
    it('border', () => {
        vm = mount(TableComponent, {
            propsData: {
                data: data,
                border: true,
                columns: columns
            }
        })
        expect(vm.contains(`.${tableCls}-border`)).toBe(true)
    })
    it('stripe', () => {
        vm = mount(TableComponent, {
            propsData: {
                data: data,
                stripe: true,
                columns: columns
            }
        })
        expect(vm.contains(`.${tableCls}-stripe`)).toBe(true)
    })
    it('height&width', () => {
        vm = mount(TableComponent, {
            propsData: {
                data: data,
                columns: columns,
                height: 200,
                width: 1000
            }
        })
        expect(vm.element.style.height).toBe('200px')
        expect(vm.element.style.width).toBe('1000px')
    })
    it('fixed', () => {
        vm = createTest(TableComponent, {
            data: data,
            columns: fixedColumns
        })
        const elm = vm.$el
        expect(elm.querySelector(`.${tableCls}-fixed`)).toBeTruthy()
    }, true)
    it('selection', done => {
        let result
        let length
        vm = createVue({
            template: `
        <${tableCls}
            :data="data"
            :columns="columns"
            @on-select="handleSelect"
            @on-select-all="handleSelectAll"
            @on-select-all-cancel="handleSelectAllCancel"
            @on-select-cancel="handleCancel">
        </${tableCls}>
      `,
            data () {
                return {
                    data: data,
                    columns: checkColumns
                }
            },
            methods: {
                handleSelect (selection, row) {
                    result = row
                    length = selection.length
                },
                handleCancel (selection) {
                    length = selection.length
                },
                handleSelectAll (selection) {
                    length = selection.length
                },
                handleSelectAllCancel () {
                    length = 0
                }
            }
        }, true)
        const elm = vm.$el
        expect(elm.querySelector(`.${prefix}checkbox`)).toBeTruthy()
        // on-select
        vm.$el.querySelectorAll(`.${prefix}checkbox-warpper`)[1].click()
        expect(result.age).toBe(12)
        expect(length).toBe(1)
        // on-select-cancel
        vm.$el.querySelectorAll(`.${prefix}checkbox-warpper`)[1].click()
        expect(length).toBe(0)
        // on-selection-all
        vm.$el.querySelectorAll(`.${prefix}checkbox-warpper`)[0].click()
        expect(length).toBe(2)
        // on-selection-all-cancel
        vm.$el.querySelectorAll(`.${prefix}checkbox-warpper`)[0].click()
        expect(length).toBe(0)
        done()
    })
    it('sortable', done => {
        let key
        let order
        vm = createVue({
            template: `
        <${tableCls}
            :data="data"
            :columns="columns"
            @on-sort-change="handleSort">
        </${tableCls}>
      `,
            data () {
                return {
                    data: data,
                    columns: [
                        {
                            title: 'Name',
                            key: 'name',
                            width: 200
                        },
                        {
                            title: 'Age',
                            key: 'age',
                            sortable: true,
                            width: 300
                        }
                    ]
                }
            },
            methods: {
                handleSort (options) {
                    key = options.key
                    order = options.order
                }
            }
        }, true)
        const elm = vm.$el
        expect(elm.querySelector(`.${tableCls}-sort-desc`)).toBeTruthy()
        // on-sort-change
        vm.$el.querySelectorAll(`.${tableCls}-sort-desc`)[0].click()
        expect(key).toBe('age')
        expect(order).toBe('desc')
        done()
    })

    it('className&cellClass', () => {
        vm = createVue({
            template: `<${tableCls} :data="data" :columns="columns"></${tableCls}>`,
            data () {
                return {
                    data: [
                        {
                            name: '欧阳',
                            age: 12,
                            sex: '男',
                            hobby: 'Swimming',
                            pets: 'dog',
                            _cellClass: {
                                age: 'test-table-cell'
                            },
                            occupation: 'Doctor'
                        }
                    ],
                    columns: [
                        {
                            title: 'Age',
                            key: 'age',
                            width: 300,
                            className: 'test-table-columns'
                        }
                    ]
                }
            }
        }, true)
        const elm = vm.$el
        expect(elm.querySelector(`.test-table-columns`)).toBeTruthy()
        expect(elm.querySelector(`.test-table-cell`)).toBeTruthy()
    })

    it('highlightRow', done => {
        let result
        vm = createVue({
            template: `
                <${tableCls}
                    highlightRow
                    :data="data"
                    @on-row-click="handleClick"
                    :columns="columns">
                </${tableCls}>`,
            data () {
                return {
                    data: data,
                    columns: columns
                }
            },
            methods: {
                handleClick (row) {
                    result = row
                }
            }
        }, true)
        const elm = vm.$el
        expect(elm.querySelector(`tr`)).toBeTruthy()
        // on-row-click
        vm.$el.querySelectorAll(`tr`)[1].click()
        expect(result.age).toBe(12)
        done()
    })
})
