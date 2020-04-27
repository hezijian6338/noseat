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
          <span class="content">未上榜</span>
          <span class="title">小队排名</span>
        </div>
        <div class="middle flex-col">
          <img class="avatar" src="~assets/imgs/common/default_avatar.png" alt="" />
          {{ name }}
        </div>
        <div class="right flex-col">
          <span class="content">0</span>
          <span class="title">小组活跃</span>
        </div>
      </div>
      <div class="ranklist">
        <div class="item flex-row-between" v-for="item in rank" key="item.id">
          <div class="info flex-row-center">
            1
            <img class="avatar jiange" src="~assets/imgs/common/default_avatar.png" alt="" />
            lyh
          </div>
          <div class="score">
            活跃7000
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
      rank: []
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
      this.rank = result.data
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
</style>