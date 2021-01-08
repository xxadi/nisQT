<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--侧边部门数据-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="" prop="indate">
            <el-date-picker
              v-model="ruleForm.indate"
              align="right"
              type="date"
              placeholder="开始日期"
              :picker-options="pickerOptions"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width:180px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="outdate">
            <el-date-picker
              v-model="ruleForm.outdate"
              align="right"
              type="date"
              placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              style="width:180px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-select v-model="ruleForm.type" clearable placeholder="请选择患者类别">
              <el-option label="门诊" value="1"></el-option>
              <el-option label="住院" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="dept">
            <el-select v-model="ruleForm.dept" clearable placeholder="请选择科室名称">
              <el-option
                v-for="item in optionsDept"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="rules">
            <el-select v-model="ruleForm.rules" clearable placeholder="请选择预警病种">
              <el-option
                v-for="item in optionsEarly"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="state">
            <el-select v-model="ruleForm.state" clearable placeholder="请选择操作类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="userName">
            <el-input
              placeholder="请输入患者姓名"
              v-model="ruleForm.userName"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="inpatientNo">
            <el-input
              placeholder="请输入患者卡号"
              v-model="ruleForm.inpatientNo"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <el-row>
          <!--表格渲染-->
          <el-table ref="table" @row-click="openDetails" size="mini"
                    :data="tableData.slice((this.currentPage1 - 1) * this.pagesize, (this.currentPage1 - 1) * this.pagesize + this.pagesize)"
                    stripe border style="width: 100%;"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column :show-overflow-tooltip="true" align="left" width="70" prop="state" label="报卡状态">
              <template slot-scope="scope">
                <span  v-if="scope.row.state=='0' " style="color: black">未处理</span >
                <span  v-else-if="scope.row.state=='1' " style="color: green">已上报</span >
                <span  v-else-if="scope.row.state=='2' " style="color: red">已排除</span >
                <span  v-else-if="scope.row.state=='3' " style="color: 	Coral">待查</span >
                <span  v-else >未处理</span >
