<template>
  <div>
    <nav-bar>
      <span slot="center">我的</span>
    </nav-bar>
    <div id="content">
      <personal-top :name="userinfo.name"></personal-top>
      <personal-middle></personal-middle>
      <personal-bottom></personal-bottom>
    </div>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import NavBar from 'components/content/navbar/NavBar'
import MainTabBar from 'components/common/MainTabBar/MainTabBar'
import PersonalTop from './children/PersonalTop'
import PersonalMiddle from './children/PersonalMiddle'
import PersonalBottom from './children/PersonalBottom'

import { mapState } from 'vuex'

export default {
  name: 'Personal',
  components: {
    NavBar,
    PersonalTop,
    PersonalMiddle,
    PersonalBottom,
    MainTabBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userinfo: state => state.login.userinfo
    })
  },
  mounted() {
    console.log(this.userinfo)
  }
}
</script>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1000px;
}
</style>