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
              style="width:150px">

            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="outdate">
            <el-date-picker
              v-model="ruleForm.outdate"
              align="right"
              type="date"
              placeholder="结束日期"
              :picker-options="pickerOptions"
              style="width:150px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-select v-model="ruleForm.type" clearable placeholder="请选择患者类别" style="width:150px">
              <el-option label="门诊" value="1"></el-option>
              <el-option label="住院" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="shangbaokeshi">
            <el-select v-model="ruleForm.shangbaokeshi" clearable placeholder="请选择科室名称" style="width:150px">
              <el-option
                v-for="item in optionsDept"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="chuanranbing">
            <el-select v-model="ruleForm.chuanranbing" clearable placeholder="请选择预警病种" style="width:150px">
              <el-option
                v-for="item in optionsEarly"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="opeType">
            <el-select v-model="ruleForm.opeType" clearable placeholder="请选择操作类型" style="width:150px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="huanzhexingming" style="width:150px">
            <el-input
              placeholder="请输入患者姓名"
              v-model="ruleForm.huanzhexingming"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="liushuihao" style="width:150px">
            <el-input
              placeholder="请输入患者卡号"
              v-model="ruleForm.liushuihao"
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
                    :data="tableDataNew.filter(x=>x.state!='3').slice((this.currentPage1 - 1) * this.pagesize, (this.currentPage1 - 1) * this.pagesize + this.pagesize)"
                    stripe border style="width: 100%;"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column :show-overflow-tooltip="true" align="left" width="70" prop="state" label="状态">
              <template slot-scope="scope">
                <span  v-if="scope.row.state=='0' " style="color: 	Coral">未审核</span >
                <span  v-else-if="scope.row.state=='1' " style="color: green">已审核</span >
                <span  v-else-if="scope.row.state=='2' " style="color: red">已退卡</span >
                <span  v-else >未审核</span >
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="left" width="150" prop="liushuihao" label="流水号">
              <template slot-scope="scope">
                <el-link @click="dialogVisible = true" icon="el-icon-user-solid" type="primary ">
                  {{ scope.row.liushuihao }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column width="70"  label="姓名">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>联系电话: {{ scope.row.lianxidianhua }}</p>
                  <p>住址: {{ scope.row.xiangxidizhi }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.huanzhexingming }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="xingbie" width="50" label="性别">
              <template slot-scope="scope">
                {{ scope.row.xingbie==1?'男':scope.row.xingbie==2?'女':'未知' }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="shengri" width="50" label="年龄"/>
            <el-table-column :show-overflow-tooltip="true" width="70" prop="renqunfenlei" label="人群分类"/>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="shangbaokeshi" label="报告单位"/>
            <el-table-column :show-overflow-tooltip="true" width="70" prop="chuanranbing" label="疾病名称"/>
            <el-table-column :show-overflow-tooltip="true" width="70" prop="binglifenlei1" label="疾病分类"/>
            <el-table-column :show-overflow-tooltip="true" width="90" prop="fabingriqi" label="发病日期"/>
            <el-table-column :show-overflow-tooltip="true" width="90" prop="zhenduanriqi" label="诊断时间"/>
            <el-table-column :show-overflow-tooltip="true" width="90" prop="tuikariqi" label="录入时间"/>
            <el-table-column label="操作" width="220" prop="enabled"  fixed="right">
              <template slot-scope="scope">
                <router-link
                  :to="{ path: '/reportcard/index', query: { user: scope.row , cardType:1} }"
                >
                  <el-button
                    type="text" size="small">查看报卡
                  </el-button>
                </router-link>
                <el-button
                  type="text" size="small"
                  @click="handleReback(scope.$index, scope.row)">导出
                </el-button>
                  <el-button
                    type="text" size="small"
                    @click="handleDelete(scope.$index, scope.row)">打印
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
            :total="tableDataNew.length">
          </el-pagination>
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
      tableDataNew:[
        {
          state:'1',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'刘伟',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'2',
          chushengriqi:'1992-08-15',
          shengri:'38',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '教师',
          binglifenlei1: '确诊病例',
          fabingriqi: '2016-03-15',
          zhenduanriqi: '2016-03-16',
          siwangriqi: '',
          chuanranbing: 'HIV',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2018-12-01',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '肺病科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2017-01-11',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'吴倩',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'28',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '学生',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-05-20',
          zhenduanriqi: '2015-05-21',
          siwangriqi: '',
          chuanranbing: '丙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2014-03-16',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '妇科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        },
        {
          state:'1',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'赵虎',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'19',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '民工',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-04-11',
          zhenduanriqi: '2015-04-13',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-04-20',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '心内二',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2016-04-15',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'王三',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'2',
          chushengriqi:'1992-08-15',
          shengri:'44',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '民工',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-09-20',
          zhenduanriqi: '2015-09-21',
          siwangriqi: '',
          chuanranbing: '新冠肺炎',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2018-09-05',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '肺病科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2018-05-13',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'李佳琪',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'2',
          chushengriqi:'1992-08-15',
          shengri:'39',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '农民',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-07-20',
          zhenduanriqi: '2015-07-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-25',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '心内二',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'赵泰隆',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'20',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '医务人员',
          binglifenlei1: '确诊病例',
          fabingriqi: '2014-01-04',
          zhenduanriqi: '2014-01-06',
          siwangriqi: '',
          chuanranbing: '甲肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2018-04-05',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '肺病科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'林俊凯',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'72',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '教师',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-01-20',
          zhenduanriqi: '2015-01-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '肺病科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2018-05-13',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'钱雪泰',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'61',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '民工',
          binglifenlei1: '确诊病例',
          fabingriqi: '2018-12-05',
          zhenduanriqi: '2018-12-06',
          siwangriqi: '',
          chuanranbing: 'HIV',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '妇科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2018-09-13',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'王佳芝',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'2',
          chushengriqi:'1992-08-15',
          shengri:'24',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '民工',
          binglifenlei1: '确诊病例',
          fabingriqi: '2017-10-19',
          zhenduanriqi: '2017-10-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '心内二',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2018-05-11',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'刘柳',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'68',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '农民',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-07-20',
          zhenduanriqi: '2015-07-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '妇科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2018-08-13',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'李婷',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'2',
          chushengriqi:'1992-08-15',
          shengri:'25',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '农民',
          binglifenlei1: '确诊病例',
          fabingriqi: '2016-03-14',
          zhenduanriqi: '2016-03-14',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '康复科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2017-05-13',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'盛誉',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'58',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '教师',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-07-20',
          zhenduanriqi: '2015-07-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '肺病科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'段长鹏',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'35',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '教师',
          binglifenlei1: '确诊病例',
          fabingriqi: '2015-07-20',
          zhenduanriqi: '2015-07-21',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2015-07-22',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '康复科',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        },
        {
          state:'0',
          type:'1',
          liushuihao:'ZY0100000210825',
          kapianbianhao:'201801110001',
          baokaleibie:'1',
          dingzhengleibie:'',
          huanzhexingming:'于佳',
          zhengjianleixing:'1',
          jiazhangxingming:'',
          youxiaozhengjianhao:'210154199208151354',
          xingbie:'1',
          chushengriqi:'1992-08-15',
          shengri:'78',
          gongzuodanwei:'',
          lianxidianhua:'15874081346',
          bingrenshuyu:'3',
          valueSheng: '21',
          valueShi: '2101',
          valueXian: '210112',
          xiangxidizhi: '辽宁省沈阳市雨花区井湾路346号7栋1111房',
          renqunfenlei: '农民',
          binglifenlei1: '确诊病例',
          fabingriqi: '2016-03-14',
          zhenduanriqi: '2016-03-14',
          siwangriqi: '',
          chuanranbing: '乙肝',
          beizhu: '',
          hunyinzhuangkuang: '2',
          minzu: '01',
          wenhuachengdu: '3',
          xingbingshi: '2',
          jiechushi:['非婚异性性接触史','手术史'],
          ganrantujing: '异性传播',
          ganrantujingbeizhu: '',
          yangbenlaiyuan: '性病门诊',
          jiancejielun: '确认检测阳性',
          jianceyangxingriqi: '2016-01-12',
          jiancedanwei: '检验科',
          HBsAgyangxingshijian: '6个月内由阴性转为阳性',
          shoucinian: '',
          ALT: '',
          HBcIgM: '',
          ganchuanjiancejieguo: '',
          HBsAgyinxing: '',
          dingzhengbingming: '',
          tuikayuanyin: '',
          shangbaokeshi: '血液透析室',
          yishenglianxidianhua: '18304021535',
          shangbaoyisheng: '李明峰',
          ageUnit: '1',
          tuikariqi: '2015-07-22',
        }],
      form: {},
      currentPage1: 1,
      pagesize: 10,
      options: [
        {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '已审核'
        }, {
          value: '2',
          label: '已退卡'
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
        huanzhexingming: '',
        liushuihao: '',
        indate: '',
        outdate: '',
        renqunfenlei: '',
        shangbaokeshi: '',
        binglifenlei1:'',
        chuanranbing: '',
        fabingriqi:'',
        zhenduanriqi:'',
        tuikariqi:'',
      },
      gloabTable: {},
      tableDetailsData: [
        {
          zhenduan: '肺炎',
          emr: '',
          lis: '',
          pacs: '双肺多发结节',
          order: '',
        }],
      // 传染病弹出框
      dialogFormVisible: false,
      dialogVisible: false
    }

  },
  computed: {},
  created() {
    this.total = this.tableDataNew.length
    this.gloabTable = this.tableDataNew
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
      console.log( this.tableDataNew);
      let obh = this.objectValueAllEmpty(this.ruleForm)
      if (obh) {
        this.tableDataNew = this.gloabTable
      } else {
        this.tableDataNew = this.gloabTable
        let filters = this.ruleForm
        this.tableDataNew = this.tableDataNew.filter(
          item => {
            return Object.keys(filters).every(key => {
              console.log( filters[key]  + "-" + item[key]);
              return String(item[key]).toLowerCase().includes(
                String(filters[key]).trim().toLowerCase())
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
      // console.log(row);
      this.tableDetailsData = row.details;
    },
    handleGy(){
      this.$notify.error({
        title: '错误',
        message: '服务器断开连接'
      });
    },
    // 退卡
    handleReback: function (val,item) {
      this.$notify.error({
        title: '',
        message: '导出接口连接失败'
      });
    },
    // 删除
    handleDelete: function (val,item) {
      this.$notify.error({
        title: '',
        message: '打印接口连接失败'
      });
    },
    handleConfirm(val,item) {
      console.log(item);
      if(item.state == '1'){
        this.$notify.warning({
          title: '报卡已审核',
          message: '报卡已审核'
        });
      }else {
        this.$confirm('确认审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          item.state = '1';
          this.$notify.success({
            title: '成功',
            message: '审核成功'
          });
        }).catch(() => {});
      }
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
