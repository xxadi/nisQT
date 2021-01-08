<template>
  <div  class="app-container">
    <div >
      <el-card class="box-card">
        <div style="color: #666;font-size: 13px;height: 28px;align-items: center;line-height: 28px">
          <span style="height: 28px;">
            <b>创建试卷</b>
          </span>

         <el-button  size="mini" class=" header_search">打印</el-button>
        </div>
      </el-card>
      <div>
        <el-form :model="form" ref="form" label-width="100px" :rules="rules">
        <el-row :gutter="6">
          <el-col :span="5" style="margin-bottom: 10px">
            <el-card class="box-card">
<!--              <div slot="header" class="clearfix">-->
<!--                <span style="font-weight: bold;color: #666;font-size: 15px">CPU使用率监控</span>-->
<!--              </div>-->
              <div class="border_styleBlack" >
                <div style="text-align: center">
                  <h3>请编辑试卷信息</h3>
                </div>
                <div style="margin-bottom: 15px;margin-left: 10px;width: 90%;">
                  <span>试卷名称：</span>
                  <el-input v-model="form.paperName" placeholder="请输入试卷名称" ></el-input>

                </div>
                <div style="text-align: center">
                  <el-radio v-model="form.paperType" label="1">自主选题</el-radio>
                  <el-radio v-model="form.paperType" label="2">随机选题</el-radio>
                </div>

                <div style="margin-bottom: 20px;margin-left: 5px;width: 80%" ></div>
              </div>
              <div class="border_styleBlack margin_top15">
                <div style="text-align: center">
                <h3>试卷</h3>
                </div>
                <div style="text-align: center;margin-bottom: 20px">
                  <span>总题数：0</span>
                  <span style="margin-left: 20px">总分数：0</span>
                </div>

              </div>
              <div class="border_styleBlack margin_top15" >
                <div style="text-align: center">
                  <h3>logo设置</h3>
                </div>
                <div style="text-align: center">
                  <div class="el-upload" >
                    <el-upload  class="avatar-uploader"

                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :headers="headers"
                                :action="imagesUploadApi"
                                :show-file-list="false"      >
                      <img v-if="imageUrl" :src="imageUrl ? baseApi + '/file/图片/' + '微信图片_20201225103118-20201230032602435.png' : Avatar" class="avatar1">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                </div>

                <div style="margin-bottom: 20px;" >
                  <h4 style="margin-left: 10px">所在位置</h4>

                    <div style="text-align: center">
                      <el-radio-group v-model="radio" @change="histTypeUpdate">
                      <div>
                        <el-radio  label="1">左上</el-radio>
                        <el-radio  label="2">右上</el-radio>
                      </div>
                      <div>
                        <el-radio  label="3">左下</el-radio>
                        <el-radio  label="4">右下</el-radio>
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
          <el-col :span="19"  style="margin-bottom: 10px">
            <el-card class="box-card">
                <!--mainDiv-->
              <div style="position: relative;">
                <div :class="choose" >
                  <img v-if="imageUrl" :src="imageUrl ? baseApi + '/file/图片/' + '微信图片_20201225103118-20201230032602435.png' : Avatar" class="avatar1">
                </div>
                <div >
                  <div style="text-align: center">
                    <div >
                      <h3 style="margin-left: 10px;margin-top: 20px" >{{form.paperName}}</h3>
                    </div>
                    <div>
                      <b>姓名：</b><input type="text" name="name" style="border:none;border-bottom:1px solid #000;width: 100px;margin-right: 50px"/>
                      <b>科室：</b><input type="text" name="name" style="border:none;border-bottom:1px solid #000;width: 100px;margin-right: 50px"/>
                      <b>职称：</b><input type="text" name="name" style="border:none;border-bottom:1px solid #000;width: 100px;"/>
                    </div>
                  </div>

                  <div style="width: 70%;margin:auto;">
                    <div style="border: 1px solid #bbbbbb;margin-top: 10px">
                      <div style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">单选题</div>
                      <div style="padding-left: 20px;margin: 10px">
                        <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in dxList">
                          {{questionItem.name}}  <el-button  size="mini" style="margin-right: 70px;float: right">删除</el-button>
                          <div style="margin-top: 5px" v-for="(item,questionIndex) in questionItem.list">
                            <el-radio v-model="radio" label="5">{{item}}</el-radio>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div style="border: 1px solid #bbbbbb;margin-top: 10px">
                      <div style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">多选题</div>
                      <div style="padding-left: 20px;margin: 10px">
                        <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in dxList">
                          {{questionItem.name}}  <el-button  size="mini" style="margin-right: 70px;float: right">删除</el-button>
                          <div style="margin-top: 5px" v-for="(item,questionIndex) in questionItem.list">
                            <el-radio v-model="radio" label="5">{{item}}</el-radio>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="border: 1px solid #bbbbbb;margin-top: 10px">
                      <div style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">填空题</div>
                      <div style="padding-left: 20px;margin: 10px">
                        <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in dxList">
                          {{questionItem.name}}  <el-button  size="mini" style="margin-right: 70px;float: right">删除</el-button>
                          <div style="margin-top: 5px" v-for="(item,questionIndex) in questionItem.list">
                            <el-radio v-model="radio" label="5">{{item}}</el-radio>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="border: 1px solid #bbbbbb;margin-top: 10px">
                      <div style="background-color: #F9FDFF;border-bottom: 1px solid #bbbbbb;padding-left: 20px;line-height: 36px">判断题</div>
                      <div style="padding-left: 20px;margin: 10px">
                        <div style="margin-bottom: 10px" v-for="(questionItem,questionIndex) in dxList">
                          {{questionItem.name}}  <el-button  size="mini" style="margin-right: 70px;float: right">删除</el-button>
                          <div style="margin-top: 5px" v-for="(item,questionIndex) in questionItem.list">
                            <el-radio v-model="radio" label="5">{{item}}</el-radio>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 50px">
                  <i class="el-icon-plus clolos1" @click="showDialog"></i>
                  <span style="margin-left: 15px">添加试题</span>
                  <el-dialog
                    title="请选择试题"
                    :visible.sync="dialog_visible"
                    width="80%"
                    height="60%"
                    :append-to-body="true"
                  >
                    <!-- 条件查询表单 -->
                    <div class="form">
                      <el-form :inline="true" ref="form" :model="searchForm"  size="mini" style="width: 100%">
                        <span style="font-size:15px; font-weight:bold">题库筛选</span>
                        <br />
                        <br />
                        <!-- 查询文本框 -->
                        <el-form-item label="查询">
                          <el-input v-model="query.name" placeholder="请输入查询内容" class="search_input"></el-input>
                        </el-form-item>
                        <!-- 发布状态选择栏 -->
                        <el-form-item label="题目属性" >
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
                          <rrOperation />
                        </div>
                      </el-form>
                      <el-table
                        :data="tableData"
                        style="width: 100%"
                        border
                        stripe
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column type="expand">
                          <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                              <el-form-item label="题目名称">
                                <span>{{ props.row.name }}</span>
                              </el-form-item>
                              <el-form-item label="属性">
                                <span>{{ props.row.shop }}</span>
                              </el-form-item>
                              <el-form-item label="分类">
                                <span>{{ props.row.id }}</span>
                              </el-form-item>
                              <el-form-item label="难度">
                                <span>{{ props.row.shopId }}</span>
                              </el-form-item>
                              <el-form-item label="正确率">
                                <span>{{ props.row.category }}</span>
                              </el-form-item>
                            </el-form>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="题目名称"
                          prop="id">
                        </el-table-column>
                        <el-table-column
                          label="属性"
                          prop="name">
                        </el-table-column>
                        <el-table-column
                          label="分类"
                          prop="desc">
                        </el-table-column>
                        <el-table-column
                          label="难度"
                          prop="desc">
                        </el-table-column>
                        <el-table-column
                          label="正确率"
                          prop="desc">
                        </el-table-column>
                      </el-table>
                      <!--分页组件-->
                      <pagination />
                      <div style="text-align: center;margin-top: 30px">
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
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
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import store from '@/store'
import myUpload from 'vue-image-crop-upload'
import CRUD, { presenter,header } from "@crud/crud";
import rrOperation from '@crud/RR.operation'
import crudgQuestion from '@/api/yuangan/question'
export default {
  components: { pagination,myUpload,rrOperation},
  cruds() {
    return CRUD({
      title: "试题",
      url: "api/quest/findAllQuestion",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: { ...crudgQuestion },
    });
  },
  mixins: [presenter(),header()],
  data() {
    return {
      form: {
       paperName:"",
        paperType:"",
      },
      rules: {
        level: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        subjectId: [
          { required: true, message: '请选择学科', trigger: 'change' }
        ],
        paperType: [
          { required: true, message: '请选择试卷类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' }
        ],
        suggestTime: [
          { required: true, message: '请输入建议时长', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        'Authorization': getToken()
      },
      show: false,
      imageUrl: '1',
      radio:'',
      choose:'four',
      // 查询表单
      searchForm: {
        name: "",
        questType:"",
        questTitle:"",
        questDifficulty:"",
        state: ""
      },
      //下拉框选项
      attribute: [
        {
          value: "0",
          label: "选择题",
        },
        {
          value: "1",
          label: "判断题",
        },
        {
          value: "2",
          label: "填空题",
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
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      dialog_visible: false,// 添加试题弹出窗
      dxList:[{name:"1.示例单选题文字内容，示例单选题文字内容",list:["A,示例选项","B,示例选项","C,示例选项","F,示例选项"]},{name:"2.示例单选题文字内容，示例单选题文字内容",list:["A,示例选项","E,示例选项","C,示例选项","F,示例选项"]}]
    }
  },
  created() {

  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg (f) {
      console.log(f)
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('image', f.file)
      axios({
        url: baseURL + '/image',
        method: 'post',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        }
      }).then(res => {
        this.imageUrl = res.data.data
        if (this.progressPercent === 100) {
          this.progressFlag = false
          this.progressPercent = 0
        }
      }).then(error => {
        console.log(error)
      })
    },
    // 上传图片前的过滤
    beforeAvatarUpload (file) {
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
      store.dispatch('GetInfo').then(() => {})
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
    histTypeUpdate: function(histType) {
      switch(histType) {
        case "1":
          console.log("左上");
          this.choose = "first";
          break;
        case "2":
          console.log("右上");
          this.choose = "second" ;
          break;
        case "3":
          console.log("左下");
          this.choose = "third" ;
          break;
        case "4":
          console.log("右下");
          this.choose = "four" ;
          break;
        default:
          console.log("右下");
          this.choose = "four" ;
      }
    },
    showDialog() {
      this.dialog_visible = true;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi',
      'baseApi'
    ])
  }
}
</script>

<style lang="scss">
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
  position:absolute;
  top:5px;
  left:5px;
  width:100px;
  height:100px;
  border: 1px solid #00FFFF;
}

.second {
  position:absolute;
  top:5px;
  right:5px;
  width:100px;
  height:100px;
  border: 1px solid #00FFFF;
}
.third {
   position:absolute;
  bottom:5px;
   left:5px;
   width:100px;
   height:100px;
  border: 1px solid #00FFFF;
 }

.four {
  position:absolute;
  bottom:5px;
  right:5px;
  width:100px;
  height:100px;
  border: 1px solid #00FFFF;
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
</style>
