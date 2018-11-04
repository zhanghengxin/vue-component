<template>
  <b-form :model="formCustom" :rules="ruleCustom" :label-width="80" ref="formCustom">
    <b-form-item label="密码" prop="passwd">
      <b-input v-model="formCustom.passwd" placeholder="请输入密码" type="password"></b-input>
    </b-form-item>
    <b-form-item label="确认密码" prop="passwdCheck">
      <b-input v-model="formCustom.passwdCheck" placeholder="请再次输入你的密码" type="password">
      </b-input>
    </b-form-item>
    <b-form-item label="年龄" prop="age">
      <b-input v-model="formCustom.age" placeholder="请输入你的年龄" type="text"></b-input>
    </b-form-item>
    <b-button @click="handleSubmit('formCustom')">提交</b-button>
    <b-button @click="handleReset('formCustom')">重置</b-button>
  </b-form>
</template>
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
