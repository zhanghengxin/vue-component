
/*  前者一个测试套执行一次, 后者每个测试用例执行一次。 */
import {destroyVM, createVue} from '../utils'
// import Form from '&/components/form'
// let FormItem = Form.FormItem
// const DELAY = 50
describe('Form', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('label-width ', done => {
        vm = createVue({
            template: `
   <b-form ref="form" :model="form" :label-width="80">
          <b-form-item label="活动名称">
            <b-input v-model="form.name"></b-input>
          </b-form-item>
        </b-form>
  `,
            data () {
                return {
                    form: {
                        name: ''
                    }
                }
            }
        }, true)
        expect(vm.$el.querySelector('.b-form-item-label').style.width).toBe('80px')
        expect(vm.$el.querySelector('.b-form-item-content').style.marginLeft).toBe('80px')
        done()
    })
    it('inline', done => {
        vm = createVue({
            template: `
        <b-form ref="form" :model="form" inline>
          <b-form-item>
            <b-input v-model="form.name"></b-input>
          </b-form-item>
          <b-form-item>
            <b-input v-model="form.address"></b-input>
          </b-form-item>
        </b-form>
      `,
            data () {
                return {
                    form: {
                        name: '',
                        address: ''
                    }
                }
            }
        }, true)
        expect(vm.$el.classList).toContain('b-form-inline')
        done()
    })
    it('show-message', done => {
        vm = createVue({
            template: `
        <b-form :model="form" ref="form">
          <b-form-item label="活动名称" prop="name" :show-message="false"
            :rules="{
              required: true,
              message: '请输入活动名称',
              trigger: 'change',
              type: 'string',
              min: 3,
              max: 6
            }"
          >
            <b-input v-model="form.name"></b-input>
          </b-form-item>
        </b-form>
      `,
            data () {
                return {
                    form: {
                        name: ''
                    }
                }
            }
        }, true)
        vm.$refs.form.validate(valid => {
            expect(valid).not.toBeTruthy()
            vm.$refs.form.$nextTick(_ => {
                expect(vm.$el.querySelector('.b-form-item-error-tip')).not.toBeTruthy()
                done()
            })
        })
    })
    it('resetFields', done => {
        vm = createVue({
            template: `
        <b-form ref="form" :model="form" :rules="rules">
          <b-form-item label="活动名称" prop="name">
            <b-input v-model="form.name" ref="fieldName"></b-input>
          </b-form-item>
          <b-form-item label="活动地址" prop="address">
            <b-input v-model="form.address" ref="fieldAddr"></b-input>
          </b-form-item>
          <b-form-item label="活动性质" prop="type">
            <b-checkboxGroup v-model="form.type">
              <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
              <b-checkbox label="地推活动" name="type"></b-checkbox>
              <b-checkbox label="线下主题活动" name="type"></b-checkbox>
              <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
            </b-checkboxGroup>
          </b-form-item>
        </b-form>
      `,
            data () {
                return {
                    form: {
                        name: '',
                        address: '',
                        type: []
                    },
                    rules: {
                        name: [
                            { required: true, message: '请输入活动名称', trigger: 'blur' }
                        ],
                        address: [
                            { required: true, message: '请选择活动区域', trigger: 'change' }
                        ],
                        type: [
                            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                        ]
                    }
                }
            },
            methods: {
                setValue () {
                    this.form.name = 'jack'
                    this.form.address = 'aaaa'
                    this.form.type.push('地推活动')
                }
            }
        }, true)
        vm.setValue()
        vm.$refs.form.resetFields()
        vm.$refs.form.$nextTick(_ => {
            expect(vm.form.name).toBe('')
            expect(vm.form.address).toBe('')
            expect(vm.form.type.length).toBe(0)
            done()
        })
    })
    describe('validate', () => {
        // it('input', done => {
        //     vm = createVue({
        //         template: `
        //   <b-form :model="form" :rules="rules" ref="form">
        //     <b-form-item label="活动名称" prop="name" ref="field">
        //       <b-input v-model="form.name"></b-input>
        //     </b-form-item>
        //   </b-form>
        // `,
        //         data () {
        //             return {
        //                 form: {
        //                     name: ''
        //                 },
        //                 rules: {
        //                     name: [
        //                         { required: true, message: '请输入活动名称', trigger: 'change' },
        //                         {
        //                             message: '最少3个字符最多6个字符', min: 3, max: 6, type: 'string'
        //                         }
        //                     ]
        //                 }
        //             }
        //         },
        //         methods: {
        //             setValue (value) {
        //                 this.form.name = value
        //             }
        //         }
        //     }, true)
        //     vm.$refs.form.validate(valid => {
        //         let field = vm.$refs.field
        //         expect(valid).to.not.true
        //         vm.$refs.form.$nextTick(_ => {
        //             expect(field.errorTipMessage).to.equal('请输入活动名称')
        //             vm.setValue('aaaaa')
        //
        //             vm.$refs.form.$nextTick(_ => {
        //                 expect(field.errorTipMessage).to.equal('')
        //                 vm.setValue('aa')
        //
        //                 vm.$refs.form.$nextTick(_ => {
        //                     expect(field.errorTipMessage).to.equal('最少3个字符最多6个字符')
        //                     done()
        //                 })
        //             })
        //         })
        //     })
        // })
        it('checkbox', done => {
            vm = createVue({
                template: `
          <b-form :model="form" :rules="rules" ref="form">
            <b-form-item label="是否接受协议" prop="accept" ref="field">
              <b-checkbox v-model="form.accept">
                接受协议
              </b-checkbox>
            </b-form-item>
          </b-form>
        `,
                data () {
                    return {
                        form: {
                            accept: true
                        },
                        rules: {
                            accept: [
                                {
                                    validator: (rule, value, callback) => {
                                        value ? callback() : callback(new Error('您需要接受用户协议'))
                                    },
                                    trigger: 'change'
                                }
                            ]
                        }
                    }
                },
                methods: {
                    setValue (value) {
                        this.form.accept = value
                    }
                }
            }, true)
            vm.form.accept = false
            vm.$nextTick(_ => {
                expect(vm.$refs.field.errorTipMessage).toBe('您需要接受用户协议')
            })
            vm.$refs.form.validate(valid => {
                let field = vm.$refs.field
                expect(valid).not.toBeTruthy()
                vm.$nextTick(_ => {
                    expect(field.errorTipMessage).toBe('您需要接受用户协议')
                    done()
                })
            })
        })
        it('checkbox group', done => {
            vm = createVue({
                template: `
          <b-form :model="form" :rules="rules" ref="form">
            <b-form-item label="活动名称" prop="type" ref="field">
              <b-checkboxGroup v-model="form.type">
                <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
                <b-checkbox label="地推活动" name="type"></b-checkbox>
                <b-checkbox label="线下主题活动" name="type"></b-checkbox>
                <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
              </b-checkboxGroup>
            </b-form-item>
          </b-form>
        `,
                data () {
                    return {
                        form: {
                            type: []
                        },
                        rules: {
                            type: [
                                { type: 'array', required: true, message: '请选择活动类型', trigger: 'change' }
                            ]
                        }
                    }
                },
                methods: {
                    setValue (value) {
                        this.form.type = value
                    }
                }
            }, true)
            vm.$refs.form.validate(valid => {
                let field = vm.$refs.field
                expect(valid).not.toBeTruthy()
                vm.$refs.form.$nextTick(_ => {
                    expect(field.errorTipMessage).toBe('请选择活动类型')
                    done()
                })
            })
        })
        it('validate field', done => {
            vm = createVue({
                template: `
          <b-form :model="form" :rules="rules" ref="form">
            <b-form-item label="活动名称" prop="name" ref="field">
              <b-input v-model="form.name"></b-input>
            </b-form-item>
          </b-form>
        `,
                data () {
                    return {
                        form: {
                            name: ''
                        },
                        rules: {
                            name: [
                                { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
                            ]
                        }
                    }
                },
                methods: {
                    setValue (value) {
                        this.form.name = value
                    }
                }
            }, true)
            vm.$refs.form.validateField('name', valid => {
                expect(valid).toBeTruthy()
                done()
            })
        })
        // it('custom validate', done => {
        //     var checkName = (rule, value, callback) => {
        //         if (value.length < 5) {
        //             callback(new Error('长度至少为5'))
        //         } else {
        //             callback()
        //         }
        //     }
        //     vm = createVue({
        //         template: `
        //   <b-form :model="form" :rules="rules" ref="form">
        //     <b-form-item label="活动名称" prop="name" ref="field">
        //       <b-input v-model="form.name"></b-input>
        //     </b-form-item>
        //   </b-form>
        // `,
        //         data () {
        //             return {
        //                 form: {
        //                     name: ''
        //                 },
        //                 rules: {
        //                     name: [
        //                         { validator: checkName, trigger: 'change' }
        //                     ]
        //                 }
        //             }
        //         },
        //         methods: {
        //             setValue (value) {
        //                 this.form.name = value
        //             }
        //         }
        //     }, true)
        //     vm.$refs.form.validate(valid => {
        //         let field = vm.$refs.field
        //         expect(valid).to.not.true
        //         vm.$refs.form.$nextTick(_ => {
        //             expect(field.errorTipMessage).to.equal('长度至少为5')
        //             vm.setValue('aaaaaa')
        //
        //             vm.$refs.form.$nextTick(_ => {
        //                 expect(field.errorTipMessage).to.equal('')
        //                 done()
        //             })
        //         })
        //     })
        // })
        it('error', done => {
            vm = createVue({
                template: `
          <b-form :model="form" :rules="rules" ref="form">
            <b-form-item label="活动名称" prop="name" :error="error" ref="field">
              <b-input v-model="form.name"></b-input>
            </b-form-item>
          </b-form>
        `,
                data () {
                    return {
                        error: 'dsad',
                        form: {
                            name: 'sada'
                        },
                        rules: {
                            name: [
                                { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
                            ]
                        }
                    }
                },
                methods: {
                    setValue (value) {
                        this.form.name = value
                    }
                }
            }, true)
            vm.$refs.form.validate(valid => {
                let field = vm.$refs.field
                expect(valid).toBeTruthy()
                vm.error = '输入不合法'

                vm.$refs.field.$nextTick(_ => {
                    expect(field.validateState).toBe('error')
                    expect(field.errorTipMessage).toBe('输入不合法')
                    done()
                })
            })
        })
    })
})
