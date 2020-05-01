<template>
  <div id="container">
    <nav-bar class="nav-bar-container">
      <div slot="left" class="top-left-return" @click="backClick">
        <img src="~assets/imgs/common/fanhui.png" id="nav-return" alt="返回" />
      </div>
      <span slot="center">超级榜单</span>
    </nav-bar>
    <div class="flex-center">
      <div class="myinfo flex-row">
        <div class="left flex-col">
          <span class="content">{{ mc }}</span>
          <span class="title">小队排名</span>
        </div>
        <div class="middle flex-col">
          <img class="avatar" src="~assets/imgs/common/default_avatar.png" alt="" />
          {{ name }}
        </div>
        <div class="right flex-col">
          <span class="content">{{ hy }}</span>
          <span class="title">小组活跃</span>
        </div>
      </div>
      <div class="ranklist">
        <div class="item flex-row-between" v-for="(item, index) in rank" :key="item.id">
          <div class="info flex-row-center">
            {{ index + 1 }}
            <img class="avatar jiange" src="~assets/imgs/common/default_avatar.png" alt="" />
            {{ item.user.name }}
          </div>
          <div class="score">
            <div class="st">活跃</div>
            <div class="sc">{{ parseInt(item.stayTime / 1000) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/content/navbar/NavBar'
import { getBoard } from '@/api/record'
import { mapState } from 'vuex'

export default {
  name: 'Rank',
  data() {
    return {
      rank: [],
      mc: '未上榜',
      hy: '0'
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      name: state => state.login.userinfo.name
    })
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    gotoStudy() {
      this.$router.push('/study')
    }
  },
  created() {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()
    getBoard({
      year,
      month,
      day
    }).then(result => {
      let data = [...new Set(result.data)].sort(function(a, b) {
        return b.stayTime - a.stayTime
      })
      let data2 = []
      for (let index = 1; index < data.length; index++) {
        const now = data[index]
        const before = data[index - 1]

        if (index == 1) {
          data2.push(before)
        }

        if (now.userId == before.userId) {
          if (now.stayTime > before.stayTime) {
            data2.push(now)
          }
        } else {
          data2.push(now)
        }
      }
      for (let index = 0; index < data2.length; index++) {
        const e = data2[index]
        if (this.$store.state.login.userinfo.id == e.userId) {
          this.mc = index + 1
          this.hy = parseInt(e.stayTime / 1000)
        }
      }
      this.rank = data2
    })
  }
}
</script>

<style>
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
  padding-left: 30px;
}
.jiange {
  margin: 0 15px;
}
.score {
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.st {
  width: 50%;
  text-align: right;
}
.sc {
  width: 50%;
  text-align: left;
  padding-left: 4px;
}
</style>