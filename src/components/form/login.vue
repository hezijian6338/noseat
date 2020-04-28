<template>
  <div class="login">
    <el-dialog
      :close-on-press-escape="closeOnPressEscape"
      :close-on-click-modal="closOnClickModal"
      :width="dialogWidth"
      :show-close="showClose"
      title="登录"
      :visible.sync="showLoginForm"
    >
      <el-form :model="form" ref="form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { login } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {
      form: {
        name: '140202011031',
        password: 'admin'
      },
      formLabelWidth: '',
      dialogWidth: '70%',
      showClose: false,
      closOnClickModal: false,
      closeOnPressEscape: false
    }
  },
  computed: {
    ...mapState(['showLoginForm'])
  },
  methods: {
    submitForm(formName) {
      this.$store
        .dispatch('login', {
          username: this.form.name,
          password: this.form.password
        })
        .then(r => {
          this.$router.push({
            name: 'study'
          })
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
</style>
