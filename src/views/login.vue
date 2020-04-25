<template>
  <div class="login">
    <button @click="login">点击登录</button>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {}
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          username: '140202011031',
          password: 'admin'
        })
        .then(result => {
          this.$router.push({ path: '/study' })
        })
    }
  },
  mounted() {}
}
</script>

<style scoped>
.login {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-content: center;
}
</style>
