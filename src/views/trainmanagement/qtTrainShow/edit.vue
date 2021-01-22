<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>培训内容</b>
          </span>

          <!--         <el-button  :disabled="sendDisabled" size="mini" class=" header_search" @click="downLoadFile">下载</el-button>-->
        </div>
      </el-card>
      <div style="padding:0 30px 30px 30px;border:1px solid rgba(0,0,0,.1);">
        <div style="padding:10px">
          <h4>{{ this.ruleForm.fileName }}</h4>

          <div style="margin-top: 10px">
            <span>{{ this.ruleForm.uploadTime }}</span>
            <span style="margin-left: 20px">{{ user.nickName }}</span>
          </div>


        </div>
        <div style="display: flex">

          <!-- image -->
          <div v-if="this.ruleForm.fileSuffix=='jpg'||this.ruleForm.fileSuffix=='png'"
               style="text-align: center;margin-top: 50px;width: 80%">
            <el-image style="width:50%;"
                      :src="baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath" alt/>
          </div>

          <!-- pdf -->
          <div class="pdf" v-else-if="this.ruleForm.fileSuffix=='pdf'">
            <pdf v-for="i in numPages" :key="i" :src="pdfSrc" :page="i"></pdf>
          </div>
          <!-- txt -->
          <div class="txt" v-else-if="this.ruleForm.fileSuffix=='txt'">
            <iframe class="filename"
                    :src="baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath" width='100%'
                    height='600' frameborder='1'></iframe>
          </div>
          <!-- word -->
          <div class="docx" v-else-if="this.ruleForm.fileSuffix=='docx'">
            <div v-html="vHtml"/>
          </div>
          <!-- excel -->
          <div class="xls" v-else-if="this.ruleForm.fileSuffix=='xls'">
            <div id="table">
              <div class="tab">
                <el-radio-group v-model="cardActive">
                  <el-radio-button v-for="(item,index) in card" :label="item" :key="index"
                                   @click="chooseTable(item)"></el-radio-button>
                </el-radio-group>
              </div>
              <el-table
                :data="tableData"
                style="width: 100%">

                <el-table-column
                  v-for="(value,key,index) in tableData[2]"
                  :key="index"
                  :prop="key"
                  :label="key">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- mp3 autoplay   是否自动播放-->
          <div class="mp3" v-else-if="this.ruleForm.fileSuffix=='mp3'">
            <aplayer :music="{
        title: this.ruleForm.fileName,
        // author: 'LordHeeDictator',
        url: this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath,
        // pic: this.baseApi+ '/file/图片/'+'guanlangaoshou-20210111032150943.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      }">
            </aplayer>
          </div>
          <!--mp4-->
          <!--          <div class="mp4" v-else-if="this.ruleForm.fileSuffix=='mp4'" style="width: 80%">-->
          <!--            <video-player  class="video-player vjs-custom-skin"-->
          <!--                           ref="videoPlayer"-->
          <!--                           :playsinline="true"-->
          <!--                           :options="playerOptions"-->
          <!--            ></video-player>-->
          <!--          </div>-->
          <div class="mp4" v-else-if="this.ruleForm.fileSuffix=='mp4'" style="width: 80%">
            <video controls id="video">
              <source :src=this.mp4Src type="video/mp4">
              <!--    <source src="images/test.mp4" type="video/ogg">-->
              您的浏览器不支持Video标签。
            </video>
          </div>
          <div v-else style="text-align: center;margin: 50px;width: 80%">
            此文件不可预览，请先下载文件
          </div>
          <!--          <div style="width: 20%;text-align:center" >-->
          <div id="kefu" style="width: 20%;text-align:center">
            <el-button @click="submitForm('ruleForm', ruleForm)" ref='btn1' class="topBtn"
                       :disabled="timeOver" id="btnConfirm">完成培训
            </el-button>
          </div>
          <!--          </div>-->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import {videoPlayer} from 'vue-video-player'
