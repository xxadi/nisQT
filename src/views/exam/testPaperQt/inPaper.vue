<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;font-size: 15px;">
            <b>{{testName}}</b>
          </span>

          <div class=" header_search" style="font-size: 15px;color: #13ce66"><b>进行中</b></div>
        </div>
      </el-card>
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-row :gutter="6">
            <!--左侧-->
            <el-col :span="5" style="margin-bottom: 10px">
              <el-card class="box-card">
                <div class="border_styleBlack">
                  <div style="text-align: center;margin: 10px 0px">
                    <b>答题卡</b>
                  </div>
                  <div style="margin: 20px 10px 10px 15px; width: 90%;font-size: 13px;"
                       v-if="ruleForm.singlenSelection  !==undefined && ruleForm.singlenSelection.length > 0 ">
                    <div>单选题</div>
                    <div style="text-align: center">(共10题，合计20分)</div>
                    <div>
                      <span v-for="(questionItem,questionIndex) in ruleForm.singlenSelection">
                        <span class="do-exam-title-tag el-tag  el-tag--medium"
                              v-if="questionItem.score==''">
                          {{ questionIndex + 1 }}

                        </span>
                         <span class="do-exam-title-tag el-tag  el-tag--medium" style="background-color: #e1e1e8" v-else>
                           {{
                             questionIndex + 1
                           }}</span>

                      </span>

                    </div>

                  </div>
                  <div style="width: 90%;border-bottom: 1px solid #bbbbbb;margin: 15px auto"></div>
                  <div style="margin: 20px 10px 10px 15px; width: 90%;font-size: 13px;"
                       v-if="ruleForm.multipleSelection  !==undefined && ruleForm.multipleSelection.length > 0 ">
                    <div>多选题</div>
                    <div style="text-align: center">(共10题，合计20分)</div>
                    <div>
                      <span v-for="(questionItem,questionIndex) in ruleForm.multipleSelection">
                           <span class="do-exam-title-tag el-tag  el-tag--medium"
                                 v-if="questionItem.correctArray.length == 0">{{
                               questionIndex + 1
                             }}</span>
                         <span class="do-exam-title-tag el-tag  el-tag--medium" style="background-color: #e1e1e8" v-else>
                           {{
                             questionIndex + 1
                           }}</span>
                      </span>

                    </div>

                  </div>
                  <div style="width: 90%;border-bottom: 1px solid #bbbbbb;margin: 15px auto"></div>
                  <div style="margin: 20px 10px 10px 15px; width: 90%;font-size: 13px;"
                       v-if="ruleForm.panduanSelection  !==undefined && ruleForm.panduanSelection.length > 0 ">
                    <div>判断题</div>
                    <div style="text-align: center">(共10题，合计20分)</div>
                    <div>
                      <span>
                        <span class="do-exam-title-tag el-tag  el-tag--medium"
                              v-for="(questionItem,questionIndex) in ruleForm.panduanSelection">{{ questionIndex + 1 }}</span>
                      </span>

                    </div>

                  </div>
                  <div style="margin-bottom: 20px;margin-left: 5px;width: 80%"></div>
                </div>
              </el-card>
            </el-col>
            <!-- 中间 -->
            <el-col :span="14" style="margin-bottom: 10px">
              <el-card class="box-card">
                <!--mainDiv-->
                <div style="position: relative;">
                  <div>
                    <div style="margin-top: 40px">
                      <div style="">
                        <div style="border: 1px solid #bbbbbb;"
                             v-if="ruleForm.singlenSelection  !==undefined && ruleForm.singlenSelection.length > 0 ">
                          <div
                            style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                            单选题
                          </div>
                          <div style="padding-left: 20px;margin: 10px">
                            <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in ruleForm.singlenSelection">
                              <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>

                              <div style="margin-top: 5px" v-for="item in questionItem.questItem">
                                <el-radio-group v-model="questionItem.score">
                                  <el-radio :label=item.prefix > {{ item.prefix }}.{{
                                      item.content
                                    }}
                                  </el-radio>
                                </el-radio-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style="border: 1px solid #bbbbbb;margin-top: 10px"
                             v-if="ruleForm.multipleSelection  !==undefined && ruleForm.multipleSelection.length > 0 ">
                          <div
                            style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                            多选题
                          </div>
                          <div style="padding-left: 20px;margin: 10px">
                            <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in ruleForm.multipleSelection">
                              <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>

                              <div style="margin-top: 5px" v-for="item in questionItem.questItem">
                                <el-checkbox-group v-model="questionItem.correctArray">
                                  <el-checkbox :label=item.prefix> {{ item.prefix }}.{{ item.content }}
                                  </el-checkbox>
                                </el-checkbox-group>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style="border: 1px solid #bbbbbb;margin-top: 10px"
                             v-if="ruleForm.panduanSelection  !==undefined && ruleForm.panduanSelection.length > 0 ">
                          <div
                            style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                            判断题
                          </div>
                          <div style="padding-left: 20px;margin: 10px">
                            <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in ruleForm.panduanSelection">
                              <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>

                              <div style="margin-top: 5px" v-for="item in questionItem.questItem">

                                <el-radio :label=item.prefix> {{ item.prefix }}.{{ item.content }}
                                </el-radio>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!--右侧-->
            <el-col :span="5" style="margin-bottom: 10px">
              <el-card class="box-card">
                <div class="border_styleBlack textCenter">
                  <div style="margin: 10px 0px">
                    <b>剩余时间</b>
                  </div>
                  <div style="margin: 10px 0px">
                    <span>00:59:59</span>
                  </div>

                  <div style="margin: 30px 0px">
                    <span>答题进度</span>
                    <div style="    margin: 20px auto;width: 70%;">
                      <el-progress :percentage="50" :show-text="false"></el-progress>
                    </div>

                  </div>
                  <div style="margin: 10px 0px">
                    <span>及格分数</span>
                  </div>
                  <div style="margin: 10px auto 30px">
                    <span>60分</span>
                  </div>

                  <el-button @click="submitForm('ruleForm')">
                    提交试卷
                  </el-button>
                  <div style="margin-bottom: 20px;margin-left: 5px;width: 80%"></div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import pagination from "@crud/Pagination";
