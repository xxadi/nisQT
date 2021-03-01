<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>请填写考试信息</b>
          </span>

        </div>
      </el-card>
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" :rules="rules">
          <el-row :gutter="6">
            <el-col :span="24" style="margin-bottom: 10px">
              <el-card class="box-card">
                <!--mainDiv-->
                <div style="position: relative;">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" size="mini">
                    <el-form-item label="考试名称：" prop="questTitle">
                      <el-col :span="12">
                        <el-input v-model="ruleForm.testName" placeholder="请输入考试内容"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="请选择人员：" prop="filePathList" label-width="120px">
                      <el-table
                        id="elTable"
                        :data="ruleForm.filePathList"
                        stripe
                        border
                        style="width: 80%; display: none"
                        :max-height="tableHeight"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                      >
                        <el-table-column prop="id" label="工号" width=""/>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          :show-overflow-tooltip="true"
                        />
                        <el-table-column prop="dept" label="所属科室"/>
                        <el-table-column prop="job_type" label="职称"/>
                        <el-table-column prop="state" label="操作">
                          <template slot-scope="scope">
                            <el-button
                              style="color: red"
                              type="text"
                              size="small"
                              @click.native.prevent="deleteRow(scope.$index, scope.row.id)"
                            >删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div @click="showDialog" style="width: 130px;margin-top: 5px">
                        <i class="el-icon-plus clolos1"/>
                        <span>     添加可见人员</span>
                      </div>

                      <el-dialog
                        title="添加用户"
                        :visible.sync="dialog_visible"
                        width="50%"
                        :append-to-body="true"
                      >
                        <GroupA-vue ref="mychild" @func="getPerson" @closeForm="resetForm('ruleForm')"/>
                      </el-dialog>
                    </el-form-item>
                    <!-- 请选择试卷-->
                    <el-form-item label="请选择试卷：" prop="paperId">
                      <el-table
                        id="elTablesj"
                        :data="ruleForm.shijuan"
                        stripe
                        border
                        style="width: 50%; display: none"
                        :max-height="tableHeight"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                      >
                        <el-table-column
                          prop="paperName"
                          label="试卷名称"
                          :show-overflow-tooltip="true"
                        />
                        <el-table-column prop="state" label="操作">
                          <template slot-scope="scope">
                            <el-button
                              style="color: red"
                              type="text"
                              size="small"
                              @click.native.prevent="deletePaperRow(scope.$index, scope.row.id)"
                            >删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div @click="showPaperDialog" style="width: 130px">
                        <i class="el-icon-plus clolos1"/>
                        <span>     添加试卷</span>
                      </div>

                      <el-dialog
                        title="添加试卷"
                        :visible.sync="dialog_Papervisible"
                        width="80%"
                        height="60%"
                        :append-to-body="true"
                      >
                        <!-- 条件查询表单 -->
                        <div class="form">
                          <el-form :inline="true" ref="form" size="mini" style="width: 100%">
                            <!-- 查询文本框 -->
                            <el-form-item label="查询">
                              <el-input clearable v-model="query.name" placeholder="请输入试卷名称"
                                        class="search_input"></el-input>
                            </el-form-item>
                            <!-- 发布状态选择栏 -->
                            <el-form-item label="创建时间">
                              <el-date-picker
                                v-model="query.date"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                              </el-date-picker>
                            </el-form-item>
                            <el-form-item label="试卷状态">
                              <el-select clearable v-model="query.state" placeholder="请选择" class="selectWid150">
                                <el-option
                                  v-for="item in state"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="创建人">
                              <el-select clearable v-model="query.userId" placeholder="请选择" class="selectWid150">
                                <el-option
                                  v-for="item in level"
                                  :key="item.userId"
                                  :label="item.nickName"
                                  :value="item.userId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <!-- 查询重置操作按钮 -->
                            <div class="btn_fabu">
                              <rrOperation/>
                            </div>
                          </el-form>
                          <el-table
                            :data="crud.data"
                            style="width: 100%"
                            ref="table"
                            border
                            stripe
                            @row-click="rowClick"
                            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                          >
                            <el-table-column label width="35">
                              <template slot-scope="scope">
                                <el-radio :label="scope.row.paperName" v-model="radioId">&nbsp;</el-radio>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="试卷名称"
                              prop="paperName">
                            </el-table-column>
                            <el-table-column
                              label="创建时间"
                              prop="createTime">
                              <template slot-scope="props">
                                <span>{{ props.row.createTime }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="创建人"
                              prop="nickName">
                              <template slot-scope="props">
                                <span>{{ props.row.nickName }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="总分值"
                              prop="score">
                            </el-table-column>
                            <el-table-column
                              label="试卷状态"
                              prop="state">
                              <template slot-scope="props">
                                <span>{{ props.row.state }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                          <!--分页组件-->
                          <pagination/>
                          <div style="text-align: center;margin-top: 30px">
                            <el-button type="primary" @click="addPaper">保存</el-button>
                            <el-button @click="resetForm('form')">取消</el-button>
                          </div>
                        </div>
                      </el-dialog>
                    </el-form-item>
                    <!-- 考试时间-->
                    <el-form-item label="考试时间：" required>
                      <el-date-picker
                        v-model="ruleForm.startTime"
                        type="datetime"
                        placeholder="选择日期">
                      </el-date-picker>
                      -
                      <el-date-picker
                        v-model="ruleForm.endTime"
                        type="datetime"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <!-- 答卷时长-->
                    <el-form-item label="答卷时长：">
                      <!-- 单选按钮的文字和input组合 -->
                      <div>
                        <el-radio-group v-model="ruleForm.timeType" @change="changeHandler">
                          <el-radio class="radio" label="" style="margin: 0px"></el-radio>
                          <el-input
                            v-model="ruleForm.answerTime"
                            style="width:100px;"
                            placeholder="请输入整数"
                            :disabled="isAble"
                          ></el-input>
                          <span style="font-size: 10px;"> min</span>
                          <el-radio class="radio" label="1" style="margin-left: 20px">不限时长</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <!-- 考试说明-->
                    <el-form-item label="考试说明：">
                      <el-col :span="12">
                        <el-input height=100px type="textarea" v-model="ruleForm.testExplan"
                                  placeholder="请输入考试说明"></el-input>
                      </el-col>
                    </el-form-item>
                    <!-- 考试公告发布-->
                    <el-form-item label="考试公告发布：" prop="questResult">
                      <el-date-picker
                        v-model="ruleForm.publicTime"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm',ruleForm)">发布</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
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
import crudtestExam from '@/api/yuangan/testExam'
import GroupA from '../../common/groupList'

export default {
  components: {pagination, rrOperation, 'GroupA-vue': GroupA},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/testPaper/findAllTestPaper",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: {...crudtestExam},
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
        filePathList: [],
        paperList: [],
        shijuan: [],
        timeType:"",
        answerTime:''
      },
      rules: {
        paperName: [
          {required: true, message: '请输入试卷名称', trigger: 'blur'}
        ],
        subjectId: [
          {required: true, message: '请选择学科', trigger: 'change'}
        ],
        paperType: [
          {required: true, message: '请选择试卷类型', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入试卷名称', trigger: 'blur'}
        ],
        suggestTime: [
          {required: true, message: '请输入建议时长', trigger: 'blur'}
        ]
      },
      //下拉框选项
      attribute: [
        {
          value: "0",
          label: "单选题",
        },
        {
          value: "1",
          label: "多选题",
        },
        {
          value: "2",
          label: "判断题",
        },
      ],
      state: [
        {
          value: "0",
          label: "停用",
        },
        {
          value: "1",
          label: "显示",
        },
      ],
      level: [
        {
          value: "",
          label: "",
        },
      ],
      headers: {
        'Authorization': getToken()
      },
      isAble: false,
      tableHeight: 0,
      filePathList: [],
      dialog_visible: false,
      dialog_Papervisible: false,
      selectioned: '',//单选中的值
      radioId: '',
      nowRow: {}
    }
  },
  created() {
    // 获取所有人员列表
    // crudtestExam.findAllPerson().then(res => {
    //   console.log(res.content);
    //   this.level = res.content
    // }).catch(() => {
    // })
    if (this.$route.query.user == undefined) {

    } else {
      this.ruleForm = this.$route.query.user;
      this.ruleForm.filePathList = [];
      this.ruleForm.shijuan = [];
      this.ruleForm.shijuan.push({"paperName":this.ruleForm.paperName});

      console.log(this.ruleForm);
    }
  },
  watch: {
    count(val) {
      this.ruleForm.score = val;
    }
  },
  methods: {
    handleRemove(file, fileList) {

    },
    changeHandler(value) {
      console.log('改变之后的值是:' + value)
      if (value === "1") {
        this.isAble = true;
        this.ruleForm.answerTime = ""
      } else {
        this.isAble = false;
      }
    },
    showDialog() {
      this.dialog_visible = true
    },
    showPaperDialog() {
      // 获取所有试卷列表
      crudtestExam.findAllTestPaper().then(res => {
        console.log(res.content);
        this.ruleForm.paperList = res.content
      }).catch(() => {
      })
      this.dialog_Papervisible = true
    },
    getPerson(data) {
      console.log(data)
      var keyMap = {PERSON_ID: 'id', USERNAME: 'name'}
      for (var i = 0; i < data.length; i++) {
        var obj = data[i]
        for (var key in obj) {
          var newKey = keyMap[key]
          if (newKey) {
            obj[newKey] = obj[key]
            delete obj[key]
          }
        }
      }
      this.ruleForm.seen = data
      this.dialog_visible = false
      console.log(this.ruleForm.filePathList);
      if (this.ruleForm.filePathList.length == 0) {
        this.ruleForm.filePathList = data.slice(0)
      } else {
        var c = this.ruleForm.filePathList.concat(data.slice(0))
        var newArr = this.deWeightFour(c)
        this.ruleForm.filePathList = Array.from(newArr)
      }
      console.log(this.ruleForm.filePathList)

      if (this.ruleForm.filePathList.length == 0) {
        document.getElementById('elTable').style.display = 'none'
      } else {
        document.getElementById('elTable').style.display = 'block'
      }
    },
    deWeightFour(arr4) {
      var obj = {}
      arr4 = arr4.reduce(function (a, b) {
        obj[b.id] ? '' : (obj[b.id] = true && a.push(b))
        return a
      }, [])
      return arr4
    },
    // 删除一行通知列表表单的数据
    deleteRow(index, noId) {
      console.log(noId)
      for (let i = 0; i < this.ruleForm.filePathList.length; i++) {
        if (this.ruleForm.filePathList[i].id == noId) {
          this.ruleForm.filePathList.splice(i, 1)
        }
      }
    },
    // 删除一行通知列表表单的数据
    deletePaperRow(index, noId) {
      console.log(noId)
      for (let i = 0; i < this.ruleForm.shijuan.length; i++) {
        if (this.ruleForm.shijuan[i].id == noId) {
          this.ruleForm.shijuan.splice(i, 1)
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log(formName);
      if (formName == "form") {
        console.log(formName);
        this.dialog_Papervisible = false
      } else {

        this.dialog_visible = false
      }
    },
    //添加试卷
    addPaper() {
      this.ruleForm.shijuan = [];
      this.ruleForm.shijuan.push(this.nowRow);
      this.ruleForm.paperId = this.nowRow.id;
      this.dialog_Papervisible = false
      if (JSON.stringify(this.ruleForm.shijuan) == "{}") {
        document.getElementById('elTablesj').style.display = 'none'
      } else {
        document.getElementById('elTablesj').style.display = 'block'
      }
    },
    rowClick(row) {
      console.log(row)
      this.nowRow = row;
      this.radioId = row.paperName;
    },
    submitForm() {

      var peronStr = "";
      for(var j = 0,len=this.ruleForm.filePathList.length; j < len; j++) {
        peronStr += this.ruleForm.filePathList[j].id + ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
      if (peronStr.length > 0) {
        peronStr = peronStr.substr(0,peronStr.length - 1);
      }
      this.ruleForm.personList = peronStr;
      var that = this
      crudtestExam.add(this.ruleForm).then((res) => {
        console.log(res)
        that.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        that.crud.toQuery()
      }).catch(err => {
        console.log(err)
      })
    },
    [CRUD.HOOK.afterRefresh]() {
      if (JSON.stringify(this.ruleForm.shijuan) == "{}") {
        document.getElementById('elTablesj').style.display = 'none'
      } else {
        document.getElementById('elTablesj').style.display = 'block'
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 50
      // 后面的50：根据需求空出的高度，自行调整
    })
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ]),
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
body .el-table th.gutter {
  display: table-cell !important;
}

.border_styleBlack {
  border: 1px solid black
}

.margin_top15 {
  margin-top: 15px;
}

.avatar1 {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.el-icon-plus {
  //color: #fff !important;
}

.clolos1 {
  ///*width: 13px;*/
  height: 30px;
  background: #132bae;
  line-height: 30px;
  padding: 0 8px;
  border-radius: 15px;
  color: #fff;
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

.has-gutter {
  .el-checkbox {
    display: none !important;

  }
}

.dialog-footer {
  text-align: left;
}

</style>
