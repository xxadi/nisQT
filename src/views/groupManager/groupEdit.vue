<template>
  <div id="apps" style="display: inline-block">
<!--     <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :before-close="cancel" :title="title" append-to-body width="500px" @close="cancel">-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>请填写组信息</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="组名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            style="width: 400px"
            placeholder="请输入组名称"
          ></el-input>
        </el-form-item>
        <br />
        <br />

        <el-form-item label="人员列表" prop="personList">
          <el-table
            :data="ruleForm.personList"
            stripe
            border
            id="elTable"
            style="width: 80%; display: none"
            :max-height="tableHeight"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column prop="id" label="工号" width=""></el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="dept" label="所属科室"></el-table-column>
            <el-table-column prop="job_type" label="职称"></el-table-column>
            <el-table-column prop="state" label="操作">
              <template slot-scope="scope">
                <el-button
                  style="color: red"
                  @click.native.prevent="deleteRow(scope.$index, scope.row.id)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <i class="el-icon-plus clolos1" @click="showDialog"></i>
          <span>添加可见人员</span>
          <el-dialog
            title="添加用户"
            :visible.sync="dialog_visible"
            width="50%"
            :append-to-body="true"
          >
            <GroupA-vue @func="getPerson" ref="mychild"></GroupA-vue>
          </el-dialog>
        </el-form-item>
        <br />
        <br />
        <br />
        <br />
        <el-form-item>
          <el-button
            class="button"
            size="mini"
            @click="submitForm('ruleForm', ruleForm)"
            >保存</el-button
          >
          <el-button size="mini" v-on:click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<!--      </el-dialog>-->
  </div>
</template>
<script>
import GroupA from "../common/groupList";
import crudgGroup,{ queryGroupList } from '@/api/yuangan/group'
export default {
  data() {
    return {
        loading: false, dialog: false, title: '修改密码', form: { oldPass: '', newPass: '', confirmPass: '' },
      ruleForm: {
        name: "",
        personList: [],
        date1: "",
        radio: "1",
        seen: [],
        groupId:""
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: "请填写组名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        personList: [
          { required: true, message: "请选择人员", trigger: "blur" },
        ],
      },
      personList: [],
      dialog_visible: false,
      tableHeight: 0,
      newState: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 50;
      //后面的50：根据需求空出的高度，自行调整
    });

  },
  created() {
      this.dialog = false
    console.log(this.$route.query.user);
    if (this.$route.query.user == undefined) {
    } else {
      // console.log(this.$route.query.user.groupId);
      this.queryById(this.$route.query.user.groupId);
      this.newState = false;
      this.ruleForm.name = this.$route.query.user.groupGname;
    this.ruleForm.groupId = this.$route.query.user.groupId;
    }
  },
  methods: {
     cancel() {
      // this.resetForm()

    },
    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
           console.log(_that.newState);
            if (_that.newState == true) {
              crudgGroup.add(_that.ruleForm).then((res) => {
                console.log(res);
                this.$confirm("保存成功, 是否继续?", "提示", {
                          confirmButtonText: "确定",
                          cancelButtonText: "取消",
                          type: "warning",
                        })
                          .then(() => {
                            //点击确定的操作(调用接口)

                            _that.$refs["ruleForm"].resetFields();
                            _that.ruleForm = {
                              name: "",
                              personList: [],
                              date1: "",
                              radio: "1",
                              seen: [],
                              groupId:""
                            }
                            console.log("-----");
                            console.log(_that.ruleForm);
                          })
                          .catch(() => {
                            //点击取消的提示
                            _that.$refs["ruleForm"].resetFields();
                            _that.$router.go(-1);
                          });
              }).catch(err => {
                data.enabled = !data.enabled
                console.log(err.data.message)
              });
             }
          else{
              crudgGroup.edit(_that.ruleForm).then((res) => {
                console.log(res);
                this.$confirm("修改成功, 是否继续?", "提示", {
                          confirmButtonText: "确定",
                          cancelButtonText: "取消",
                          type: "warning",
                        })
                          .then(() => {
                            //点击确定的操作(调用接口)
                            this.$nextTick(function(){
                              _that.$refs["ruleForm"].resetFields();
                              _that.ruleForm = {
                                name: "",
                                personList: [],
                                date1: "",
                                radio: "1",
                                seen: [],
                                groupId:""
                              }
                            })

                            console.log("-----");
                            console.log(_that.ruleForm);
                            _that.newState = true;
                          })
                          .catch(() => {
                            //几点取消的提示
                            _that.$refs["ruleForm"].resetFields();
                                  _that.$router.go(-1);
                          });
              }).catch(err => {
                data.enabled = !data.enabled
                console.log(err.data.message)
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    queryById(id) {
      let _that = this;
      crudgGroup.queryGroupListById({groupId: id} ).then((res) => {
        console.log(res);
        console.log(res.content);
        var keyMap = { PERSON_ID: "id", USERNAME: "name" };
              for (var i = 0; i < res.content.employees.length; i++) {
                var obj = res.content.employees[i];
                for (var key in obj) {
                  var newKey = keyMap[key];
                  if (newKey) {
                    obj[newKey] = obj[key];
                    delete obj[key];
                  }
                }
              }
              this.ruleForm.personList = res.content.employees;
              if (this.ruleForm.personList.length == 0) {
                document.getElementById("elTable").style.display = "none";
              } else {
                document.getElementById("elTable").style.display = "block";
              }
      }).catch(err => {
        data.enabled = !data.enabled
        console.log(err.data.message)
      });
    },
    showDialog() {
      this.dialog_visible = true;
    },
    getPerson(data) {
      console.log(data);
      var keyMap = { PERSON_ID: "id", USERNAME: "name" };
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        for (var key in obj) {
          var newKey = keyMap[key];
          if (newKey) {
            obj[newKey] = obj[key];
            delete obj[key];
          }
        }
      }
      this.ruleForm.seen = data;
      this.dialog_visible = false;

      if (this.ruleForm.personList.length == 0) {
        this.ruleForm.personList = data.slice(0);
      } else {
        var c = this.ruleForm.personList.concat(data.slice(0));
        var newArr = this.deWeightFour(c);
        this.ruleForm.personList = Array.from(newArr);
      }

      if (this.ruleForm.personList.length == 0) {
        document.getElementById("elTable").style.display = "none";
      } else {
        document.getElementById("elTable").style.display = "block";
      }
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    //删除一行通知列表表单的数据
    deleteRow(index, noId) {
      console.log(noId);
      for (let i = 0; i < this.ruleForm.personList.length; i++) {
        if (this.ruleForm.personList[i].id == noId) {
          this.ruleForm.personList.splice(i, 1);
        }
      }
    },
    deWeightFour(arr4) {
      var obj = {};
      arr4 = arr4.reduce(function (a, b) {
        obj[b.id] ? "" : (obj[b.id] = true && a.push(b));
        return a;
      }, []);
      return arr4;
    },
  },
  components: {
    "GroupA-vue": GroupA,
  },
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
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
.el-icon-plus {
  color: #fff !important;
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
</style>
