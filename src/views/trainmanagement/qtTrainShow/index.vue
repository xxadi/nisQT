<template>
  <div>
    <!-- 条件查询表单 -->
    <div class="form">
      <el-form :inline="true" ref="form" :model="searchForm" size="mini" style="width: 100%">
        <span style="font-size:15px; font-weight:bold">培训筛选</span>
        <br/>
        <br/>
        <!-- 查询文本框 -->
        <el-form-item label="查询">
          <el-input v-model="query.name" placeholder="请输入培训资料名字" class="search_input"></el-input>
        </el-form-item>
        <!-- 发布状态选择栏 -->
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="query.createTime"
            value-format="MM/dd/yyyy HH:mm"
            align="right"
            type="datetime"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            default-time="00:00:00">
          </el-date-picker>
          -
          <el-date-picker
            v-model="query.endTime"
            align="right"
            type="datetime"
            value-format="MM/dd/yyyy HH:mm"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            default-time="23:59:59">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="培训状态">
          <el-select v-model="query.fileState" placeholder="请选择" class="selectWid150">
            <el-option
              v-for="item in fileState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 查询重置操作按钮 -->
        <div class="btn_fabu">
          <rrOperation/>
        </div>
      </el-form>
    </div>
    <!--试题列表展示表格-->
    <div class="table">
      <span style="font-size:15px; font-weight:bold">培训列表</span>
      <br/>
      <br/>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-table :data="crud.data.filter(x=>x.pathState!='2')" border stripe size="mini" style="width: 100%"
                                                          :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column prop="fileName" label="文章名字" align="center">
            <template slot-scope="scope">
              <router-link
                :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row , cardType:2 } }"
              >
                <el-button
                  type="text" size="small">{{ scope.row.fileName }}
                </el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="uploadTime" label="发布时间" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.uploadTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileState" label="培训状态" align="center" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.pathState==='2'" style="color: limegreen;font-weight: bold">已完成</span>
              <span v-else-if="scope.row.pathState==='1'" style="color: sandybrown;font-weight: bold">未完成</span>
              <span v-else style="color: #00b7ee;font-weight: bold">待开始</span>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">

              <router-link  v-if="scope.row.pathState==='2'"
                :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row } }"
              >
                <el-button
                  style="color: black;font-weight: bold"
                  type="text"
                  size="small"
                >查看详情
                </el-button>
              </router-link>
              <router-link v-else
                           :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row } }"
              >
                <el-button
                  style="color: limegreen;font-weight: bold"
                  type="text"
                  size="small"
                >去培训
                </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
          <div class="block">
            <pagination/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史培训" name="second">
          <el-table :data="doneTable" border stripe size="mini" style="width: 100%"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="fileName" label="文章名字" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row , cardType:2 } }"
                >
                  <el-button
                    type="text" size="small">{{ scope.row.fileName }}
                  </el-button>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="uploadTime" label="发布时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.uploadTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fileState" label="培训状态" align="center" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.pathState==='2'" style="color: limegreen;font-weight: bold">已完成</span>
                <span v-else-if="scope.row.pathState==='1'" style="color: sandybrown;font-weight: bold">未完成</span>
                <span v-else style="color: #00b7ee;font-weight: bold">待开始</span>
              </template>
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">

                <router-link  v-if="scope.row.pathState==='2'"
                              :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row } }"
                >
                  <el-button
                    style="color: black;font-weight: bold"
                    type="text"
                    size="small"
                  >查看详情
                  </el-button>
                </router-link>
                <router-link v-else
                             :to="{ path: '/trainmanag/qtTrainShow/edit', query: { user: scope.row } }"
                >
                  <el-button
                    style="color: limegreen;font-weight: bold"
                    type="text"
                    size="small"
                  >去培训
                  </el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="doneTable.length">
          </el-pagination>
        </el-tab-pane>

      </el-tabs>


      <br/>
      <br/>

    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
