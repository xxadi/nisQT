<template>
  <div id="apps" style="display: inline-block">
    <!--     <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="500px" @close="cancel">-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><b>请填写培训资料信息</b></span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="资料名称" prop="fileName" label-width="120px">
          <el-input
            v-model="ruleForm.fileName"
            style="width: 400px"
            placeholder="请输入组名称"
          />
        </el-form-item>
        <el-form-item label="资料附件" prop="uploadMaterialFile" label-width="120px">
          <div>
            <div class="el-upload">
              <el-upload ref="uploadMaterialFile"
                class="avatar-uploader"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-remove="handleRemove"
                :headers="headers"
                :action="paperPicUploadApi"
                :limit="1"
              >
                <el-image
                  v-if="this.ruleForm.filePath"
                  :src="ruleForm.filePath ? baseApi + '/file/' + this.ruleForm.contentType + '/' + this.ruleForm.filePath : Avatar"

                  class="avatar1"
                >
                  <div slot="error" style="font-size: 100px">
                    <i class="el-icon-document" />
                  </div>
                </el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el-upload__tip">支持上传jpg/pdf/mp3文件，且不超过200M</div>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="有效阅读时间" prop="fileTime" label-width="120px">
          <el-input
            v-model="ruleForm.fileTime"
            style="width: 400px"
            placeholder="请输入有效阅读时间"
          />(min)
        </el-form-item>
        <el-form-item label="可见人员" prop="filePathList" label-width="120px">
          <el-table
            id="elTable"
            :data="ruleForm.filePathList"
            stripe
            border
            style="width: 80%; display: none"
            :max-height="tableHeight"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="id" label="工号" width="" />
            <el-table-column
              prop="name"
              label="姓名"
              :show-overflow-tooltip="true"
            />
            <el-table-column prop="dept" label="所属科室" />
            <el-table-column prop="job_type" label="职称" />
            <el-table-column prop="state" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color: red"
                  type="text"
                  size="small"
                  @click.native.prevent="deleteRow(scope.$index, scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <i class="el-icon-plus clolos1" @click="showDialog" />
          <span>     添加可见人员</span>
          <el-dialog
            title="添加用户"
            :visible.sync="dialog_visible"
            width="50%"
            :append-to-body="true"
          >
            <GroupA-vue ref="mychild" @func="getPerson" />
          </el-dialog>
        </el-form-item>
        <br>
        <br>
        <br>
        <br>
        <el-form-item>
          <el-button
            class="button"
            size="mini"
            @click="submitForm('ruleForm', ruleForm)"
          >发布</el-button>
          <el-button size="mini" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--      </el-dialog>-->
  </div>
