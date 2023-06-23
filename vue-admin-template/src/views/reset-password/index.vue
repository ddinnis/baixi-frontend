<template>
  <div class="app-container">
    <el-col :span="10">
      <el-form
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

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
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
    return {
      list: null,
      listLoading: true,
      resetPasswordForm: {
        studentId: '',
        studentName: '',
        pass: '',
        checkPass: ''
      }
    }
  },
  created() {},
  methods: {
    submitForm(date) {
      console.log(date)
    }
  }
}
</script>