.form {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.table {
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 按钮靠右 */
.btn_fabu {
  float: right;
}

/* 按钮颜色 */
.button {
  color: #fff;
  background-color: #132bae;
  border-color: #132bae;
}

.question-item-content-input {
  margin-left: 8px;
  width: 60%;
}

.bukebianji {
  /*width: 17px;*/
  /*color: #000;*/
  /*padding: 0 20px;*/
  /*margin: 0 5px;*/
  /*border-bottom: 1px solid #b6b6b6;*/
  /* user-select: none; */
  /*pointer-events: none;*/
  /*-webkit-user-modify: read-only;*/
  readonly: "readonly"
}

.selectWid150 {
  width: 130px !important;
}
</style>

<script>
import rrOperation from '@crud/RR.operation'
import crudgQuestion, { queryAllQuestion } from '@/api/yuangan/trainManager'
import CRUD, { presenter, header } from '@crud/crud'
import pagination from '@crud/Pagination'
import MyEditor from '@/components/editor/MyEditor.vue'
import {mapGetters} from "vuex";

export default {
  components: { pagination, rrOperation, MyEditor },
  cruds() {
    return CRUD({
      title: '试题',
      url: 'api/trainManager/findFileListById',
      sort: ['jobSort,asc', 'id,desc'],
      crudMethod: { ...crudgQuestion }
    })
  },
  mixins: [presenter(), header()],
  data() {
    return {
      // 分页数据
      //默认每页数据量
      pageSize: 10,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1000,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      fileState: [
        {
          value: '1',
          label: '未完成'
        },
        {
          value: '0',
          label: '待开始'
        }
      ],
      activeName: 'first',
      // 查询表单
      searchForm: {
        name: '',
        questType: '',
        questTitle: '',
        questDifficulty: '',
        state: '',
        timeList: '',
        createTime: new Date(),
        endTime: new Date()
      },
      doneTable:[]
    }
  },
  created() {
    // 获取所有通知列表
    // console.log(this.user);
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  methods: {
    //添加选项
    add() {
      this.ruleForm.answer.push({})
    },
    stopUse(data) {
      console.log(data.questId)
      this.$confirm('此操作将停用' + data.questName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudgQuestion.stop(data).then(res => {
          this.crud.notify('停用成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          data.questState = '0'
        }).catch(() => {
          data.questState = '0'
        })
      }).catch(() => {
        data.questState = '0'
      })
    },
    StartUse(data) {
      console.log(data.questId)
      this.$confirm('此操作将启用' + data.questName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudgQuestion.start(data).then(res => {
          this.crud.notify('启用成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          data.questState = '1'
        }).catch(() => {
          data.questState = '1'
        })
      }).catch(() => {
        data.questState = '1'
      })
    },
    deleteUse(data) {
      console.log(data.questId)
      this.$confirm('此操作将删除' + data.questName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudgQuestion.del(data).then(res => {
          this.crud.notify('删除成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          this.crud.refresh()
        }).catch(() => {

        })
      }).catch(() => {

      })
    },
    //提交试题
    submitForm(ruleForm, form) {
      var that = this
      console.log(form)
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(valid)
          if (this.ruleForm.questType == '1') {
            this.ruleForm.questResult = this.ruleForm.correctArray.join(',')
          }
          if (this.ruleForm.questType == '3') {
          }
          crudgQuestion.add(form).then((res) => {
            console.log(res)
            this.crud.notify('创建成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
            this.crud.toQuery()
          }).catch(err => {
            console.log(err.data.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.ruleForm = {
            questTitle: '',
            questDifficulty: '',
            questType: '',
            questName: '',
            questItem: [
              { prefix: 'A', content: '' },
              { prefix: 'B', content: '' },
              { prefix: 'C', content: '' },
              { prefix: 'D', content: '' }
            ],
            questAnalysis: '',
            correctArray: [],
            score: '1'
            // trueAnswer: "",
            // answer: [],
          }
        })
        .catch((_) => {
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 编辑
    toUpdateNote: function(id) {
      let _that = this
      this.dialogFormVisible = true
      console.log(id)
      const user = {
        questId: id
      }
      crudgQuestion.queryQuestionListById(user).then((res) => {
        console.log(res)
        // this.crud.notify('编辑成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        _that.ruleForm = res
        _that.ruleForm.questItem = res.questItem[0]
        console.log(_that.ruleForm)
        console.log(_that.ruleForm.questName)
        console.log(_that.ruleForm.questItem[0])
        if (_that.ruleForm.questType == '1') {
          _that.ruleForm.correctArray = []
          // _that.ruleForm.correctArray.push(_that.ruleForm.questResult);
          _that.ruleForm.correctArray = this.ruleForm.questResult.split(',')
        } else if (_that.ruleForm.questType == '0' || _that.ruleForm.questType == '2' || _that.ruleForm.questType == '3') {
          _that.ruleForm.correctResult = _that.ruleForm.questResult
          _that.ruleForm.correctArray = []
        }
      }).catch(err => {
        console.log(err)
        console.log(err.data.message)
      })
    },
    // 条件查询重置按钮
    onCancel() {

    },
    questionItemRemove(index) {
      this.ruleForm.questItem.splice(index, 1)
      this.ruleForm.correctArray.splice(index, 1)
    },
    radioChange: function(val) {
      let that = this
      if (this.ruleForm.questType == '2') {
        this.ruleForm.questItem = [
          { id: null, prefix: 'A', content: '是' },
          { id: null, prefix: 'B', content: '否' }
        ]
      } else if (this.ruleForm.questType == '3') {
        this.ruleForm.questItem = []
        var regex1 = /\((.+?)\)/g   // () 小括号
        var items = this.ruleForm.questName.match(regex1)
        if (items != null) {
          for (var i = 0; i < items.length; i++) {
            this.ruleForm.questItem.push({ prefix: i + '1', content: '' })
          }
        }
      } else {
        this.ruleForm.questItem = [
          { prefix: 'A', content: '' },
          { prefix: 'B', content: '' },
          { prefix: 'C', content: '' },
          { prefix: 'D', content: '' }
        ]
      }

    },
    // 获取文本编辑器的内容
    change(val) {
      var regex1 = /\((.+?)\)/g   // () 小括号
      console.log('editor中，题目内容： ' + val)
      console.log('editor： ' + val.match(regex1))
      var items = val.match(regex1)
      console.log(items)
      var temp = this.ruleForm.questItem
      this.ruleForm.questItem = []
      if (items != null) {
        this.beforeKuohao = this.ruleForm.questItem
        for (var i = 0; i < items.length; i++) {
          this.ruleForm.questItem.push({ prefix: i + '1', content: '' })
        }
      }
    },
    confirmForm() {
      this.dialogInputVisible = false
      // this.ruleForm.questName =   this.ruleForm.questionContent;
    },
    handleClick(tab, event) {
      if(tab.index === '1'){
        const user = {
          name: this.query.name,
          createTime:this.query.createTime,
          endTime:this.query.endTime,
        }
        crudgQuestion.queryTrainDoneListById(user).then((res) => {
          // console.log(this.res.totalElements)
          this.crud.page.total = res.totalElements
          // this.crud.data = res.content

          this.doneTable = res.content;
          this.crud.resetDataStatus()
          // this.crud.notify('编辑成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(err => {
          console.log(err)
          console.log(err.data.message)
        })
      }else
      {
        this.crud.resetQuery();
      }

    },
    handleSizeChange(size) {
      this.pageSize = size
      console.log(`每页 ${this.pageSize} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      console.log(`当前页: ${this.currentPage}`)
    },
  }
}
</script>

