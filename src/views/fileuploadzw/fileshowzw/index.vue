<template>
  <div>
    <!-- 条件查询表单 -->
    <div class="form">
      <el-form ref="form" :inline="true" :model="searchForm" size="mini" style="width: 100%">
        <span style="font-size:15px; font-weight:bold">文件筛选</span>
        <br>
        <br>
        <!-- 查询文本框 -->
        <el-form-item label="查询">
          <el-input v-model="query.name" placeholder="请输入文件名字" class="search_input" />
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
            default-time="00:00:00"
          />
          -
          <el-date-picker
            v-model="query.endTime"
            align="right"
            type="datetime"
            value-format="MM/dd/yyyy HH:mm"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            default-time="23:59:59"
          />
        </el-form-item>
        <el-form-item label="文章状态">
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
          <rrOperation />
        </div>
      </el-form>
    </div>
    <!--试题列表展示表格-->
    <div class="table">
      <span style="font-size:15px; font-weight:bold">文章列表</span>
      <div class="btn_fabu">
        <router-link
          :to="{ path: '/fileupload/file/index' }"
        >
          <el-button class="button" size="mini">发布文章</el-button>

        </router-link>
      </div>
      <br>
      <br>
      <el-table
        :data="crud.data"
        border
        stripe
        size="mini"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column prop="fileName" label="文章名字" align="center" />
        <el-table-column prop="uploadTime" label="发布时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.uploadTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileNum" label="可见人数" align="center" width="120" />
        <el-table-column prop="fileReadNum" label="阅读人数" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.fileReadNum }} / {{scope.row.fileNum}}
          </template>
        </el-table-column>
        <el-table-column prop="fileIsdownload" label="是否允许下载" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.fileIsdownload==='0'">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileState" label="文章状态" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.fileState==='0'" style="color: orangered;font-weight: bold">隐藏</span>
            <span v-else-if="scope.row.fileState==='1'" style="color: #00b7ee;font-weight: bold">可见</span>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link v-if="scope.row.fileState==='1'"
              :to="{ path: '/fileupload/file/index', query: { user: scope.row } }"
            >
              <el-button
                style="color: sandybrown;font-weight: bold"
                type="text"
                size="small"
              >编辑
              </el-button>
            </router-link>
            <el-button
              v-if="scope.row.fileState==='1'"
              type="text"
              size="small"
              style="color: #44A791;font-weight: bold"
              @click="stopUse(scope.row)"
            >设置隐藏
            </el-button>
            <el-button
              v-else
              type="text"
              size="small"
              style="color: #1900FF;font-weight: bold"
              @click="StartUse(scope.row)"
            >设置可见
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <br>
      <br>
      <div class="block">
        <pagination />
      </div>
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
import crudgQuestion, { queryAllQuestion } from '@/api/yuangan/fileUploadzw'
import CRUD, { presenter, header } from '@crud/crud'
import pagination from '@crud/Pagination'

