<template>
  <div id="container">
    <nav-bar class="nav-bar-container">
      <div slot="left" class="top-left-return" @click="backClick"><img id="nav-return" src="~assets/imgs/common/fanhui.png" alt="" /></div>
      <span slot="center">不占座</span>
    </nav-bar>

    <ul v-if="this.list.length">
      <el-table :data="this.list" style="width: 100%" @row-click="rowClick">
        <el-table-column prop="momtentTag" label="标签"> </el-table-column>
        <el-table-column prop="roomNumber" label="教室编号"> </el-table-column>
        <el-table-column prop="seatsNumber" label="行/列"> </el-table-column>
      </el-table>
    </ul>
    <div v-else>
      <div class="flex-center tongzhi-container">
        <img src="~assets/imgs/study/no_seat.png" alt="没有" />
        <span>Nothing Here</span>
      </div>
    </div>

    <el-dialog center title="提示" :visible.sync="dialog" width="80%" :before-close="cancel">
      <span style="text-align : center">你可以进行抢座了~</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ensure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from 'components/content/navbar/NavBar'
import { history } from '@/api/footprint'

export default {
  name: 'SearchSeat',
  data() {
    return {
      list: [],
      dialog: false,
      d: {}
    }
  },
  components: {
    NavBar
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    getList() {
      history().then(result => {
        this.list = result.data
      })
    },
    rowClick(data) {
      this.d = {
        room_num: data.roomNumber,
        row: data.seatsNumber.split(',')[0],
        col: data.seatsNumber.split(',')[1]
      }
      this.$store
        .dispatch('seatCheck', {
          room_num: this.d.room_num,
          row: this.d.row,
          col: this.d.col
        })
        .then(result => {
          if (result === 200) {
            this.$router.push({
              name: 'studytimeseat',
              params: {
                roomNumber: this.d.room_num,
                seatsNumber: this.d.row + ',' + this.d.col
              }
            })
          } else {
            this.dialog = true
          }
        })
        .catch(error => {
          this.error = error
          this.$router.push({
            name: 'study'
          })
        })
    },
    ensure() {
      this.$store
        .dispatch('seatAnyway', {
          room_num: this.d.room_num,
          row: this.d.row,
          col: this.d.col
        })
        .then(result => {
          this.$router.push({
            name: 'study'
          })
        })
    },
    cancel() {
      this.dialog = false
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
.tongzhi-container {
  margin-top: 170px;
}
.tongzhi-container span {
  font-size: 20px;
  font-weight: 900;
}
</style>