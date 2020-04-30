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

    <el-dialog center title="提示" :visible.sync="dialog" width="80%">
      <span style="text-align : center">抢座失败，是否继续抢座？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ensure">继 续</el-button>
      </span>
    </el-dialog>
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
    ...mapState(['duration', 'seatInfo'])
  },
  methods: {
    ...mapMutations(['Timedown', 'setStatus']),
    ensure() {
      this.$store
        .dispatch('seatAnyway', {
          room_num: this.seatInfo.room_num,
          row: this.seatInfo.row,
          col: this.seatInfo.col
        })
        .then(result => {
          this.dialog = false
        })
    },
    cancel() {
      this.dialog = false
      this.setStatus('chill')
    }
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
      timer: '',
      dialog: false
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.$store.state.status == 'anyway') {
        if (this.duration > 0) {
          this.Timedown()
        } else {
          this.$store.dispatch('seatCheck', this.seatInfo).then(result => {
            if (result == 200) {
              this.$router.push({
                name: 'studytimeseat',
                params: {
                  roomNumber: this.seatInfo.room_num,
                  seatsNumber: this.seatInfo.row + ',' + this.seatInfo.col
                }
              })
            } else {
              // 这里处理不好，有时候会弹出两次
              this.dialog = true
            }
          })
        }
      } else {
        if (this.duration > 0) {
          this.Timedown()
        }
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
