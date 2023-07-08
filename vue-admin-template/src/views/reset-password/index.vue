<template>
  <div class="app-container">
    <el-col :span="10">
      <el-form
        :rules="rules"
        ref="resetPasswordForm"
        :model="resetPasswordForm"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="学生编号：" prop="studentId">
          <el-input v-model.number="resetPasswordForm.studentId" />
        </el-form-item>
        <el-form-item label="学生姓名：" prop="studentName">
          <el-input v-model.number="resetPasswordForm.studentName" />
        </el-form-item>
        <el-form-item label="新的密码：" prop="pass">
          <el-input
            v-model="resetPasswordForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="再次输入：" prop="checkPass">
          <el-input
            v-model="resetPasswordForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('resetPasswordForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetPasswordForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      }
    }
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学生姓名不能为空'))
      }
    }
    var validateID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学生ID不能为空'))
      }
    }

    return {
      list: null,
      listLoading: true,
      resetPasswordForm: {
        studentId: '',
        studentName: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
        Pass: [{ validator: validatePass, trigger: 'blur' }],
        studentName: [{ validator: validateName, trigger: 'blur' }],
        studentId: [{ validator: validateID, trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    submitForm(formName) {
      console.log(this.resetPasswordForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
}
</style>
