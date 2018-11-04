<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'))
            } else {
                callback()
            }
        }
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Age cannot be empty'))
            }
            // 模拟异步验证效果
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('Please enter a numeric value'))
                } else {
                    if (value < 18) {
                        callback(new Error('Must be over 18 years of age'))
                    } else {
                        callback()
                    }
                }
            }, 1000)
        }
        return {
            form: {
                name: '',
                type: []
            },
            formInline: {
                name: '',
                life: ''
            },
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit () {
            console.log('form')
        },
        handleSubmit (name) {
        alert(12)
            this.$refs[name].validate((valid) => {
                debugger
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        }
    }
}
</script>
<style>

</style>

# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以校验，提交表单数据。

### 典型的表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

<div class="example">
    <div class="example-box">
        <div>
        <b-form ref="form" :model="form" :label-width="80">
          <b-form-item label="活动名称">
            <b-input v-model="form.name"></b-input>
          </b-form-item>
          <b-form-item label="活动性质">
            <b-checkboxGroup v-model="form.type">
              <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
              <b-checkbox label="地推活动" name="type"></b-checkbox>
              <b-checkbox label="线下主题活动" name="type"></b-checkbox>
              <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
            </b-checkboxGroup>
          </b-form-item>
            <b-button @click="onSubmit">提交</b-button>
            <b-button>取消</b-button>
        </b-form>
        </div>
    </div>
</div>

<pre>
在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker等
</pre>

::: code

```html
<div class="example">
    <div class="example-box">
        <div>
        <b-form ref="form" :model="form" label-width="80px">
          <b-form-item label="活动名称">
            <b-input v-model="form.name"></b-input>
          </b-form-item>
          <b-form-item label="活动性质">
            <b-checkboxGroup v-model="form.type">
              <b-checkbox label="美食/餐厅线上活动" name="type"></b-checkbox>
              <b-checkbox label="地推活动" name="type"></b-checkbox>
              <b-checkbox label="线下主题活动" name="type"></b-checkbox>
              <b-checkbox label="单纯品牌曝光" name="type"></b-checkbox>
            </b-checkboxGroup>
          </b-form-item>
          </b-form-item>
          <b-form-item>
            <b-button @click="onSubmit">提交</b-button>
            <b-button>取消</b-button>
          </b-form-item>
        </b-form>
        </div>
    </div>
</div>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          type: []
        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
      }
    }
  }
</script>
```

:::

### 温馨提示：

W3C 标准中有如下[规定](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)：

> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>

即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 `<bw-form>` 标签上添加 `@submit.native.prevent`。

### 行内表单

设置 inline 属性可以让表单域变为行内的表单域

<b-form inline :model="formInline" class="demo-form-inline" :label-width="60" label-position="left">
  <b-form-item label="姓名">
    <b-input v-model="formInline.name" placeholder="姓名"></b-input>
  </b-form-item>
   <b-form-item label="生活">
      <b-input v-model="formInline.life" placeholder="生活"></b-input>
    </b-form-item>
    <b-button @click="onSubmit">查询</b-button>
</b-form>

:::code

```html
<template>
<div class="example">
    <div class="example-box">
        <div>
          <b-form :inline="true" :model="formInline" class="demo-form-inline" :label-width="60" inline label-position="left">
            <b-form-item label="姓名">
              <b-input v-model="formInline.name" placeholder="姓名"></b-input>
            </b-form-item>
             <b-form-item label="生活">
                <b-input v-model="formInline.life" placeholder="生活"></b-input>
              </b-form-item>
            <b-form-item>
              <b-button @click="onSubmit">查询</b-button>
            </b-form-item>
          </b-form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
      return {
        formInline: {
          name: '',
          life: ''
         }
      }
    },
    methods: {
      onSubmit() {
        console.log('form');
      }
    }
  }
</script>
```

:::

### 自定义验证

自定义验证可以完成更复杂的验证，比如当数据涉及到后台验证的时候，比如密码验证。
<div class="example">
    <div class="example-box">
        <div>
             <b-form :model="formCustom" :rules="ruleCustom" :label-width="80" ref="formCustom">
               <b-form-item label="密码" prop="passwd">
                 <b-input v-model="formCustom.passwd" placeholder="请输入密码" type="password"></b-input>
               </b-form-item>
               <b-form-item label="确认密码" prop="passwdCheck">
                 <b-input v-model="formCustom.passwdCheck" placeholder="请再次输入你的密码" type="password"></b-input>
               </b-form-item>
               <b-form-item label="年龄" prop="age">
                 <b-input v-model="formCustom.age" placeholder="请输入你的年龄" type="text"></b-input>
               </b-form-item>
               <b-button @click="handleSubmit('formCustom')">提交</b-button>
               <b-button @click="handleReset('formCustom')">重置</b-button>
             </b-form>
        </div>
    </div>
</div>
<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'))
            } else {
                callback()
            }
        }
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Age cannot be empty'))
            }
            // 模拟异步验证效果
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('Please enter a numeric value'))
                } else {
                    if (value < 18) {
                        callback(new Error('Must be over 18 years of age'))
                    } else {
                        callback()
                    }
                }
            }, 1000)
        }
        return {
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            alert(12)
            this.$refs[name].validate((valid) => {
                debugger
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        }
    }
}
</script>

:::code
```html
<div class="example">
    <div class="example-box">
        <div>
             <b-form :model="formCustom" :rules="ruleCustom" :label-width="80" ref="formCustom">
               <b-form-item label="密码" prop="passwd">
                 <b-input v-model="formCustom.passwd" placeholder="请输入密码" type="password"></b-input>
               </b-form-item>
               <b-form-item label="确认密码" prop="passwdCheck">
                 <b-input v-model="formCustom.passwdCheck" placeholder="请再次输入你的密码" type="password"></b-input>
               </b-form-item>
               <b-form-item label="年龄" prop="age">
                 <b-input v-model="formCustom.age" placeholder="请输入你的年龄" type="text"></b-input>
               </b-form-item>
               <b-button @click="handleSubmit('formCustom')">提交</b-button>
               <b-button @click="handleReset('formCustom')">重置</b-button>
             </b-form>
        </div>
    </div>
</div>
<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('The two input passwords do not match!'))
            } else {
                callback()
            }
        }
        const validateAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('Age cannot be empty'))
            }
            // 模拟异步验证效果
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('Please enter a numeric value'))
                } else {
                    if (value < 18) {
                        callback(new Error('Must be over 18 years of age'))
                    } else {
                        callback()
                    }
                }
            }, 1000)
        }
        return {
            formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
            },
            ruleCustom: {
                passwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwdCheck: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                age: [
                    { validator: validateAge, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            alert(12)
            this.$refs[name].validate((valid) => {
                debugger
                if (valid) {
                    this.$Message.success('Success!')
                } else {
                    this.$Message.error('Fail!')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        }
    }
}
</script>

```
:::

