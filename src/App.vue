<template>
  <div id="app">
    <div>
      <router-view></router-view>
      <login></login>
    </div>
  </div>
</template>

<script>
import Login from '@/components/form/login'
export default {
  name: 'app',
  components: {
    Login
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