<!--                <p>{{scope.row.state==0?'未处理':scope.row.state==1?'已上报':scope.row.state==2?'已排除':scope.row.state==3?'待查':'未处理' }}</p>-->
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="left" width="70" prop="userName" label="姓名"/>
            <el-table-column :show-overflow-tooltip="true" width="150" prop="inpatientNo" label="流水号">
              <template slot-scope="scope">
                <el-link @click="dialogVisible = true" icon="el-icon-user-solid" type="primary ">
                  {{ scope.row.inpatientNo }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="70" prop="rules" label="预警病种"/>
            <el-table-column prop="sex" width="46" label="性别"/>
            <el-table-column :show-overflow-tooltip="true" prop="age" width="46" label="年龄"/>
            <el-table-column :show-overflow-tooltip="true" width="85" prop="indate" label="预警日期"/>
            <el-table-column :show-overflow-tooltip="true" width="85" prop="outdate" label="出院日期"/>
            <el-table-column :show-overflow-tooltip="true" width="80" prop="dept" label="科室"/>
            <el-table-column :show-overflow-tooltip="true" width="70" prop="mainDoc" label="主治医生"/>
            <el-table-column label="操作" width="200" prop="enabled" fixed="right">
              <template slot-scope="scope">
                <router-link
                  :to="{ path: '/reportcard/index' , query: { userBase: scope.row }}"
                >
                  <el-button
                    size="mini"
                    type="success"
                  >上报</el-button>
                </router-link>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleConfirm(scope.$index, scope.row)">待查</el-button>
                <router-link
                  :to="{ }"
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handlePass(scope.$index, scope.row)">排除</el-button>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" width="80" label="是否干预" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleGy(scope.$index, scope.row)">干预
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
          </el-pagination>
        </el-row>
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预警详细信息</span>
            </div>
            <el-table ref="table"
                      :data="tableDetailsData"
                      stripe border style="width: 100%;"
                      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
              <el-table-column :show-overflow-tooltip="true" align="left" width="70" prop="userName" label="依据来源">
                依据片段
              </el-table-column>>
              <el-table-column :show-overflow-tooltip="true" width="100" prop="zhenduan" label="诊断"/>
              <el-table-column prop="emr" width="220" label="病程"/>
              <el-table-column :show-overflow-tooltip="true" prop="lis" width="200" label="检验"/>
              <el-table-column :show-overflow-tooltip="true" width="150" prop="pacs" label="影像"/>
              <el-table-column :show-overflow-tooltip="true" width="150" prop="order" label="医嘱"/>
            </el-table>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      height="100%">
      <iframe src="http://127.0.0.1:8080/NIS/html/nis_commonDeatils.html?id=ZY010000081650" frameborder="0" width="100%" height="500px"></iframe>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import crudgQuestion from '@/api/yuangan/question'
import CRUD from '@crud/crud'
import reportcard from "../reportcard";

let userRoles = []
let userJobs = []
const defaultForm = {
  id: null,
  username: null,
  nickName: null,
  gender: '男',
  email: null,
  enabled: 'false',
  roles: [],
  jobs: [],
  dept: { id: null },
  phone: null,
}
export default {
  name: 'User',
  components: {reportcard},
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
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

      height: document.documentElement.clientHeight - 180 + 'px;',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      },
      tableData: [
        {
          state:'0',
          indate: '2016-05-02',
          userName: '王小虎',
          address: '哈尔滨市哈尔滨区南京南街 309',
          inpatientNo: 'ZY0100000210825',
          rules: '肺炎',
          sex: '60',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: '',
          type:'2',
          details:[
            {
              zhenduan: '肺炎',
              emr: '',
              lis: '',
              pacs: '双肺多发结节',
              order: '',
            }]
        }, {
          state:'1',
          indate: '2016-05-04',
          userName: '李思楠',
          address: '上海市普陀区金沙江路 1518 弄',
          inpatientNo: 'ZY0230016210515',
          rules: '乙肝',
          sex: '34',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: '',
          type:'2',
          details:[
            {
              zhenduan: '',
              emr: '结合患者既往存在肝硬化肝移植病史(2018-10-11 08:42:00)',
              lis: '',
              pacs: '',
              order: '',
            }]
        }, {
          state:'2',
          indate: '2016-05-01',
          userName: '赵丽颖',
          address: '大连市莆田路 312 门号',
          inpatientNo: '3125625',
          rules: 'HIV',
          sex: '65',
          age: '女',
          outdate: '2016-08-03',
          dept: '妇科',
          mainDoc: '王家兴',
          opeType: '',
          type:'1',
          details:[
            {
              zhenduan: '',
              emr: '',
              lis: 'HIV',
              pacs: '',
              order: '',
            }]
        }, {
          state:'0',
          indate: '2016-05-03',
          userName: '胡卫东',
          address: '沈阳市浑南区长街路',
          inpatientNo: 'ZY0100000421235',
          rules: '狂犬病',
          sex: '17',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '韩克军秋',
          opeType: '',
          type:'2',
          details:[
            {
              zhenduan: '',
              emr: '',
              lis: '',
              pacs: '',
              order: '狂犬疫苗注射液',
            }]
        }, {
          state:'0',
          indate: '2016-05-02',
          userName: '王亮',
          address: '哈尔滨市哈尔滨区南京南街 309',
          inpatientNo: 'ZY0100000210825',
          rules: '甲肝',
          sex: '60',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: '',
          type:'2',
        }, {
          indate: '2016-05-04',
          userName: '李明峰',
          address: '上海市普陀区金沙江路 1518 弄',
          inpatientNo: 'ZY0230016210715',
          rules: '乙肝',
          sex: '34',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: '',
          type:'2',
        }, {
          indate: '2016-05-01',
          userName: '赵蕊',
          address: '大连市莆田路 312 门号',
          inpatientNo: 'ZY0100003125625',
          rules: '甲肝',
          sex: '65',
          age: '女',
          outdate: '2016-08-03',
          dept: '妇科',
          mainDoc: '王家兴',
          opeType: '',
          type:'2',
        }, {
          indate: '2016-05-03',
          userName: '金巧巧',
          address: '沈阳市浑南区长街路',
          inpatientNo: 'ZY0100000421235',
          rules: '狂犬病',
          sex: '17',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '韩克军秋',
          opeType: '',
          type:'2',
        }, {
          indate: '2016-05-02',
          userName: '王立武',
          address: '哈尔滨市哈尔滨区南京南街 309',
          inpatientNo: 'ZY0100000210825',
          rules: '甲肝',
          sex: '60',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-04',
          userName: '李欣',
          address: '上海市普陀区金沙江路 1518 弄',
          inpatientNo: 'ZY0230016210715',
          rules: '乙肝',
          sex: '34',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-01',
          userName: '于佳',
          address: '大连市莆田路 312 门号',
          inpatientNo: 'ZY0100003125625',
          rules: '甲肝',
          sex: '65',
          age: '女',
          outdate: '2016-08-03',
          dept: '妇科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-03',
          userName: '张楠',
          address: '沈阳市浑南区长街路',
          inpatientNo: 'ZY0100000421235',
          rules: '狂犬病',
          sex: '17',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '韩克军秋',
          opeType: ''
        }, {
          indate: '2016-05-02',
          userName: '王雪健',
          address: '哈尔滨市哈尔滨区南京南街 309',
          inpatientNo: 'ZY0100000210825',
          rules: '甲肝',
          sex: '60',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-04',
          userName: '李佳',
          address: '上海市普陀区金沙江路 1518 弄',
          inpatientNo: 'ZY0230016210718',
          rules: '乙肝',
          sex: '34',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-01',
          userName: '赵丽蓉',
          address: '大连市莆田路 312 门号',
          inpatientNo: 'ZY0100003125625',
          rules: '甲肝',
          sex: '65',
          age: '女',
          outdate: '2016-08-03',
          dept: '妇科',
          mainDoc: '王家兴',
          opeType: ''
        }, {
          indate: '2016-05-03',
          userName: '邱瑞',
          address: '沈阳市浑南区长街路',
          inpatientNo: 'ZY0100000421235',
          rules: '狂犬病',
          sex: '17',
          age: '男',
          outdate: '2016-08-03',
          dept: '肺病科',
          mainDoc: '韩克军秋',
          opeType: ''
        }],
      form: {},
      currentPage1: 1,
      pagesize: 10,
      options: [ {
        value: '0',
        label: '未处理'
      },
        {
          value: '1',
          label: '上报'
        }, {
          value: '3',
          label: '待查'
        }, {
          value: '2',
          label: '排除'
        }],
      optionsEarly: [
        {
          value: '甲肝',
          label: '甲肝'
        }, {
          value: '乙肝',
          label: '乙肝'
        }, {
          value: '丙肝',
          label: '丙肝'
        }, {
          value: 'HIV',
          label: 'HIV'
        }, {
          value: '新冠肺炎',
          label: '新冠肺炎'
        }],
      optionsDept: [
        {
          value: '肺病科',
          label: '肺病科'
        }, {
          value: '妇科',
          label: '妇科'
        }, {
          value: '心内二',
          label: '心内二'
        }, {
          value: '血液透析室',
          label: '血液透析室'
        }, {
          value: '康复科',
          label: '康复科'
        }],
      ruleForm: {
        userName: '',
        opeType: '',
        indate: '',
        outdate: '',
        dept: '',
        rules: '',
        inpatientNo: '',
        type:'',
        details:[]
      },
      gloabTable: {},
      tableDetailsData: [
        {
          zhenduan: '肺炎',
          emr: '结合患者既往存在肝硬化肝移植病史(2018-10-11 08:42:00)',
          lis: '',
          pacs: '双肺多发结节',
          order: '狂犬疫苗注射液',
        }],
      // 传染病弹出框
      dialogFormVisible: false,
      dialogVisible: false
    }

  },
  computed: {},
  created() {
    this.total = this.tableData.length
    this.gloabTable = this.tableData
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
    this.$nextTick(function() {
      window.addEventListener('scroll', this.onScroll)
    })
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size
      console.log(`每页 ${this.pagesize} 条`)
    },
    handleCurrentChange(currentPage) {
      this.currentPage1 = currentPage
      console.log(`当前页: ${this.currentPage1}`)
    },
    submitForm(formName) {
      let obh = this.objectValueAllEmpty(this.ruleForm)
      if (obh) {
        this.tableData = this.gloabTable
      } else {
        this.tableData = this.gloabTable
        let filters = this.ruleForm
        this.tableData = this.tableData.filter(
          (item) => {
            return Object.keys(filters).every(key => {

              if(key == "indate"  ){
                console.log(filters[key] + "--"+  item[key]);
                if(filters[key]!=""){
                  console.log("aaa--");
                  return item[key]>=filters[key]
                }else
                {
                  return true;
                }

              }else if(key == "outdate"){
                if(filters[key]!=""){
                  return filters[key]>= item[key]
                }else
                {
                  return true;
                }

              }else{
                return String(item[key]).toLowerCase().includes(
                  String(filters[key]).trim().toLowerCase())
              }
            })
          }
        )
      }

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    objectValueAllEmpty(object) {
      var isEmpty = true
      Object.keys(object).forEach(function(x) {
        if (object[x] != null && object[x] != '') {
          isEmpty = false
        }
      })
      if (isEmpty) {//值全为空
        return true
      }
      return false
    },
    openDetails (row) {
      console.log(row);
      this.tableDetailsData = row.details;
    },
    handleGy(){
      this.$notify.error({
        title: '错误',
        message: '服务器断开连接'
      });
    },
    // 编辑
    handleEdit: function (id) {
      this.$router.push({path:'/chuanranbing/reportcard',query: {id:'1'}})
      // path: '/groupManager/groupEdit', query: { user: scope.row }
    },// 删除
    handlePass: function (val,item) {
      this.$confirm('确认排除该报卡?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        item.state = '2';
        this.$notify.success({
          title: '成功',
          message: '排除成功'
        });
      }).catch(() => {});
    },
  handleConfirm(val,item) {
    console.log(item);
      this.$confirm('确认待查?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        item.state = '3';
        this.$notify.success({
          title: '成功',
          message: '待查成功'
        });
      }).catch(() => {});
  },
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-form-item__content {
  margin-left: 5px !important;
}
.el-card__header {
  padding: 2px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control, ::v-deep .vue-treeselect__placeholder, ::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
