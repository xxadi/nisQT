<template>
  <div class="item">
    <div class="player">
      <video controls id="video">
        <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        <!--    <source src="images/test.mp4" type="video/ogg">-->
        您的浏览器不支持Video标签。
      </video>
    </div>
  </div>

</template>

<script>
// custom skin css
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import {videoPlayer} from 'vue-video-player'

export default {
  components: {videoPlayer},
  data() {
    return {}
  },
  mounted() {
    var video = document.querySelector("#video")
    var myVid = document.getElementById("video");
    var sym1;
    console.log("cur" + video.currentTime);

    this.timer = setInterval(function () {
      console.log("duration" + video.duration);
      var time = video.currentTime
      console.log(sym1);
      if (time - sym1 > 1 && sym1 != video.duration) {
        video.currentTime = sym1
      }
      if (time == video.duration || sym1 == video.duration) {
        console.log("通过了")
        sym1 = video.duration
      } else {
        sym1 = video.currentTime
      }

    }, 500);
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer);
    })
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  destroyed() {
    console.log('ul destroyed')
  },
  methods: {
    beforeDestroy() {
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer);
      })
      console.log(this.timer)            //输出为: null,但是任务依然在继续运行
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">

// vjs-custom-skin > .video-js {
//  pointer-events: none
//}
</style>
