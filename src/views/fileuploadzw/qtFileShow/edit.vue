<template>
  <div  class="app-container">
    <div >
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>文章内容</b>
          </span>

         <el-button  :disabled="sendDisabled" size="mini" class=" header_search" @click="downLoadFile">下载</el-button>
        </div>
      </el-card>
      <div style="padding:0 30px;border:1px solid rgba(0,0,0,.1)">
        <div style="padding:10px">
          <h4>{{this.ruleForm.fileName}}</h4>

          <div style="margin-top: 10px">
            <span >{{this.ruleForm.uploadTime}}</span>
            <span style="margin-left: 20px">{{user.nickName}}</span>
          </div>


        </div>
        <!-- image -->
        <div v-if="this.ruleForm.fileSuffix=='jpg'||this.ruleForm.fileSuffix=='png'" style="text-align: center;margin-top: 50px">
          <el-image style="width:50%;"  :src="baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath" alt />
        </div>

        <!-- pdf -->
        <div class="pdf" v-else-if="this.ruleForm.fileSuffix=='pdf'" >
          <pdf  v-for="i in numPages" :key="i"  :src="pdfSrc" :page="i"></pdf>
        </div>
        <!-- txt -->
        <div class="txt" v-else-if="this.ruleForm.fileSuffix=='txt'">
          <iframe class="filename" :src="baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath" width='100%' height='600' frameborder='1' ></iframe>
        </div>
        <!-- word -->
        <div class="docx" v-else-if="this.ruleForm.fileSuffix=='docx'">
          <div v-html="vHtml" />
        </div>
        <!-- excel -->
        <div class="xls" v-else-if="this.ruleForm.fileSuffix=='xls'">
          <div id="table">
            <div class="tab">
              <el-radio-group v-model="cardActive">
                <el-radio-button v-for="(item,index) in card" :label="item" :key="index" @click="chooseTable(item)"></el-radio-button>
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
          <aplayer  :music="{
        title: this.ruleForm.fileName,
        // author: 'LordHeeDictator',
        url: this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath,
        // pic: this.baseApi+ '/file/图片/'+'guanlangaoshou-20210111032150943.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      }">
          </aplayer>
        </div>
        <!--mp4-->
        <div class="mp4" v-else-if="this.ruleForm.fileSuffix=='mp4'" >
          <video-player  class="video-player vjs-custom-skin"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
          ></video-player>
        </div>
        <div v-else style="text-align: center;margin: 50px">
          此文件不可预览，请先下载文件
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import pagination from "@crud/Pagination";
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import myUpload from 'vue-image-crop-upload'
import CRUD, { presenter,header } from "@crud/crud";
import rrOperation from '@crud/RR.operation'
import crudgQuestion from '@/api/yuangan/fileUploadzw'
import Aplayer from 'vue-aplayer'
import pdf from 'vue-pdf'
import mammoth from 'mammoth'
import XLSX from 'xlsx'
import crudgGroup from "@/api/yuangan/fileUploadzw";
export default {
  components: { pagination,myUpload,rrOperation,pdf,'aplayer': Aplayer,videoPlayer},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/quest/findAllQuestion",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: { ...crudgQuestion },
    });
  },
  mixins: [presenter(),header()],
  data() {
    return {
      ruleForm: {
        contentType:"",
        filePath:"",
      },
      headers: {
        'Authorization': getToken()
      },
      pdfSrc:"",      // pdf 路径
      mp4Src:'',
      playerOptions : {
        playbackRates: [1.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src:'',
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
      tableData:[], // execl
      card: [],
      cardActive: '',
      workbook: {},
      sendDisabled:true, // 打印按钮 是否可用
    }
  },
  created() {
    console.log(this.$route.query.user);
    console.log(  JSON.stringify(this.$route.query.user));
    console.log(JSON.stringify(this.$route.query.user) == "{}");

    if (this.$route.query.user == undefined) {
      console.log("报错了");
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      // this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
    } else {
      console.log(this.$route.query.user.contentType);
      this.ruleForm = this.$route.query.user;
      this.sendDisabled = this.ruleForm.fileIsdownload=='0'?true:false;
      console.log(this.sendDisabled)
      console.log(this.parseTime(this.ruleForm.uploadTime))
      this.ruleForm.uploadTime = this.parseTime(this.ruleForm.uploadTime);
    }
  },
  mounted: function() {
    this.handleGetData();
    this.isRead();
  },
  watch:{
    cardActive (ov, nv) {
      this.getTable(ov)
    }
  },
  methods: {
    //获取数据
    handleGetData(){
      var src = this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath;
      console.log(src);
      switch(this.ruleForm.fileSuffix) {
        case 'mp4':
          // this.mp4Src = 'http://vjs.zencdn.net/v/oceans.mp4'
          this.playerOptions['sources'][0]['src']= src;
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
    pdfTran(src){
      //得到pdf地址后执行
      this.pdfSrc = pdf.createLoadingTask(src);
      this.pdfSrc.promise.then(pdf => {
        this.numPages = pdf.numPages;
      });
    },
    wordTran(src){
      const xhr = new XMLHttpRequest();
      var that = this;
      xhr.open("get", src, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function () {
        if (xhr.status == 200) {
          mammoth
            .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
            .then(function (resultObject) {
              console.log(resultObject)
              that.$nextTick(() => {
                that.vHtml=resultObject.value;
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
    getTable (sheetName) {
      console.log(sheetName)
      var worksheet = this.workbook.Sheets[sheetName]
      this.tableData = XLSX.utils.sheet_to_json(worksheet)
    },
    downLoadFile(){
      window.open(this.baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath);
    },
    isRead(){
          crudgGroup.read(this.ruleForm.pathId).then((res) => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
    },
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
</style>
