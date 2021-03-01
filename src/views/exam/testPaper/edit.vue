<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>创建试卷</b>
          </span>

          <el-button size="mini" class=" header_search">打印</el-button>
        </div>
      </el-card>
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" :rules="rules">
          <el-row :gutter="6">
            <el-col :span="5" style="margin-bottom: 10px">
              <el-card class="box-card">
                <div class="border_styleBlack">
                  <div style="text-align: center;margin: 10px 0px">
                    <b>请编辑试卷信息</b>
                  </div>
                  <div style="margin-bottom: 15px;margin-left: 10px;width: 90%;">
                    <span>试卷名称：</span>
                    <el-input v-model="ruleForm.paperName" placeholder="请输入试卷名称" prop="paperName"></el-input>

                  </div>
                  <div style="text-align: center">
                    <el-radio-group v-model="ruleForm.paperType">
                      <el-radio label="0">自主选题</el-radio>
                      <el-radio label="1">随机选题</el-radio>
                    </el-radio-group>
                  </div>

                  <div style="margin-bottom: 20px;margin-left: 5px;width: 80%"></div>
                </div>
                <div class="border_styleBlack margin_top15" >
                  <div v-if="singlenSelection.length  !==undefined && singlenSelection.length > 0 ">
                    <div style="text-align: center;margin: 10px 0px">
                      <b>单选题</b>
                    </div>
                    <div style="text-align: center;margin-bottom: 5px">
                      <span>总题数：{{ singlenSelection.length }}</span>
                      <span style="margin-left: 20px">总分数：{{ singlenSelection.length * ruleForm.singleScore }}</span>
                    </div>
                    <div style="margin-bottom: 5px;width: 80%;margin:0 auto">
                      <el-input v-model="ruleForm.singleScore" placeholder="请输入单题分值" size="mini"></el-input>
                    </div>
                  </div>

                  <div v-if="multipleSelection.length  !==undefined && multipleSelection.length > 0 ">
                    <div style="text-align: center;margin: 10px 0px">
                      <b>多选题</b>
                    </div>
                    <div style="text-align: center;margin-bottom: 5px">
                      <span>总题数：{{ multipleSelection.length }}</span>
                      <span style="margin-left: 20px">总分数：{{ multipleSelection.length * ruleForm.multiScore }}</span>
                    </div>
                    <div style="margin-bottom: 5px;width: 80%;margin:0 auto">
                      <el-input v-model="ruleForm.multiScore" placeholder="请输入单题分值" size="mini"></el-input>
                    </div>
                  </div>

                  <div v-if="panduanSelection.length  !==undefined && panduanSelection.length > 0 ">
                    <div style="text-align: center;margin: 10px 0px">
                      <b>判断题</b>
                    </div>
                    <div style="text-align: center;margin-bottom: 5px">
                      <span>总题数：{{ panduanSelection.length }}</span>
                      <span style="margin-left: 20px">总分数：{{ panduanSelection.length * ruleForm.panduanScore }}</span>
                    </div>
                    <div style="width: 80%;margin:0 auto">
                      <el-input v-model="ruleForm.panduanScore" placeholder="请输入单题分值" size="mini"></el-input>
                    </div>
                  </div>

                  <div style="width: 90%;border-bottom: 1px solid #bbbbbb;margin: 15px auto"></div>
                  <div style="text-align: center;margin: 10px 0px">
                    <b>试卷</b>
                  </div>
                  <div style="text-align: center;margin-bottom: 10px">
                    <span>总题数：{{ ruleForm.questionCount }}</span>
                    <span
                      style="margin-left: 20px">总分数：{{ ruleForm.score }}</span>
                  </div>
                  <div style="width: 90%;border-bottom: 1px solid #bbbbbb;margin: 15px auto"></div>
                  <div style="margin-bottom: 15px;margin-left: 10px;width: 90%;">
                    <span>请输入及格分数：</span>
                    <el-input v-model="ruleForm.passScore" placeholder="不能大于试卷总分" size="mini"></el-input>
                  </div>
                </div>
                <div class="border_styleBlack margin_top15">
                  <div style="text-align: center">
                    <h3>logo设置</h3>
                  </div>
                  <div style="text-align: center">
                    <div class="el-upload">
                      <el-upload class="avatar-uploader"
                                 :on-success="handleSuccess"
                                 :on-error="handleError"
                                 :headers="headers"
                                 :action="imagesUploadApi"
                                 :show-file-list="false">
                        <img v-if="imageUrl"
                             :src="imageUrl ? baseApi + '/file/图片/' + '微信图片_20201225103118-20201230032602435.png' : Avatar"
                             class="avatar1">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </div>

                  <div style="margin-bottom: 20px;">
                    <h4 style="margin-left: 10px">所在位置</h4>

                    <div style="text-align: center">
                      <el-radio-group v-model="ruleForm.place" @change="histTypeUpdate">
                        <div>
                          <el-radio label="1">左上</el-radio>
                          <el-radio label="2">右上</el-radio>
                        </div>
                        <div>
                          <el-radio label="3">左下</el-radio>
                          <el-radio label="4">右下</el-radio>
                        </div>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <div style="text-align: center;margin-top: 30px">
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
                </div>
              </el-card>
            </el-col>
            <el-col :span="19" style="margin-bottom: 10px">
              <el-card class="box-card">
                <!--mainDiv-->
                <div style="position: relative;">
                  <div :class="choose">
                    <img v-if="imageUrl"
                         :src="imageUrl ? baseApi + '/file/图片/' + '微信图片_20201225103118-20201230032602435.png' : Avatar"
                         class="avatar1">
                  </div>
                  <div>
                    <div style="text-align: center;margin-top: 40px">
                      <div>
                        <h3 style="margin-left: 10px">{{ ruleForm.paperName }}</h3>
                      </div>
                      <div>
                        <b>姓名：</b><input type="text" name="name"
                                         style="border:none;border-bottom:1px solid #000;width: 100px;margin-right: 50px"/>
                        <b>科室：</b><input type="text" name="name"
                                         style="border:none;border-bottom:1px solid #000;width: 100px;margin-right: 50px"/>
                        <b>职称：</b><input type="text" name="name"
                                         style="border:none;border-bottom:1px solid #000;width: 100px;"/>
                      </div>
                    </div>

                    <div style="width: 90%;margin:auto;margin-top: 20px;">
                      <div style="border: 1px solid #bbbbbb;margin-top: 10px"
                           v-if="singlenSelection  !==undefined && singlenSelection.length > 0 ">
                        <div
                          style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                          单选题
                        </div>
                        <div style="padding-left: 20px;margin: 10px">
                          <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in singlenSelection">
                            <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>
                            <el-button size="mini" style="margin-right: 70px;float: right"
                                       @click="singlenSelection.splice(questionIndex,1)">删除
                            </el-button>
                            <div style="margin-top: 5px" v-for="item in questionItem.questItem">

                              <el-radio :label=item.prefix> {{ item.prefix }}.{{ item.content }}
                              </el-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="border: 1px solid #bbbbbb;margin-top: 10px"
                           v-if="multipleSelection  !==undefined && multipleSelection.length > 0 ">
                        <div
                          style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                          多选题
                        </div>
                        <div style="padding-left: 20px;margin: 10px">
                          <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in multipleSelection">
                            <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>
                            <el-button size="mini" style="margin-right: 70px;float: right"
                                       @click="multipleSelection.splice(questionIndex,1)">删除
                            </el-button>
                            <div style="margin-top: 5px" v-for="item in questionItem.questItem">

                              <el-radio :label=item.prefix> {{ item.prefix }}.{{ item.content }}
                              </el-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="border: 1px solid #bbbbbb;margin-top: 10px"
                           v-if="panduanSelection  !==undefined && panduanSelection.length > 0 ">
                        <div
                          style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">
                          判断题
                        </div>
                        <div style="padding-left: 20px;margin: 10px">
                          <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in panduanSelection">
                            <span>{{ questionIndex + 1 }}. {{ questionItem.questName }}</span>
                            <el-button size="mini" style="margin-right: 70px;float: right"
                                       @click="panduanSelection.splice(questionIndex,1)">删除
                            </el-button>
                            <div style="margin-top: 5px" v-for="item in questionItem.questItem">

                              <el-radio  :label=item.prefix> {{ item.prefix }}.{{ item.content }}
                              </el-radio>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 添加试题 -->
                  <div style="margin-top: 50px;height: 100px;margin: 40px">
                    <i class="el-icon-plus clolos1" @click="queryAllQuest"></i>
                    <span style="margin-left: 15px">添加试题</span>
                    <el-dialog
                      title="请选择试题"
                      :visible.sync="dialog_visible"
                      width="80%"
                      height="60%"
                      :append-to-body="true"
                    >
                      <!-- 条件查询表单 -->
                      <div class="form dialog-footer" slot="footer" >
                        <el-form :inline="true" ref="form" :model="searchForm" size="mini" style="width: 100%">
                          <!-- 查询文本框 -->
                          <el-form-item label="查询">
                            <el-input v-model="query.name" placeholder="请输入查询内容" class="search_input"></el-input>
                          </el-form-item>
                          <!-- 发布状态选择栏 -->
                          <el-form-item label="题目属性">
                            <el-select v-model="query.attribute" placeholder="请选择" class="selectWid150">
                              <el-option
                                v-for="item in attribute"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="所属分类">
                            <el-select v-model="query.catagory" placeholder="请选择" class="selectWid150">
                              <el-option
                                v-for="item in catagory"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="题目难度">
                            <el-select v-model="query.questDifficulty" placeholder="请选择" class="selectWid150">
                              <el-option
                                v-for="item in level"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
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
                          :row-key="getRowKeys"
                          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                          @selection-change="handleSelectionChange"
                          @select="selectRow">
                          <el-table-column
                            type="selection"
                            :reserve-selection="true"
                            width="55">
                          </el-table-column>
                          <el-table-column type="expand">
                            <template slot-scope="props">
                              <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="题目名称">
                                  <span>{{ props.row.questName }}</span>
                                </el-form-item>
                                <el-form-item label="属性">
                                  <span>{{ dict.label.question_type[props.row.questType] }}</span>
                                </el-form-item>
                                <el-form-item label="分类">
                                  <span>{{ dict.label.question_title[props.row.questTitle] }}</span>
                                </el-form-item>
                                <el-form-item label="难度">
                                  <span>{{ dict.label.quest_difficulty[props.row.questDifficulty] }}</span>
                                </el-form-item>
                                <el-form-item label="正确率">
                                  <span>{{ props.row.category }}</span>
                                </el-form-item>
                              </el-form>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="题目名称"
                            prop="questName">
                          </el-table-column>
                          <el-table-column
                            label="属性"
                            prop="questType">
                            <template slot-scope="props">
                              <span>{{ dict.label.question_type[props.row.questType] }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="分类"
                            prop="questTitle">
                            <template slot-scope="props">
                              <span>{{ dict.label.question_title[props.row.questTitle] }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="难度"
                            prop="desc">
                            <template slot-scope="props">
                              <span>{{ dict.label.quest_difficulty[props.row.questDifficulty] }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="正确率"
                            prop="desc">
                          </el-table-column>
                        </el-table>
                        <!--分页组件-->
                        <pagination/>
                        <div style="text-align: center;margin-top: 30px">
                          <el-button type="primary" @click="submitForm('form')">保存</el-button>
                          <el-button @click="resetForm('form')">取消</el-button>
                        </div>
                      </div>
                    </el-dialog>
                  </div>
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
      url: "api/quest/findAllQuestion",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: {...crudtestPaper},
      // queryOnPresenterCreated: false
    });
  },
  mixins: [presenter(), header()],
  // 数据字典
  dicts: ['question_type', 'question_title', 'quest_difficulty'],
  data() {
    return {
      form: {
        paperName: "",
        paperType: "",
      },
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
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        'Authorization': getToken()
      },
      show: false,
      imageUrl: '1',
      // 头像
      radio: '',
      choose: 'four',
      // 查询表单
      searchForm: {
        name: "",
        questType: "",
        questTitle: "",
        questDifficulty: "",
        state: ""
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
      catagory: [
        {
          value: "1",
          label: "手卫生",
        },
        {
          value: "2",
          label: "职业暴露",
        },
        {
          value: "3",
          label: "院感报卡",
        },
        {
          value: "4",
          label: "多重耐药菌",
        },
      ],
      level: [
        {
          value: "1",
          label: "一星",
        },
        {
          value: "2",
          label: "二星",
        },
        {
          value: "3",
          label: "三星",
        },
        {
          value: "4",
          label: "四星",
        },
        {
          value: "5",
          label: "五星",
        },
      ],
      tableData: [],
      dialog_visible: false,// 添加试题弹出窗
      currentQuest: [],
      currenSelect: [],
      panduanSelection: [],
      multipleSelection: [],
      singlenSelection: [],
      getRowKeys(row) {
        return row.questId;
      },
    }
  },
  created() {
    if (this.$route.query.user == undefined) {

    } else {
      this.ruleForm = this.$route.query.user;
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片前的过滤
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = (file.size / 1024 / 1024) < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    cropUploadSuccess(jsonData, field) {
      store.dispatch('GetInfo').then(() => {
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      const uid = file.uid
      const id = response.id
      // this.files.push({ uid, id })
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.crud.notify(msg.message, CRUD.NOTIFICATION_TYPE.ERROR)
    },
    fireRocket() {
      console.log("-----");
    },
    histTypeUpdate: function (histType) {
      switch (histType) {
        case "1":
          this.choose = "first";
          break;
        case "2":
          this.choose = "second";
          break;
        case "3":
          this.choose = "third";
          break;
        case "4":
          this.choose = "four";
          break;
        default:
          this.choose = "four";
      }
    },
    showDialog() {
      this.dialog_visible = true;
      this.singlenSelection = titleItem
    },
    handleSelectionChange(val) {
      this.currenSelect = val;
      this.singlenSelection = [];
      this.multipleSelection = [];
      this.panduanSelection = [];
      var that = this;
      this.currenSelect.forEach(q => {
        if (q.questType == '0') {
          that.singlenSelection.push(q);
        } else if (q.questType == '1') {
          that.multipleSelection.push(q);
        } else if (q.questType == '2') {
          that.panduanSelection.push(q);
        }
      })

      that.ruleForm.questionCount = that.currenSelect.length;
    },//提交试题
    submitForm(ruleForm) {
      console.log(this.ruleForm);
      var errString = "";
      if (this.ruleForm.paperName == '' || this.ruleForm.paperName == undefined || this.ruleForm.paperName == null) {
        errString += '请输入试卷名称' + '</br>'
      }
      if (this.singlenSelection.length!=0 && (this.ruleForm.singleScore == '' || this.ruleForm.singleScore == undefined || this.ruleForm.singleScore == null)) {
        errString += '请输入单选分值' + '</br>'
      }
      if (this.multipleSelection .length!=0 && (this.ruleForm.multiScore == '' || this.ruleForm.multiScore == undefined || this.ruleForm.multiScore == null)) {
        errString += '请输入多选分值' + '</br>'
      }
      if (this.panduanSelection.length!=0 && (this.ruleForm.panduanScore == '' || this.ruleForm.panduanScore == undefined || this.ruleForm.panduanScore == null)) {
        errString += '请输入判断分值' + '</br>'
      }
      if (errString != "") {
        this.$message({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: errString
        });
        return;
      }
      var that = this
      this.currenSelect.forEach(p => {
        console.log(p.questId);
        that.ruleForm.questList += p.questId + ','
      })
      if (that.ruleForm.questList.length > 0) {

        var substr  = that.ruleForm.questList.substr(0, that.ruleForm.questList.length - 1);
        console.log(substr);
        that.ruleForm.questList  = substr;
      }
      console.log(this.ruleForm.questList);
      // if (this.ruleForm.pathState != '2') {
      //

      crudtestPaper.add(this.ruleForm).then((res) => {
        console.log(res)
        that.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        that.crud.toQuery()
      }).catch(err => {
        console.log(err)
      })
      // }
    },
    queryAllQuest() {
      this.dialog_visible = true;
    },
    //点击左边表格触发事件，向右侧表格添加元素
    selectRow(selection, row) {
      this.currentQuest = row;
      console.log(this.currentQuest);
    },
    [CRUD.HOOK.afterRefresh]() {
      const table = this.crud.getTable()
      var list = this.ruleForm.questList.split(",")

      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < table.data.length; j++) {
          if (list[i] === table.data[j].questId) {//items里面包含有的都回显打勾
            this.currenSelect.push(table.data[j])
            table.toggleRowSelection(table.data[j], true);
          }
        }
      }
      console.log(this.singlenSelection);
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

<style rel="stylesheet/scss" lang="scss" scoped>
//.el-header, .el-footer {
//  background-color: #B3C0D1;
//  color: #333;
//  text-align: center;
//  line-height: 60px;
//
//}

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

.first {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100px;
  height: 100px;
  border: 1px solid #00FFFF;
}

.second {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 100px;
  height: 100px;
  border: 1px solid #00FFFF;
}

.third {
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 100px;
  height: 100px;
  border: 1px solid #00FFFF;
}

.four {
  position: absolute;
  bottom: 5px;
  right: 25px;
  width: 100px;
  height: 100px;
  //border: 1px solid #00FFFF;
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

.dialog-footer {
text-align: left;
}
.el-dialog__body {
  padding: 0px;
}
</style>
