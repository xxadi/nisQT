<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header title="人员详情" @back="goBack"></el-page-header>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="工　　号" prop="userId">
        <div v-if="newState==true">
           <el-input  size="mini" v-model="ruleForm.userId"></el-input>
        </div>
          <div v-else>
      <el-input  disabled size="mini" v-model="ruleForm.userId"></el-input>
    </div>

        </el-form-item>
        <el-form-item label="姓　　名" prop="userName">
          <el-input size="mini" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="职　　称" prop="professional">
          <!-- <el-input size="mini" v-model="ruleForm.job"></el-input> -->
          <el-select size="mini" v-model="ruleForm.professional" filterable placeholder="请选择">
            <el-option
              v-for="item in optionsJob"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科室" prop="deptname">
          <!-- <el-input size="mini" v-model="ruleForm.dept"></el-input> -->
          <el-select size="mini" v-model="ruleForm.deptname" filterable placeholder="请选择">
            <el-option
              v-for="item in optionsDept"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角　　色" prop="role">
          <!-- <el-input size="mini" v-model="ruleForm.role"></el-input> -->
          <el-select size="mini" v-model="ruleForm.role" filterable placeholder="请选择">
            <el-option
              v-for="item in optionsRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职日期" prop="indate">
          <el-date-picker
            size="mini"
            v-model="ruleForm.indate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width:200px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="登录工号" prop="id">
          <el-input disabled size="mini" v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="passWord">
          <el-input size="mini" v-model="ruleForm.passWord"></el-input>
          <el-button size="mini" class="button mager-l10" @click="resetPassword('ruleForm')">重置密码</el-button>
        </el-form-item>

        <el-button
          size="mini"
          class="button saveBtn"
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
        <el-button size="mini" @click="resetForm('ruleForm')">取消</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        userId: "",
        userName: "",
        professional: "",
        deptname: "",
        role: "",
        delivery: false,
        type: [],
        resource: "",
        passWord: "123456",
        indate: "",
      },
      rules: {
        userId: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        professional: [
          { required: true, message: "请输入职称", trigger: "change" },
        ],
        deptname: [
          { required: true, message: "请输入科室", trigger: "change" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        indate: [
          { required: true, message: "请选择入职日期", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      optionsJob: [
        {
          value: "1",
          label: "住院医师",
        },
        {
          value: "2",
          label: "主治医师",
        },
        {
          value: "3",
          label: "副主任医师",
        },
        {
          value: "4",
          label: "主任医师",
        },
      ],
      optionsDept: [
        {
          value: "1",
          label: "心内一",
        },
        {
          value: "2",
          label: "心内二",
        },
        {
          value: "3",
          label: "血液净化中心1",
        },
        {
          value: "4",
          label: "血液净化中心2",
        },
      ],
      optionsRole: [
        {
          value: "1",
          label: "医生",
        },
        {
          value: "2",
          label: "护士",
        },
        {
          value: "3",
          label: "技师",
        },
        {
          value: "4",
          label: "行政",
        },
      ],
      newState: true,
    };
  },
  created() {
    this.getDicList();
    console.log(this.$route.query.user);
    if (this.$route.query.user == undefined) {
    } else {
      this.newState = false;
      this.ruleForm.userId = this.$route.query.user.userId;
      this.ruleForm.userName = this.$route.query.user.userName;
      this.ruleForm.passWord = this.$route.query.user.passWord;
      this.ruleForm.deptname = this.$route.query.user.deptname;
      this.ruleForm.professional = this.$route.query.user.professional;
      this.ruleForm.role = this.$route.query.user.role;
      this.ruleForm.indate = this.$route.query.user.indate;
    }
  },
  methods: {
    submitForm(formName) {
      console.log("");
      let _that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(_that.newState);
          if (_that.newState == false) {
             console.log(_that.ruleForm);
          this.$axios
            .post(
              "http://localhost:8080/mednis/maintain/user/update",
              _that.ruleForm,
              {
                headers: {
                  token: sessionStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.code == "200") {
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
          else{
          this.$axios
            .post(
              "http://localhost:8080/mednis/maintain/user/add",
              _that.ruleForm,
              {
                headers: {
                  token: sessionStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.code == "200") {
                this.$confirm("保存成功, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    //点击确定的操作(调用接口)

                    _that.$refs["ruleForm"].resetFields();
                  })
                  .catch(() => {
                    //几点取消的提示
                    _that.$refs["ruleForm"].resetFields();
                          _that.$router.go(-1);
                  });
              } else {
                this.$message.error(res.data.message);
              }
            });
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    goBack() {
      this.$router.go(-1);
    },
    resetPassword(formName) {
      console.log("----");
      this.ruleForm.passWord = "123456";
    },
     // 查询所有字典信息
    getDicList() {
      console.log("");
      let _that = this;
      this.$axios
        .post(
          "http://localhost:8080/mednis/maintain/user/queryDicBySeq",
          {

            typeId: '15',
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.code == "200") {
            console.log(res.data.data);
            console.log(res.data.data.employees);

          } else {
            this.$message.error(res.data.message);
          }
        });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.text {
  font-size: 14px;
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

.box-card {
  /* width: 480px; */
}
.el-input {
  width: 200px;
}
/* 按钮颜色 */
.button {
  color: #fff;
  background-color: #132bae;
  border-color: #132bae;
}
.saveBtn {
  margin-left: 50px;
}
.mager-l10 {
  margin-left: 10px;
}
.el-card__body {
  padding: 5px 20px;
}
</style>