</template>
<script>
import GroupA from '../../common/groupList'
import crudgGroup, { queryGroupList } from '@/api/yuangan/trainManager'
import CRUD, { header, presenter } from '@crud/crud'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  cruds() {
    return CRUD({
      title: '试题',
      url: 'api/quest/findAllQuestion',
      sort: ['jobSort,asc', 'id,desc'],
      crudMethod: { ...crudgGroup }
    })
  },
  mixins: [presenter(), header()],
  data() {
    return {
      loading: false, dialog: false, title: '修改密码', form: { oldPass: '', newPass: '', confirmPass: '' },
      ruleForm: {
        fileName: '',
        filePathList: [],
        fileIsdownload: '',
        fileState: '1',
        filePath: '',
        contentType: '',
        fileSuffix: '',
        fileTime:''
      },
      // 表单验证
      rules: {
        fileName: [
          { required: true, message: '请填写培训资料名称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        filePathList: [
          { required: true, message: '请选择人员', trigger: 'blur' }
        ],
        fileTime:[
          { required: true, message: '请输入有效阅读时间', trigger: 'blur' }
        ],
        uploadMaterialFile:[
          { required: true,validator: this.validateFile}
          ],
      },
      filePathList: [],
      dialog_visible: false,
      tableHeight: 0,
      newState: true,

      headers: {
        'Authorization': getToken()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 50
      // 后面的50：根据需求空出的高度，自行调整
    })
  },
  created() {
    this.dialog = false
    console.log(this.$route.query.user)
    if (this.$route.query.user === undefined) {
    } else {
      console.log(this.$route.query.user.fileName)
      this.queryById(this.$route.query.user.fileId)
      this.newState = false
      this.ruleForm = this.$route.query.user
    }
  },
  methods: {
    cancel() {
      // this.resetForm()
    },
    submitForm(formName) {
      // let _that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.newState)

          crudgGroup.add(this.ruleForm).then((res) => {
            console.log(res)
            this.crud.notify('发布成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    queryById(id) {
      const _that = this
      crudgGroup.queryFilePersonListById({ fileId: id }).then((res) => {
        console.log(res)
        var keyMap = { userId: 'id', userName: 'name', dept: 'dept', job: 'job_type' }
        for (var i = 0; i < res.content.length; i++) {
          var obj = res.content[i]
          for (var key in obj) {
            var newKey = keyMap[key]
            if (newKey) {
              obj[newKey] = obj[key]
              delete obj[key]
            }
          }
        }
        this.ruleForm.filePathList = res.content
        if (this.ruleForm.filePathList.length == 0) {
          document.getElementById('elTable').style.display = 'none'
        } else {
          document.getElementById('elTable').style.display = 'block'
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showDialog() {
      this.dialog_visible = true
    },
    getPerson(data) {
      console.log(data)
      var keyMap = { PERSON_ID: 'id', USERNAME: 'name' }
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

      if (this.ruleForm.filePathList.length == 0) {
        this.ruleForm.filePathList = data.slice(0)
      } else {
        var c = this.ruleForm.filePathList.concat(data.slice(0))
        var newArr = this.deWeightFour(c)
        this.ruleForm.filePathList = Array.from(newArr)
      }

      if (this.ruleForm.filePathList.length == 0) {
        document.getElementById('elTable').style.display = 'none'
      } else {
        document.getElementById('elTable').style.display = 'block'
      }
    },
    back() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
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
    deWeightFour(arr4) {
      var obj = {}
      arr4 = arr4.reduce(function(a, b) {
        obj[b.id] ? '' : (obj[b.id] = true && a.push(b))
        return a
      }, [])
      return arr4
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(response.realName)
      this.ruleForm.fileSuffix = response.suffix
      this.ruleForm.contentType = response.type
      this.ruleForm.filePath = response.realName
      const uid = file.uid
      const id = response.id
      // this.files.push({ uid, id })
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.crud.notify(msg.message, CRUD.NOTIFICATION_TYPE.ERROR)
    },
    handleRemove(file, fileList) {
      console.log(file)
      this.ruleForm.filePath = ''
    },
    /* 表单验证的方法**/
    validateFile: function (rule, value, callback) {
      if (!this.$refs.uploadMaterialFile.uploadFiles.length) {
        callback(new Error('请选择要上传的文件'));
        // } else if (this.$refs.uploadMaterialFile.uploadFiles.length > 1) {
        //   callback(new Error('每次上传只支持一个文件'));
      } else {
        var regx = new RegExp("(.xlsx)$|(.doc)$|(.docx)$|(.xls)$");
        /**这里有个坑，单文件上传，第一次上传错误格式接着上传第二次格式，列表中数组值有两个*/
        // if (!regx.test(this.$refs.uploadMaterialFile.uploadFiles[this.$refs.uploadMaterialFile.uploadFiles.length-1].name)) {
        //   callback(new Error('文件格式只支持xlsx、doc、docx、xls'));
        // }
        callback();
      }
    },
  },
  components: {
    'GroupA-vue': GroupA
  },
  computed: {
    ...mapGetters([
      'paperPicUploadApi',
      'baseApi'
    ])
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
#apps {
  height: 100%;
  width: 100%;
}
.text {
  font-size: 14px;
}
.button {
  color: #fff;
  background-color: #132bae;
  border-color: #132bae;
}

.clolos1 {
  /*width: 13px;*/
  height: 30px;
  background: #132bae;
  line-height: 30px;
  padding: 0 8px;
  border-radius: 15px;
  color: #fff;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
div.el-card.box-card.is-always-shadow {
  height: 100% !important;
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
</style>
