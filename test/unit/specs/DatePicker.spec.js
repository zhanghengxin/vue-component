/*
 * @Author: hanshuai
 * @Date: 2018-11-26 20:32:08
 * @Last Modified by: hanshuai@baiwang.com
 * @Last Modified time: 2019-01-08 18:44:24
 */
import DatePicker from '&/components/date-picker'
import { TableYear, TableMonth, TableDate, TableTime } from '&/components/date-picker/base'
import { createTest, createVue, destroyVM } from '../utils'
import { prefix } from '&/utils/common'

describe('DatePicker', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })

    it('confirm', () => {
        vm = createTest(DatePicker, {
            confirm: true
        })
        expect(vm.$el.querySelector(`.${prefix}datepicker-btn-confirm`)).to.exist
    })

    it('confirmText', () => {
        vm = createTest(DatePicker, {
            confirm: true,
            confirmText: 'confirm'
        })
        expect(vm.$el.querySelector(`.${prefix}datepicker-btn-confirm`)).to.property('textContent').to.include('confirm')
    })

    it('disabled', () => {
        vm = createTest(DatePicker, {
            disabled: true,
            value: new Date(2018, 11, 27),
            clearable: true
        })
        // 不显示关闭按钮
        expect(vm.showClearIcon).to.be.false
        vm.showPopup()
        expect(vm.popupVisible).to.be.false
    })

    it('placeholder', () => {
        vm = createTest(DatePicker, {
            placeholder: '请选择时间啊'
        })
        let input = vm.$el.querySelector('input')
        expect(input.getAttribute('placeholder')).to.include('请选择时间啊')
    })

    it('rangeSeparator', () => {
        vm = createTest(DatePicker, {
            rangeSeparator: '----',
            value: [new Date('2018-11-27'), new Date('2018-11-27')],
            range: true
        })
        let input = vm.$el.querySelector('input')
        expect(input.value).to.include('----')
    })

    it('shortcuts', () => {
        vm = createTest(DatePicker, {
            shortcuts: true
        })
        expect(vm.$el.querySelector(`.${prefix}shortcuts-wrapper .${prefix}shortcuts`)).to.exist
    })

    describe('table', () => {
        it('TableYear', () => {
            vm = createTest(TableYear, {
                value: new Date(2018, 11, 27),
                firstYear: 2010
            })
            let cells = vm.$el.querySelectorAll('.cell')
            for (let i = 0; i < cells.length; i++) {
                let cell = cells[i]
                expect(cell.innerText).to.include(2010 + i)
                if (i === 8) {
                    expect(cell.getAttribute('class')).to.include('actived')
                }
            }
        })

        it('TableTime', () => {
            vm = createTest(TableTime, {
                value: new Date(2018, 11, 27)
            })
            let list = vm.$el.querySelectorAll(`.${prefix}time-list`)
            expect(list).to.have.length(3)

            let hours = list[0].querySelectorAll('.cell')
            let minutes = list[1].querySelectorAll('.cell')
            let seconds = list[2].querySelectorAll('.cell')

            expect(hours).to.have.length(24)
            expect(minutes).to.have.length(60)
            expect(seconds).to.have.length(60)
        })

        it('TableMonth', () => {
            vm = createTest(TableMonth, {
                value: new Date(2018, 11)
            })
            let cells = vm.$el.querySelectorAll(`.${prefix}panel-month .cell`)
            expect(cells).to.have.length(12)
            let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            for (let i = 0; i < month.length; i++) {
                let cell = cells[i]
                expect(cell.innerText).to.include(month[i])
                // if (i === 11) {
                //     expect(cell.getAttribute('class')).to.include('actived')
                // }
            }
        })

        describe('TableDate', () => {
            let vm
            afterEach(() => {
                destroyVM(vm)
            })

            const tableDate = (i) => it(`firstDayOfWeek: ${i}`, () => {
                vm = createTest(TableDate, {
                    value: new Date(2018, 4, 1),
                    year: 2018,
                    month: 4,
                    firstDayOfWeek: i
                })
                let lastMonth = new Date(2018, 3, 30)
                let lastMonthDay = 30
                let lastMonthLength = (lastMonth.getDay() + 7 - i) % 7 + 1
                let curMonthLength = 31

                let tds = vm.$el.querySelectorAll(`.${prefix}panel-date td`)
                for (let i = 0; i < 42; i++) {
                    let td = tds[i]
                    let text = parseInt(td.innerText, 10)
                    let classes = td.getAttribute('class')
                    if (i < lastMonthLength) {
                        expect(classes).to.include('last-month')
                        expect(text).to.be.equal(lastMonthDay - lastMonthLength + 1 + i)
                    } else if (i < lastMonthLength + curMonthLength) {
                        expect(text).to.be.equal(i - lastMonthLength + 1)
                        expect(classes).to.include('cur-month')
                        if (text === 1) {
                            expect(classes).to.include('actived')
                        }
                    } else {
                        expect(text).to.be.equal(i - lastMonthLength - curMonthLength + 1)
                        expect(classes).to.include('next-month')
                    }
                }
                let week = ['一', '二', '三', '四', '五', '六', '日']
                let firstWeek = vm.$el.querySelector(`.${prefix}date-header`).innerText
                // console.log('first week', firstWeek)
                expect(firstWeek).to.be.include(week[i - 1])
            })
            for (let i = 1; i <= 7; i++) {
                tableDate(i)
            }
        })
    })
})
