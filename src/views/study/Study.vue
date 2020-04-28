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
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Study',
  computed: {
    ...mapState(['duration'])
  },
  methods: {
    ...mapMutations(['Timedown'])
  },
  components: {
    NavBar,
    StudyTop,
    StudyCenter,
    StudyBottom,
    StudyBottom2,
    MainTabBar
  },
  data() {
    return {
      timer: ''
    }
  },
  created() {
    // 1、尝试把计时器keep alive
    // 2、更新neverchangeTime的值
    this.timer = setInterval(() => {
      if (this.duration > 0) {
        this.Timedown()
      }
    }, 1000)
    this.$store.dispatch('checkTime')
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
#container {
  height: 880px;
}
</style>
