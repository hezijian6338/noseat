<template>
  <div id="container">
    <nav-bar><span slot="center">不占座</span></nav-bar>
    <study-top></study-top>
    <div v-if="this.$store.state.duration === 0">
      <study-center></study-center>
      <study-bottom></study-bottom>
    </div>
    <div v-else>
      <study-bottom2></study-bottom2>
    </div>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import NavBar from 'components/content/navbar/NavBar'
import StudyTop from './children/StudyTop'
import StudyCenter from './children/StudyCenter'
import StudyBottom from './children/StudyBottom'
import StudyBottom2 from './children/StudyBottom2'
import MainTabBar from 'components/common/MainTabBar/MainTabBar'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { checkTime } from '@/api/record'

import { seatCheck, seatDown } from '@/api/seat'

export default {
  name: 'Study',

  components: {
    NavBar,
    StudyTop,
    StudyCenter,
    StudyBottom,
    StudyBottom2,
    MainTabBar
  },
  computed: {
    ...mapState({
      token: state => state.login.token,
      userinfo: state => state.login.userinfo,
      duration: state => state.duration,
      neverchangTime: state => state.neverchangTime
    })
  },
  methods: {
    ...mapActions(['timer'])
  },
  created() {
    if (this.duration == 0) {
      checkTime(this.token).then(result => {
        let wantedTime = result.data.wantedTime
        let studiedTime = result.data.studiedTime
        let tagName = result.data.momentTag
        let time = parseInt((wantedTime - studiedTime) / 1000)
        this.$store.dispatch('timer', {
          time,
          tagName
        })
        this.$store.dispatch('setOnseat', {
          onseat: true
        })
      })
    }
  }
}
</script>

<style scoped>
#container {
  height: 880px;
}
</style>
