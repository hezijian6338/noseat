<template>
  <div class="flex-center">
    <el-progress :width="200" type="circle" :percentage="this.$store.getters.percent" :show-text="false"></el-progress>

    <div class="count-time">{{ this.$store.getters.countTime }}</div>

    <div id="time-icon" class="tag-name">{{ this.$store.state.tagName }}</div>

    <button class="btn1" v-show="status != 'temp' && status != 'anyway'" @click="endDialog = true">结束</button>
    <el-dialog :visible.sync="endDialog" width="50%" center>
      <div class="flex-center">
        <div class="jieshu">结束提醒</div>
        <div class="text">您确定要放弃学习吗?</div>
        <button class="btn outline-none" @click="end">放弃</button>
        <button class="btn btn2 outline-none" @click="endDialog = false">取消</button>
      </div>
    </el-dialog>

    <button class="btn1 btn-leave" v-show="status == 'study'" @click="tempLeaveDialog = true">暂离</button>
    <el-dialog :visible.sync="tempLeaveDialog" width="50%" center>
      <div class="flex-center">
        <div class="jieshu">暂离提醒</div>
        <div class="text">您确定要暂离座位吗?</div>
        <button class="btn btn-leave outline-none" @click="tempLeave">确定</button>
        <button class="btn btn2 outline-none" @click="tempLeaveDialog = false">取消</button>
      </div>
    </el-dialog>

    <button class="btn1" v-show="status == 'temp'" @click="studyDialog = true">重新入座</button>
    <el-dialog :visible.sync="studyDialog" width="50%" center>
      <div class="flex-center">
        <div class="jieshu">重新入座</div>
        <div class="text">您确定要重新入座吗?</div>
        <button class="btn btn-leave outline-none" @click="study">确定</button>
        <button class="btn btn2 outline-none" @click="studyDialog = false">取消</button>
      </div>
    </el-dialog>

    <button class="btn1" v-show="status == 'anyway'" @click="endAnywayDialog = true">取消</button>
    <el-dialog :visible.sync="endAnywayDialog" width="50%" center>
      <div class="flex-center">
        <div class="jieshu">结束抢座</div>
        <div class="text">您确定要结束抢座吗?</div>
        <button class="btn outline-none" @click="endAnyway">确定</button>
        <button class="btn btn2 outline-none" @click="endAnywayDialog = false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { seatLeave, seatTempLeave } from '@/api/seat'
import { checkTime } from '@/api/record'
import { mapState } from 'vuex'

export default {
  name: 'StudyBottom2',
  data() {
    return {
      endDialog: false,
      tempLeaveDialog: false,
      studyDialog: false,
      endAnywayDialog: false
    }
  },
  computed: {
    ...mapState(['status'])
  },
  methods: {
    end() {
      if (this.status == 'chill') {
        this.$store.commit('TimeZero')
      } else {
        this.$store.dispatch('endStudy')
      }
    },
    tempLeave() {
      this.$store.dispatch('tempLeave').then(result => {
        this.tempLeaveDialog = false
      })
    },
    study() {
      this.$store.dispatch('tempLeave').then(result => {
        this.studyDialog = false
      })
    },
    endAnyway() {
      this.$store.commit('TimeZero')
    }
  }
  // beforeDestory(){
  //   if (this.$store.state.status == 'anyway') {

  //   }
  // }
}
</script>

<style scoped>
.flex-center {
  margin-top: 30px;
}
.count-time {
  width: 200px;
  text-align: center;
  font-size: 40px;
  position: relative;
  top: -150px;
}
.tag-name {
  width: 200px;
  text-align: center;
  font-size: 25px;
}
#time-icon {
  background: url('~assets/imgs/study/timer_icon.png') no-repeat top center/130px;
  height: 130px;
  width: 130px;
  position: relative;
  top: -130px;
}
.btn1 {
  height: 50px;
  width: 185px;
  background-color: #fedb50;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  outline: none;
}
.jieshu {
  font-size: 20px;
}
.text {
  margin: 10px 0 20px 0;
  font-size: 16px;
}
.btn2 {
  background-color: #eee;
  margin-top: 10px;
}
.btn-leave {
  background-color: #77caff;
  color: white;
  margin-top: 10px;
}
</style>