import {mapGetters} from 'vuex'
import {getToken} from '@/utils/auth'
import CRUD, {presenter, header} from "@crud/crud";
import rrOperation from '@crud/RR.operation'
import crudtestPaper from '@/api/yuangan/testPaper'


export default {
  components: {pagination, rrOperation},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/quest/findAllQuestion",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: {...crudtestPaper},
      // queryOnPresenterCreated: false
    });
  },
  mixins: [presenter(), header()],
  data() {
    return {
      ruleForm: {
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
      headers: {
        'Authorization': getToken()
      },
      tableData: [],
      dialog_visible: false,// 添加试题弹出窗
      currentQuest: [],
      currenSelect: [],
      panduanSelection: [],
      multipleSelection: [],
      singlenSelection: [],
      testName:"",
      getRowKeys(row) {
        return row.questId;
      },
    }
  },
  created() {
    console.log(this.$route.query.name);
    console.log(this.$route.query.paperId);
    if (this.$route.query.name == undefined) {

    } else {
      this.testName = this.$route.query.name;
      console.log(this.$route.query.paperId);
      if (this.$route.query.paperId != undefined) {
        this.queryById(this.$route.query.paperId)
      }

    }
  },
  watch: {},
  methods: {
    handleRemove(file, fileList) {
    },
    queryById(id) {
      const _that = this
      crudtestPaper.findAllTestPaperById(id).then((res) => {
        this.ruleForm = res.content[0];
        this.ruleForm.panduanSelection = [];
        this.ruleForm.multipleSelection = [];
        this.ruleForm.singlenSelection = [];

        console.log("this.ruleForm")
        console.log(this.ruleForm)
        res.content[0].questListBank.forEach(q => {
          q.score = '';
          q.correctArray = [];
          if (q.questType == '0') {
            _that.ruleForm.singlenSelection.push(q);
          } else if (q.questType == '1') {
            _that.ruleForm.multipleSelection.push(q);
          } else if (q.questType == '2') {
            _that.ruleForm.panduanSelection.push(q);
          }
          console.log(_that.ruleForm.singlenSelection)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm(ruleForm) {
      console.log(this.ruleForm);
      crudtestPaper.answerSubmit(this.ruleForm).then((res) => {
        console.log(res)
        that.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        that.crud.toQuery()
      }).catch(err => {
        console.log(err)
      })
    },
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ]),
    count() {
      return this.singlenSelection.length * this.ruleForm.singleScore + this.multipleSelection.length * this.ruleForm.multiScore + this.panduanSelection.length * this.ruleForm.panduanScore;
    }
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

.header_logo {
  flex: 3;
  display: flex;
  justify-content: left;
  margin-left: 60px;
  width: 100px;
}

.header_search {
  display: flex;
  float: right;
}

.border_styleBlack {
  border: 1px solid black;
  width: 200px;
  margin: 0px auto;
}

.margin_top15 {
  margin-top: 15px;
}

/* 按钮靠右 */
.btn_fabu {
  float: right;
}

.selectWid150 {
  width: 130px !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.do-exam-title-tag {
  margin: 5px 5px 5px 0;
  cursor: pointer;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
  //background-color: #e1f3d8;
  //float: left;
}

.el-tag--medium {
  //height: 28px;
  //line-height: 26px;
}

.el-tag {
  background-color: #ffffff;
  //border-color: #d1e9ff;
  //display: inline-block;
  //height: 32px;
  //padding: 0 10px;
  //line-height: 30px;
  //font-size: 12px;
  //color: #1890ff;
  //border-width: 1px;
  //border-style: solid;
  //border-radius: 4px;
  //-webkit-box-sizing: border-box;
  //box-sizing: border-box;
  //white-space: nowrap;
}

.textCenter {
  text-align: center
}
</style>
