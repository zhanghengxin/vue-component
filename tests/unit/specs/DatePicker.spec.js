/*
 * @Author: hanshuai
 * @Date: 2018-11-26 20:32:08
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-30 14:46:26
 */
import { mount } from '@vue/test-utils'
import DatePicker from '&/components/date-picker'
import { TableYear, TableMonth, TableDate, TableTime } from '&/components/date-picker/base'
import { createTest, createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'
const bDatepicker = `${prefix}datepicker`

describe('DatePicker', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <${bDatepicker}></${bDatepicker}>
                </div>
            `
        })
        expect(vm.$el.querySelector(`.${prefix}datepicker`)).toBeTruthy()
    })

    it('confirm', () => {
        vm = createTest(DatePicker, {
            confirm: true
        })
        expect(vm.$el.querySelector(`.${prefix}button`)).toBeTruthy()
    })

    it('confirmText', () => {
        vm = createTest(DatePicker, {
            confirm: true,
            confirmText: 'confirm'
        })
        expect(vm.$el.querySelector(`.${prefix}button`).innerHTML).toContain('confirm')
    })

    it('disabled', () => {
        vm = createTest(DatePicker, {
            disabled: true,
            value: '2018-11-27',
            clearable: true
        })
        // 不显示关闭按钮
        expect(vm.showClearIcon).not.toBeTruthy()
        vm.showPopup()
        expect(vm.popupVisible).not.toBeTruthy()
    })

    it('placeholder', () => {
        vm = createTest(DatePicker, {
            placeholder: '请选择时间啊'
        })
        let input = vm.$el.querySelector('input')
        expect(input.getAttribute('placeholder')).toContain('请选择时间啊')
    })

    it('rangeSeparator', () => {
        vm = createTest(DatePicker, {
            rangeSeparator: '----',
            value: ['2018-11-27', '2018-11-27'],
            range: true
        })
        let input = vm.$el.querySelector('input')
        expect(input.value).toContain('----')
    })

    it('shortcuts', () => {
        vm = createTest(DatePicker, {
            shortcuts: true
        })
        expect(vm.$el.querySelector(`.${prefix}shortcuts-wrapper .${prefix}shortcuts`)).toBeTruthy()
    })

    describe('table', () => {
        it('TableYear', () => {
            vm = mount(TableYear, {
                propsData: {
                    value: new Date(2018, 11, 27),
                    firstYear: 2010
                }
            })

            const cells = vm.findAll('.cell')
            for (let i = 0; i < cells.length; i++) {
                const cell = cells.at(i)
                expect(parseInt(cell.text(), 10)).toBe(2010 + i)
                if (i === 8) {
                    expect(cell.classes()).toContain('actived')
                }
            }
        })

        it('TableTime', () => {
            vm = mount(TableTime, {
                propsData: {
                    value: new Date(2018, 11, 27)
                }
            })
            // test list
            const list = vm.findAll(`.${prefix}time-list`)
            expect(list).toHaveLength(3)
            // test every list
            const hours = list.at(0).findAll('.cell')
            const minutes = list.at(1).findAll('.cell')
            const seconds = list.at(2).findAll('.cell')
            expect(hours).toHaveLength(24)
            expect(minutes).toHaveLength(60)
            expect(seconds).toHaveLength(60)
            // every list click
            hours.at(1).trigger('click')
            minutes.at(1).trigger('click')
            seconds.at(1).trigger('click')
            expect(vm.emitted()).toEqual({
                select: [[new Date(2018, 11, 27, 1)], [new Date(2018, 11, 27, 0, 1)], [new Date(2018, 11, 27, 0, 0, 1)]]
            })
        })

        it('TableMonth', () => {
            vm = mount(TableMonth, {
                propsData: {
                    value: new Date(2018, 11)
                }
            })

            const cells = vm.findAll(`.${prefix}panel-month .cell`)
            expect(cells).toHaveLength(12)

            const month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            for (let i = 0; i < month.length; i++) {
                const cell = cells.at(i)
                expect(cell.text()).toBe(month[i])
            }
        })

        describe('TableDate', () => {
            const tableDate = (i) => it(`firstDayOfWeek: ${i}`, () => {
                vm = mount(TableDate, {
                    propsData: {
                        value: new Date(2018, 4, 1),
                        year: 2018,
                        month: 4,
                        firstDayOfWeek: i
                    }
                })
                const lastMonth = new Date(2018, 3, 30)
                const lastMonthDay = 30
                const lastMonthLength = (lastMonth.getDay() + 7 - i) % 7 + 1
                const curMonthLength = 31

                const tds = vm.findAll(`.${prefix}panel-date td`)
                for (let i = 0; i < 42; i++) {
                    const td = tds.at(i)
                    const text = parseInt(td.text(), 10)
                    const classes = td.classes()
                    if (i < lastMonthLength) {
                        expect(classes).toContain('last-month')
                        expect(text).toBe(lastMonthDay - lastMonthLength + 1 + i)
                    } else if (i < lastMonthLength + curMonthLength) {
                        expect(text).toBe(i - lastMonthLength + 1)
                        expect(classes).toContain('cur-month')
                        if (text === 1) {
                            expect(classes).toContain('actived')
                        }
                    } else {
                        expect(text).toBe(i - lastMonthLength - curMonthLength + 1)
                        expect(classes).toContain('next-month')
                    }
                }
                const week = ['一', '二', '三', '四', '五', '六', '日']
                const firstWeek = vm.find(`.${prefix}date-header`).text()
                expect(firstWeek).toBe(week[i - 1])
            })
            for (let i = 1; i <= 7; i++) {
                tableDate(i)
            }
        })
    })
})
