<template>
  <div id="container">
    <nav-bar class="nav-bar-container">
      <div slot="left" class="top-left-return" @click="backClick"><img id="nav-return" src="~assets/imgs/common/fanhui.png" alt="" /></div>
      <span slot="center">不占座</span>
    </nav-bar>

    <div v-if="this.list.length">
      <div class="flex-center">
        <div class="ranklist">
          <div class="item flex-row-between" v-for="item in list" :key="item.id" @click="rowClick(item)">
            <div class="info flex-row-center">
              {{ item.momtentTag }}
              <img class="avatar jiange" src="~assets/imgs/index/release.png" alt="" />
              {{ item.roomNumber }} {{ item.seatsNumber }}
            </div>
            <div class="score">
              {{ item.createdTime | dateString }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  filters: {
    dateString: function(value) {
      if (!value) {
        return ''
      } else {
        let date = new Date(value)
        let y = date.getFullYear()
        let m = date.getMonth()
        let d = date.getDate()
        let h = date.getHours() + 1
        let min = date.getMinutes() + 1
        let s = date.getSeconds() + 1
        if (h < 10) {
          h = '0' + h
        }
        if (min < 10) {
          min = '0' + min
        }
        if (s < 10) {
          s = '0' + s
        }
        return y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s
      }
    }
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
      console.log(data)
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
.flex-center {
  margin-bottom: 20px;
}
#container {
  height: 100%;
}
#back {
  width: 150px;
}
.bg {
  background-color: #f3f3f3;
  height: 100%;
}
.flex-row {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-row-center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.flex-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.myinfo {
  background: white;
  width: 94%;
  box-shadow: 0px 0px 15px #999;
  height: 90px;
  border-radius: 10px;
  margin: 15px 0;
  padding-bottom: 40px;
}
.avatar {
  width: 50px;
  height: 50px;
}
.content {
  font-size: 24px;
}
.title {
  font-size: 12px;
  color: #999;
}
.ranklist {
  width: 94%;
}
.item {
  background: white;
  box-shadow: 0px 0px 10px #dadada;
  height: 70px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.info {
  width: 70%;
  padding-left: 0px;
}
.jiange {
  margin: 0 15px;
}
.score {
  text-align: right;
  padding-right: 10px;
}
</style>