export default {
  components: { pagination, rrOperation },
  cruds() {
    return CRUD({
      title: '文件',
      url: 'api/fileUploadzw/findAllFile',
      sort: ['jobSort,asc', 'id,desc'],
      crudMethod: { ...crudgQuestion }
    })
  },
  mixins: [presenter(), header()],
  data() {
    return {
      // 分页数据
      // 默认每页数据量
      pageSize: 20,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      start: 1,
      // 默认数据总数
      totalCount: 1000,
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
      // 添加试题弹出框
      dialogFormVisible: false,
      // 添加试题弹出框
      dialogInputVisible: false,
      showChoice: false,
      // 试题列表
      ruleForm: {
        questTitle: '',
        questType: '',
        questName: '',
        questItem: [
          { prefix: 'A', content: '' },
          { prefix: 'B', content: '' },
          { prefix: 'C', content: '' },
          { prefix: 'D', content: '' }
        ],
        questAnalysis: '',
        correctResult: '',
        correctArray: [],
        score: '1',
        questDifficulty: '1'
      },
      // 后台查询结果集
      showQuestList: {
        createTime: '',
        questDifficulty: '',
        questId: '',
        questName: '',
        questOperId: '',
        questOperName: '',
        questOperTime: '',
        questResult: '',
        questState: '',
        questTitle: '',
        questType: ''
      },
      formLabelWidth: '120px',
      // 下拉框选项
      attribute: [
        {
          value: '0',
          label: '选择题'
        },
        {
          value: '1',
          label: '判断题'
        },
        {
          value: '2',
          label: '填空题'
        }
      ],
      fileState: [
        {
          value: '1',
          label: '可见'
        },
        {
          value: '0',
          label: '隐藏'
        }
      ],
      level: [
        {
          value: '1',
          label: '一星'
        },
        {
          value: '2',
          label: '二星'
        },
        {
          value: '3',
          label: '三星'
        },
        {
          value: '4',
          label: '四星'
        },
        {
          value: '5',
          label: '五星'
        }
      ],
      state: [
        {
          value: '0',
          label: '停用'
        },
        {
          value: '1',
          label: '正常'
        }
      ],
      rules: {
        questName: [
          { required: true, message: '请输入题目', trigger: 'blur' },
          {
            min: 3,
            max: 100,
            message: '长度在 3 到 100 个字符',
            trigger: 'blur'
          }
        ],
        fileState: [
          { required: true, message: '请选择题目分类', trigger: 'blur' }
        ],
        questDifficulty: [
          { required: true, message: '请选择题目难度', trigger: 'blur' }
        ],
        questType: [
          { required: true, message: '请选择题目类型', trigger: 'blur' }
        ],
        questAnalysis: [
          { required: true, message: '请填写解析', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ],
        questTitle: [
          { required: true, message: '请输入题目分类', trigger: 'blur' }
        ],
        questResult: [
          { required: true, message: '请选择正确答案', trigger: 'blur' }
        ],
      },
      itemsTF: [
        { id: null, prefix: 'A', content: '是' },
        { id: null, prefix: 'B', content: '否' }
      ],
      isClear: false,
      beforeKuohao: '',
      value2: '',
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
      }
    }
  },
  created() {
    // 获取所有通知列表
  },
  methods: {
    // 添加选项
    add() {
      this.ruleForm.answer.push({})
    },
    stopUse(data) {
      console.log(data)
      this.$confirm('此操作将隐藏' + data.fileName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudgQuestion.stop(data.fileId).then(res => {
          this.crud.notify('隐藏成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          data.fileState = '0'
        }).catch(() => {

        })
      }).catch(() => {

      })
    },
    StartUse(data) {
      console.log(data.fileId)
      this.$confirm('此操作将可用' + data.fileName + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudgQuestion.start(data.fileId).then(res => {
          this.crud.notify('启用成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          data.fileState = '1'
        }).catch(() => {

        })
      }).catch(() => {

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
    // 提交试题
    submitForm(ruleForm, form) {
      var that = this
      console.log(form)
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(valid)
          if (this.ruleForm.questType === '1') {
            this.ruleForm.questResult = this.ruleForm.correctArray.join(',')
          }
          if (this.ruleForm.questType === '3') {
          }
          crudgQuestion.add(form).then((res) => {
            console.log(res)
            this.crud.notify('创建成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
            this.crud.toQuery()
            // that.$router.go(0);
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
    // 查询所有通知列表
    getNoteList() {
      // 定义到then函数外部
      var that = this
      this.axios
        .get('http://localhost:8082/quest/findAllQuestion')
        .then(function(response) {
          that.showQuestList = response.data.list
          console.log(response.data.list)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取筛选后的通知列表
    queryOnCondition: function(searchForm) {
      console.log(searchForm.attribute)
      console.log(searchForm.fileState)
      this.axios
        .get(
          'http://localhost:8082/quest/findAllQuestion?name=' +
          searchForm.name +
          '&attribute=' +
          searchForm.attribute +
          '&fileState=' +
          searchForm.fileState +
          '&questDifficulty=' +
          searchForm.questDifficulty +
          '&state=' +
          searchForm.state
        )
        .then((res) => {
          console.log(res.data.list)
          this.showQuestList = res.data.list
        },
        function() {
          console.log('failed')
        }
        )
    },
    // 编辑
    toUpdateNote: function(id) {
      const _that = this
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
        if (_that.ruleForm.questType === '1') {
          _that.ruleForm.correctArray = []
          // _that.ruleForm.correctArray.push(_that.ruleForm.questResult);
          _that.ruleForm.correctArray = this.ruleForm.questResult.split(',')
        } else if (_that.ruleForm.questType === '0' || _that.ruleForm.questType === '2' || _that.ruleForm.questType === '3') {
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
      this.searchForm.name = ''
      this.searchForm.attribute = ''
      this.searchForm.fileState = ''
      this.searchForm.questDifficulty = ''
      this.searchForm.state = ''
      this.searchForm.timeList = ''
    },
    // 删除一行通知列表表单的数据
    deleteRow(index, noId) {
      // 弹框
      this.$confirm('你确定要删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'get',
            url: 'http://localhost:8082/note/delete/' + noId
          })
            .then((res) => res.data)
            .then((data) => {
              if (data === 1) {
                this.noteList.splice(index, 1)
                this.$message({
                  type: 'success',
                  message: '成功'
                })
                // 调用筛选后的获取列表函数
                this.loadData(
                  this.searchForm,
                  this.currentPage,
                  this.pageSize
                )
                this.totalPage()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
    },
    questionItemRemove(index) {
      this.ruleForm.questItem.splice(index, 1)
      this.ruleForm.correctArray.splice(index, 1)
    },
    radioChange: function(val) {
      const that = this
      if (this.ruleForm.questType === '2') {
        this.ruleForm.questItem = [
          { id: null, prefix: 'A', content: '是' },
          { id: null, prefix: 'B', content: '否' }
        ]
      } else if (this.ruleForm.questType === '3') {
        this.ruleForm.questItem = []
        var regex1 = /\((.+?)\)/g // () 小括号
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
      var regex1 = /\((.+?)\)/g // () 小括号
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
    }
  }
}
</script>

