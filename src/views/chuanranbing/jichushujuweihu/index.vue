<template>
  <div class="pdf">
    <!--    <pdf-->

    <!--         :src="baseApi + '/file/文档'  + '/' + '周旺提交的费用报销单202101081039000575691-20210111111324902.pdf'"-->
    <!--    >-->
    <!--    </pdf>-->
    <!--    <pdf  v-for="i in numPages" :key="i"  :src="pdfSrc" :page="i"></pdf>-->
    <!--    <pdf  :src="baseApi + '/file/文档'  + '/' + '周旺提交的费用报销单202101081039000575691-20210111111324902.pdf'" ></pdf>-->
    <!--    <iframe class="filename" :src="this.baseApi+ '/file/其他/'+'nisoa-20210111105854256.sql'" width='100%' height='600' frameborder='1' ></iframe>-->
    <!--    <input id="document" type="file">-->
    <!--    <div v-html="vHtml" />-->
  </div>
<!--  <div id="table">-->

<!--    <div class="tab">-->
<!--      <el-radio-group v-model="cardActive">-->
<!--        <el-radio-button v-for="(item,index) in card" :label="item" :key="index" @click="chooseTable(item)"></el-radio-button>-->
<!--      </el-radio-group>-->
<!--    </div>-->

<!--    <el-table-->
<!--      :data="tableData"-->
<!--      style="width: 100%">-->

<!--      <el-table-column-->
<!--        v-for="(value,key,index) in tableData[2]"-->
<!--        :key="index"-->
<!--        :prop="key"-->
<!--        :label="key">-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--  </div>-->

