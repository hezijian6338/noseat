<template>
  <div id="app">
    <div>
      <router-view></router-view>
      <el-dialog
        :close-on-press-escape="closeOnPressEscape"
        :close-on-click-modal="closOnClickModal"
        :width="dialogWidth"
        :show-close="showClose"
        title="登录"
        :visible.sync="dialogFormVisible"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { login } from '@/api/login'

export default {
  name: 'app',
  computed: {
    ...mapState(['dialogFormVisible'])
  },
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
  methods: {
    submitForm(formName) {
      this.$store
        .dispatch('login', {
          username: this.form.name,
          password: this.form.password
        })
        .then(result => {
          this.$router.push({ path: '/study' })
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
@import url(assets/css/base/base.css);
@import url(assets/css/common/common.css);
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
