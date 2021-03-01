<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>考试列表</b>
          </span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="当前考试" name="first">
            <div style="">
              <!-- 考试信息div-->
              <div
                style="width: 30%;height: 150px;border: 1px solid #afafaf;border-radius:10px;margin:0 30px 20px 0px;float: left"
                v-for="(value,index) in examList">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>{{ value.testName }}</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">

                      <div v-if="value.dayTime == ''">
                        <div style="color: #13ce66">考试中</div>
                        <div>{{ value.dayTime }}</div>
                      </div>
                      <div v-else style="color: #F2B206">
                        <div style="">待开始</div>
                        <div>{{ value.dayTime }}</div>
                      </div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：{{ parseTime(value.startTime) }} -
                      {{ parseTime(value.endTime) }}
                    </div>

                    <div v-if="value.answerTime == ''">
                      <div style="font-size: 13px;margin: 10px auto">考试时长： 不限时长</div>
                    </div>
                    <div v-else>
                      <div style="font-size: 13px;margin: 10px auto">考试时长：{{ value.answerTime }}分钟</div>
                    </div>
                  </div>
                  <div style="text-align: right">

                    <el-button size="mini" :disabled="value.dayTime == ''?false:true" @click="hreftwo(value)">
                      立即参与
                    </el-button>

                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="历史考试" name="second">
            <div style="display: flex">
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px;margin-right: 30px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">已结束</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px;margin-right: 30px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">待开始</div>
                      <div>10：33：23</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">待开始</div>
                      <div>10：33：23</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待确认" name="third">
            <div style="display: flex">
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px;margin-right: 30px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">待确认</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px;margin-right: 30px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">待开始</div>
                      <div>10：33：23</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
              <!-- 考试信息div-->
              <div style="width: 330px;height: 150px;border: 1px solid #afafaf;border-radius:10px">
                <div style="margin:0px 10px">
                  <div style="display: flex;margin: 10px 0px;align-items: center;justify-content: center;height: 28px">
                    <div style="text-align: center;width: 65%">
                      <span><b>院感护士第三次等级考试</b></span>
                    </div>
                    <div style="text-align: right;width: 35%;font-size: 13px">
                      <div style="">待开始</div>
                      <div>10：33：23</div>
                    </div>
                  </div>
                  <div style="margin: 0px auto;width: 95%">
                    <div style="font-size: 13px;margin: 25px auto 10px">考试时间：2020-12-06 10:30-2020-12-06 12:30</div>
                    <div style="font-size: 13px;margin: 10px auto">考试时长：120分钟</div>
                  </div>
                  <div style="text-align: right">
                    <el-button size="mini">立即参与</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>

import pagination from "@crud/Pagination";
import {mapGetters} from 'vuex'
import {getToken} from '@/utils/auth'
import store from '@/store'
import myUpload from 'vue-image-crop-upload'
import CRUD, {presenter, header} from "@crud/crud";
import rrOperation from '@crud/RR.operation'
import crudtestPaper from '@/api/yuangan/testPaper'

export default {
  components: {pagination, myUpload, rrOperation},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/exam/findAllTestExam",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: {...crudtestPaper},
      // queryOnPresenterCreated: false
    });
  },
  mixins: [presenter(), header()],
  data() {
    return {
      form: {
        id: '',
        paperName: '',
        paperType: "0",
        score: '',
        questionCount: '',
        singleScore: '',
        multiScore: '',
        panduanScore: '',
        passScore: '',
        avatarpath: '',
        place: '4',
        questList: '',
      },
      examList: [],
      headers: {
        'Authorization': getToken()
      },
      activeName: 'first'
    }
  },
  created() {
    this.timer();
  },
  watch: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    countDownFun(time) {
      time--; //时间一秒秒的减
      let nowTime = new Date().getTime(); //现在时间
      if (nowTime <= time) {
        //获取时间差
        let timediff = Math.round((time - nowTime) / 1000);
        //获取还剩多少天
        let day = parseInt(timediff / 3600 / 24);
        //获取还剩多少小时
        let hour = parseInt((timediff / 3600) % 24);
        //获取还剩多少分钟
        let minute = parseInt((timediff / 60) % 60);
        //获取还剩多少秒
        let second = timediff % 60;
        return day + "天" + hour + "小时" + minute + "分" + second + "秒";
      } else {
        return "";
      }
    },
    timer() {
      //页面多个定时器 //主要逻辑都在这页面更新
      let _that = this;
      this.temp = setInterval(() => {
        this.examList.forEach((item, index) => {
          item.dayTime = _that.countDownFun(item.endTime);
          this.$set(this.examList, item.dayTime, _that.countDownFun(item.endTime));
          console.log(this.temp, "6");
        });
      }, 1000);
    },
    hreftwo(value) {
      console.log(value);
      let testname = value.testName;
      let paperId = value.paperId;
      this.$router.push({path: '/exam/qttestpaper/inpaper',query: { name: testname,paperId :paperId } })
    },
    [CRUD.HOOK.afterRefresh](crud, form) {
      console.log(crud.data);
      this.examList = crud.data;
    },
  },
  destroyed() {
    //切记页面销毁需要销毁
    clearInterval(this.temp);
    console.log(this.temp, "销毁");
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ]),
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;

}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.border_styleBlack {
  border: 1px solid black
}

.margin_top15 {
  margin-top: 15px;
}

</style>
