<template>
  <div>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <el-dialog center title="提示" :visible.sync="dialogError" width="80%" :before-close="cancel">
      <span>{{ error }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确 定</el-button>
      </span>
    </el-dialog>

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
import { QrcodeStream } from 'vue-qrcode-reader'
import { seatCheck, seatDown } from '@/api/seat'
import { mapState } from 'vuex'
import { getUrlParams } from '@/utils'

export default {
  name: 'Scan',
  components: { QrcodeStream },

  data() {
    return {
      result: [],
      error: '',
      dialog: false,
      dialogError: false,
      params: {}
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.login.userinfo
    })
  },
  methods: {
    onDecode(result) {
      this.params = getUrlParams(result)
      console.log(this.params)

      this.$store
        .dispatch('seatCheck', {
          room_num: this.params.roomNumber,
          row: this.params.row,
          col: this.params.col
        })
        .then(result => {
          if (result === 200) {
            this.$router.push({
              name: 'studytimeseat',
              params: {
                roomNumber: this.params.roomNumber,
                seatsNumber: this.params.row + ',' + this.params.col
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
          room_num: this.params.roomNumber,
          row: this.params.row,
          col: this.params.col
        })
        .then(result => {
          this.$router.push({
            name: 'study'
          })
        })
    },
    cancel() {
      this.$router.push({
        name: 'study'
      })
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>