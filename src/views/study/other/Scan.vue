<template>
  <div>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <el-dialog center title="提示" :visible.sync="dialogError" width="80%" :before-close="cancel">
      <span>{{ error }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确 定</el-button>
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
      dialogError: false,
      seat: {}
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.login.userinfo
    })
  },
  methods: {
    onDecode(result) {
      this.seat = getUrlParams(result)
      seatCheck({
        room_num: this.seat.roomNumber,
        row: this.seat.row,
        col: this.seat.col
      })
        .then(result => {
          this.$router.push({
            name: 'studytimeseat',
            params: {
              roomNumber: this.seat.roomNumber,
              seatsNumber: this.seat.row + ',' + this.seat.col
            }
          })
        })
        .catch(error => {
          this.error = error
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