import pagination from "@crud/Pagination";
import {mapGetters} from 'vuex'
import {getToken} from '@/utils/auth'
import myUpload from 'vue-image-crop-upload'
import CRUD, {presenter, header} from "@crud/crud";
import rrOperation from '@crud/RR.operation'
import crudgQuestion from '@/api/yuangan/trainManager'
import Aplayer from 'vue-aplayer'
import pdf from 'vue-pdf'
import mammoth from 'mammoth'
import XLSX from 'xlsx'

export default {
  components: {pagination, myUpload, rrOperation, pdf, 'aplayer': Aplayer, videoPlayer},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/quest/findAllQuestion",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: {...crudgQuestion},
    });
  },
  mixins: [presenter(), header()],
  data() {
    return {
      ruleForm: {
        contentType: "",
        filePath: "",
      },
      headers: {
        'Authorization': getToken()
      },
      pdfSrc: "",      // pdf 路径
      mp4Src: '',
      playerOptions: {
        playbackRates: [1.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: '',
          type: 'video/mp4'  // 类型
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },      // mp4
      vHtml: '',    // word
      numPages: undefined,      // pdf分页
      tableData: [], // execl
      card: [],
      cardActive: '',
      workbook: {},
      sendDisabled: true, // 打印按钮 是否可用
      timeOver: true,
      timeOverMp4: true,
      pauseTime: true,
      onlineLearnedTime: ''
    }
  },
  created() {
    console.log(this.$route.query.user);
    console.log(JSON.stringify(this.$route.query.user));

    if (this.$route.query.user == undefined) {
      console.log("报错了");
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      // this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
    } else {
      // console.log(this.$route.query.user.contentType);
      this.ruleForm = this.$route.query.user;
      this.sendDisabled = this.ruleForm.fileIsdownload == '0' ? true : false;
      this.ruleForm.uploadTime = this.parseTime(this.ruleForm.uploadTime);

    }
  },
  mounted: function () {
      this.handleGetData();
      if(this.ruleForm.pathState != '2'){
        this.isRead();
      }
      else
      {

      }

    if (this.ruleForm.fileSuffix == 'mp4') {
      this.timeCountMp4();

    } else {
      this.timeCount();
    }

  },
  watch: {
    cardActive(ov, nv) {
      this.getTable(ov)
      this.timer();
    },

  },
  methods: {
    gaibianzhi() {
      this.timeOver = false
    },
    //带天数的倒计时
    countDown(times) {
      var that = this;
      that.onlineLearnedTime = 0
      this.timer = setInterval(function () {
        var day = 0,
          hour = 0,
          minute = 0,
          second = 0;//时间默认值
        if (times > 0) {
          hour = Math.floor(times / (60 * 60)) - (day * 24);
          minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // console.log(hour + "：" + minute + "：" + second + "");

        that.$refs.btn1.$el.innerHTML = "<b>完成培训</b>" + "<br>" + hour + "：" + minute + "：" + second + ""
        if (times <= 0) {
          that.gaibianzhi();
          clearInterval(that.timer);
        }
        if(that.pauseTime&&that.ruleForm.fileSuffix == 'mp4'){

        }
        else {
          times--;
        }

      }, 1000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer);
      })
    }
    ,
    timeCount() {
      var that = this;
      var str = this.ruleForm.fileTime * 60 -this.ruleForm.pathTime;
      if(this.ruleForm.pathState != '2'){
        this.countDown(str);
      }else {
        this.timeOver = false;
      }

    }
    ,
    timeCountMp4() {
      var video = document.querySelector("#video")
      video.currentTime = this.ruleForm.pathTime;
      video.addEventListener('playing', function () {
        that.pauseTime = !that.pauseTime;
      })
      video.addEventListener('pause', function () {
        that.pauseTime = !that.pauseTime;
      })
      this.timeCount();
      var sym1;
      var that = this;
      var str = this.ruleForm.fileTime * 60 -this.ruleForm.pathTime;
      console.log(str);
      this.timerMp4 = setInterval(function () {
        var time = video.currentTime
        if (time - sym1 > 1 && that.timeOverMp4) {
          video.currentTime = sym1
        }
        that.onlineLearnedTime = video.currentTime
        console.log(that.onlineLearnedTime)
        if (time == video.duration || !that.timeOverMp4) {
          // that.gaibianzhi();
          that.timeOverMp4 = false
          sym1 = video.duration
          // console.log(that.timeOver);
          clearInterval(that.timerMp4);
        } else {
          sym1 = video.currentTime
        }
      }, 500);
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timerMp4);
      })
    },
    //获取数据
    handleGetData() {
      var src = this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath;
      console.log(src);
      switch (this.ruleForm.fileSuffix) {
        case 'mp4':
          this.mp4Src = src;
          // this.playerOptions['sources'][0]['src']= src;
          break;
        case 'docx':
          this.wordTran(src);
          break;
        case 'xls':
          this.readWorkbookFromRemoteFile(src);
          break;
        case 'pdf':
          this.pdfTran(src);
          break;
        default:
          ;
      }
    },
    pdfTran(src) {
      //得到pdf地址后执行
      this.pdfSrc = pdf.createLoadingTask(src);
      this.pdfSrc.promise.then(pdf => {
        this.numPages = pdf.numPages;
      });
    },
    wordTran(src) {
      const xhr = new XMLHttpRequest();
      var that = this;
      xhr.open("get", src, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status == 200) {
          mammoth
            .convertToHtml({arrayBuffer: new Uint8Array(xhr.response)})
            .then(function (resultObject) {
              console.log(resultObject)
              that.$nextTick(() => {
                that.vHtml = resultObject.value;
              });
            });
        }
      };
      xhr.send();
    },
    readWorkbookFromRemoteFile: function (url) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'arraybuffer'
      let _this = this
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          var data = new Uint8Array(xhr.response)
          var workbook = XLSX.read(data, {type: 'array'})
          console.log(workbook)
          var sheetNames = workbook.SheetNames // 工作表名称集合
          _this.workbook = workbook
          _this.card = sheetNames
          _this.cardActive = sheetNames[0]
          _this.getTable(sheetNames[0])
        }
      }
      xhr.send()
    },
    getTable(sheetName) {
      console.log(sheetName)
      var worksheet = this.workbook.Sheets[sheetName]
      this.tableData = XLSX.utils.sheet_to_json(worksheet)
    },
    downLoadFile() {
      window.open(this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath);
    },
    isRead() {
      crudgQuestion.read(this.ruleForm.pathId).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    sadss(){
      console.log("s要关闭了")
    },

    transferTime(second) {
      if (Number(second) && second > 0) {
        second = parseInt(second) // 舍去秒数以后的小数位
      } else {
        return '00:00:00'
      }

      // 计算时分秒
      var h, m, s;
      s = second % 60
      m = ((second - s) % 3600) / 60
      h = parseInt(second / 3600)

      // 优化输出
      function fn(num) {
        return num >= 10 ? num : '0' + num
      }

      return fn(h) + ':' + fn(m) + ':' + fn(s)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //提交试题
    submitForm(ruleForm, form) {
      if(this.ruleForm.pathState != '2'){
        form.onlineLearnedTime = this.onlineLearnedTime;
        form.fileState = this.timeOver == false ? 2 : 1
        var that = this
        console.log(form)

        crudgQuestion.updateQt(form).then((res) => {
          console.log(res)
          that.crud.notify('提交成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          that.crud.toQuery()
          // that.$router.go(0);
        }).catch(err => {
          console.log(err)
        })
      }
    },

  },
  destroyed() {

  },
  beforeunloadHandler(){
    console.log("关闭界面了");
  },
  beforeDestroy() {
    console.log("s要关闭了")
    var that = this;
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer);
    })
    if(this.ruleForm.pathState != '2'){
      this.submitForm('ruleForm', this.ruleForm)
    }

    console.log(this.timer)            //输出为: null,但是任务依然在继续运行
  },
  computed: {
    ...mapGetters([
      'user',
      'imagesUploadApi',
      'baseApi'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

.header_search {
  display: flex;
  float: right;
}

#vjs_video_404 {
  //background-color: white;
}

video {
  //居中
  //position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  //填满
  object-fit: fill;
  width: 100%;
  height: 100%;
}

#kefu {
  display: flex;
  justify-content: center;
}

#kefu .topBtn {
  width: 100px;
  height: 40px;
  background-color: #f2f2f2;
  position: fixed;
  bottom: 60px;

}
</style>
