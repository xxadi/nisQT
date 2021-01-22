<template>
  <div>
    <!-- 条件查询表单 -->
    <div class="form">
      <el-form ref="form" :inline="true" :model="searchForm" size="mini" style="width: 100%">
        <span style="font-size:15px; font-weight:bold">培训资料筛选</span>
        <br>
        <br>
        <!-- 查询文本框 -->
        <el-form-item label="查询">
          <el-input v-model="query.name" placeholder="请输入培训资料名字" class="search_input" />
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
        <el-form-item label="培训资料状态">
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
      <span style="font-size:15px; font-weight:bold">培训资料列表</span>
      <div class="btn_fabu">
        <router-link
          :to="{ path: '/trainmanag/trainShow/edit' }"
        >
          <el-button class="button" size="mini">发布培训资料</el-button>

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
        <el-table-column prop="fileName" label="培训资料名字" align="center" />
        <el-table-column prop="uploadTime" label="发布时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.uploadTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileNum" label="可见人数" align="center" width="120" />
        <el-table-column prop="fileTime" label="阅读有效时间" align="center" width="120" >
          <template slot-scope="scope">
            {{scope.row.fileTime }}min
          </template>
        </el-table-column>
        <el-table-column prop="fileReadNum" label="已读人数" align="center" width="120">
          <template slot-scope="scope">
            <el-link @click="isReadList(scope.row.fileId,1)"  type="primary ">
              {{scope.row.fileReadNum }}人
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="fileReadNum" label="未读人数" align="center" width="120">
          <template slot-scope="scope">
            <el-link @click="isReadList(scope.row.fileId,0)"  type="primary ">
              {{scope.row.fileNum - scope.row.fileReadNum}}人
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="fileState" label="培训资料状态" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.fileState==='0'" style="color: orangered;font-weight: bold">隐藏</span>
            <span v-else-if="scope.row.fileState==='1'" style="color: #00b7ee;font-weight: bold">可见</span>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link
              :to="{ path: '/trainmanag/trainShow/edit', query: { user: scope.row } }"
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


      <el-dialog
        title="人员列表"
        :visible.sync="dialogVisible"
        width="50%"
        :append-to-body="true"
      >
        <div>
          <el-tabs type="border-card"  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未读人员信息" name="first">
              <el-table :data="doneTable"  border stripe size="mini" style="width: 100%"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column prop="fileName" label="工号" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="nickName" label="姓名" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.nickName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileState" label="所属科室" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.deptId}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileState" label="职称" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.deptId}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已读人员信息" name="second">
              <el-table :data="doneTable"  border stripe size="mini" style="width: 100%"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column prop="fileName" label="工号" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="nickName" label="姓名" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.nickName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileState" label="所属科室" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.deptId}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="fileState" label="职称" align="center" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.deptId}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>

          <br>
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
        </div>
      </el-dialog>
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
  readonly: "readonly"
}

.selectWid150 {
  width: 130px !important;
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
  line-height: 200px;
}

.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  width: 250px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
  position: relative;
}

</style>

<script>
import rrOperation from '@crud/RR.operation'
import crudgQuestion from '@/api/yuangan/trainManager'
import CRUD, { presenter, header } from '@crud/crud'
import pagination from '@crud/Pagination'

export default {
  components: { pagination, rrOperation },
  cruds() {
    return CRUD({
      title: '试题',
      url: 'api/trainManager/findAllFile',
      sort: ['jobSort,asc', 'id,desc'],
      crudMethod: { ...crudgQuestion }
    })
  },
  mixins: [presenter(), header()],
  data() {
    return {
      // 分页数据
      // 默认每页数据量
      pageSize: 10,
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
      dialogVisible:false,
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
      },
      doneTable:[],
      totalTable:[],
      activeName:'first'
    }
  },
  created() {
    // 获取所有通知列表
  },
  methods: {
    stopUse(data) {
      console.log(data)
      this.$confirm('此操作将培训名称：' + data.fileName + ' 设为隐藏, 是否继续？', '提示', {
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
      this.$confirm('此操作将培训名称：' + data.fileName + ' 设为可用, 是否继续？', '提示', {
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
  handleSizeChange(size) {
    this.pageSize = size
    console.log(`每页 ${this.pageSize} 条`)
  },
  handleCurrentChange(currentPage) {
    this.currentPage = currentPage
    console.log(`当前页: ${this.currentPage}`)
  },
    isReadList(fileId,index){
      console.log(fileId)
      this.dialogVisible = true;
      // var that = this;
      // doneTable
      crudgQuestion.isReadList(fileId).then(res => {
        this.totalTable = res.content;
        if(index == 1){
          this.activeName = 'second';
          this.doneTable = this.totalTable.filter(x=>x.pathState=='2').slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
        }else {
          this.activeName = 'first';
          this.doneTable = this.totalTable.filter(x=>x.pathState!='2').slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
        }

      }).catch(() => {

      })
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      if(tab.index == 1){
        this.doneTable = this.totalTable.filter(x=>x.pathState=='2').slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
      }else
      {
        this.doneTable = this.totalTable.filter(x=>x.pathState!='2').slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
      }

    }
  }
}
</script>