<!--  autoplay   是否自动播放-->
<!--  <aplayer  :music="{-->
<!--  title: '君が好きだと叫びたい（好想大声说爱你）TV动画《灌篮高手》OP1（翻自 BAAD）',-->
<!--  author: 'LordHeeDictator',-->
<!--  url: this.baseApi+ '/file/音乐/'+'LordHeeDictator - 君が好きだと叫びたい（好想大声说爱你）TV动画《灌篮高手》OP1（翻自 BAAD）-20210111022957610.mp3',-->
<!--  pic: this.baseApi+ '/file/图片/'+'guanlangaoshou-20210111032150943.jpg',-->
<!--  lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'-->
<!--}">-->
<!--  </aplayer>-->
<!--  <video-player  class="video-player vjs-custom-skin"-->
<!--                 ref="videoPlayer"-->
<!--                 :playsinline="true"-->
<!--                 :options="playerOptions"-->
<!--  ></video-player>-->
</template>
<script>
import Aplayer from 'vue-aplayer'
import pdf from 'vue-pdf'
import { mapGetters } from 'vuex'
import mammoth from 'mammoth'
import XLSX from 'xlsx'
export default {
  components: {
    pdf, 'aplayer': Aplayer
  },
  data() {
    return {
      currentSrc: this.baseApi + '/file/音乐/' + 'LordHeeDictator - 君が好きだと叫びたい（好想大声说爱你）TV动画《灌篮高手》OP1（翻自 BAAD）-20210111022957610.mp3',
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      pdfSrc: '',
      // pdf加载动画
      loadingFlag: true,
      // pdf分页
      numPages: undefined,
      txtPre: '',
      vHtml: '',
      tableData: [
        {
          '接口大类': '基础信息',
          '接口类别': '人防部门',
          '接口类别ID': 'O2_001'
        },
        {
          '接口大类': '基础信息',
          '接口类别': '人防部门',
          '接口类别ID': 'O2_001'
        }
      ],
      card: [],
      cardActive: '',
      workbook: {},
      execlUrl: '',
      name: 'Music',
      songs2: [
        { id: 0,
          title: '漂洋过海来看你',
          author: '王丽坤+朱亚文',
          url: this.baseApi + '/file/音乐/' + 'LordHeeDictator - 君が好きだと叫びたい（好想大声说爱你）TV动画《灌篮高手》OP1（翻自 BAAD）-20210111022957610.mp3',
          pic: '',
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer' },
        { id: 1,
          title: '绿色',
          author: '陈香凝',
          url: '../../../../static/music/绿色-陈香凝.mp3',
          pic: '../../../../static/music/music.jpg',
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer' },
        { id: 2,
          title: '清平调',
          author: '王菲',
          url: '../../../../static/music/王菲 - 清平调.mp3',
          pic: '../../../../static/music/music.jpg',
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer' }
      ],
      urlMp4: 'http://localhost:8000' + '/file/视频/' + '院感系统1-20210111040537182.mp4',
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: 'http://localhost:8000' + '/file/视频/' + '院感系统1-20210111040537182.mp4',
          // src:  'http://localhost:8000'+'/file/视频/'+'院感系统1-20210111040537182.mp4' ,
          // url地址 http://192.168.31.142:8080/NIS/院感系统1.mp4  http://vjs.zencdn.net/v/oceans.mp4
          // src: this.baseApi+ '/file/视频/'+'院感系统1-20210111040537182.mp4',  // 路径
          type: 'video/mp4' // 类型
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  watch: {
    // cardActive (ov, nv) {
    //   this.getTable(ov)
    // }
  },
  mounted: function() {
    // this.handleGetData();
    // document.getElementById('document').addEventListener('change', this.uploading, false)
    // this.readWorkbookFromRemoteFile(this.baseApi+ '/file/音乐/'+'LordHeeDictator - 君が好きだと叫びたい（好想大声说爱你）TV动画《灌篮高手》OP1（翻自 BAAD）-20210111022957610.mp3')
  },
  methods: {
    // 获取数据
    handleGetData() {
      var sdddd = this.baseApi + '/file/文档/' + 'oracle倒库命令-20210111110216535.txt'
      console.log(sdddd)
      // 得到pdf地址后执行
      this.pdfSrc = pdf.createLoadingTask(sdddd)
      this.pdfSrc.promise.then(pdf => {
        this.numPages = pdf.numPages
      })
    },
    pageLoaded() {
      this.pageLoadNum++
      if (this.pageLoadNum == this.numPages) {
        this.loadingFlag = false
        console.log(this.pageLoadNum, this.numPages, 'pageLoaded')
      }
    },
    urlToBlob() {
      const file_url = this.baseApi + '/file/文档/' + 'oracle倒库命令-20210111110216535.txt'
      // 可以是具体.txt也可以是接口返回的blob，或者web转换
      const xhr = new XMLHttpRequest()
      xhr.open('get', file_url, true)
      xhr.responseType = 'blob'
      const self = this// onload this指向为window中转一下
      this.loading = true
      xhr.onload = function() {
        if (this.status == 200) {
          self.loading = false
          console.log(this.response)
          const reader = new FileReader()
          reader.onload = function() {
            self.txtPre = reader.result// 获取的数据data
            self.dialogvisibleview = true
            console.log('reader.result', reader.result)
          }
          reader.readAsText(this.response)
        } else {
          slef.loading = false
        }
      }
      xhr.send()
    },
    uploading(event) {
      const that = this
      var file = event.target.files[0] // 获取文件
      var reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function(e) {
        const buffer = e.target.result // 此时是arraybuffer类型
        mammoth.convertToHtml({ arrayBuffer: buffer }).then((result) => {
          console.log(result)
          that.vHtml = result.value
        }).done()
      }
    },
    readWorkbookFromRemoteFile: function(url) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'arraybuffer'
      const _this = this
      xhr.onload = function(e) {
        if (xhr.status === 200) {
          var data = new Uint8Array(xhr.response)
          var workbook = XLSX.read(data, { type: 'array' })
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
      console.log(111111111111)
      console.log(sheetName)
      var worksheet = this.workbook.Sheets[sheetName]
      this.tableData = XLSX.utils.sheet_to_json(worksheet)
      console.log(this.tableData)
    }
  }, computed: {
    ...mapGetters([
      'paperPicUploadApi',
      'baseApi'
    ])
  }
}
</script>
