<template>
  <div>
    <!-- 条件查询表单 -->
    <el-form
      :inline="true"
      ref="form"
      :model="searchForm"
      label-width="auto"
      class="form"
    >
      <span style="font-size: 15px; font-weight: bold">组查询</span>
      <br />
      <br />
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <!-- 查询文本框 -->
            <!-- <el-form-item label="查询" > -->
            <label for="money">查询</label>
             <el-input v-model="query.groupGname" clearable size="small" placeholder="输入岗位名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
            </div
        ></el-col>
        <el-col :span="14"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <!-- 查询重置操作按钮 -->
            <div class="btn_fabu">
              <rrOperation />
            </div>
          </div></el-col
        >
      </el-row>
    </el-form>

    <!--通知列表展示表格-->
    <div class="table">
      <span style="font-size: 15px; font-weight: bold">组列表</span>
      <div class="btn_fabu" style="display: flex">
<!--        <el-button size="mini" class="button" @click="$refs.groupEdit.dialog = true">创建组</el-button>-->
     <router-link to="/groupManager/groupEdit">
       <el-button size="mini" class="button" >创建组</el-button>
     </router-link>
      </div>
      <br />
      <br />

      <el-table
        :data="crud.data"
        border
        stripe
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          prop="groupGname"
          label="组名称"
          align="center"
          width
        ></el-table-column>
        <el-table-column
          prop="groupCount"
          label="包含人数"
          align="center"
          width
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width
        ></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button
              style="color: red"
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
            <router-link
              :to="{ path: '/groupManager/groupEdit', query: { user: scope.row } }"
            >
              <el-button style="color: green" type="text" size="small"
                >编辑</el-button
              >
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination />
    </div>
<!--    <groupEdit ref="groupEdit" />-->
  </div>
</template>
<style scope>
.form {
  padding: 20px;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.table {
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
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

.mager-l10 {
  margin-left: 10px;
}
.mager-r10 {
  margin-right: 10px;
}
.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* background: #d3dce6; */
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

<script>
import rrOperation from '@crud/RR.operation'
import groupEdit from "./groupEdit";
import pagination from "@crud/Pagination";
import crudgGroup,{ queryGroupList } from "@/api/yuangan/group";
import CRUD, { presenter,header } from "@crud/crud";
export default {
  components: { groupEdit, pagination ,rrOperation},
  cruds() {
    return CRUD({
      title: "岗位",
      url: "api/groupManager/queryGroupList",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: { ...queryGroupList },
    });
  },
  mixins: [presenter(),header()],
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
      // 查询表单
      searchForm: {
        title: "",
        date: {},
        state: "",
      },
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
      valueDpet: "",
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
      valueRole: "",
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
      valueJob: "",
      tableData: [],
      search: "", //搜索
      uploadUrl: "http://localhost:8080/mednis/maintain/user/UploadFile",
    };
  },
  created() {
    // 初始化发布状态
    // this.searchForm.state=this.options[1].value
    // 获取所有通知列表
    this.getNoteList();
  },
  computed: {},

  methods: {
    //分页
    //每页显示数据量变更
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNoteList();
    },
    //页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNoteList();
    },
    // 查询所有组管理列表
    getNoteList() {
      console.log(this.search);
      console.log(this.crud.query.name);
      const user = {
        groupGname: this.crud.query.name,
      };
      let _that = this;
      queryGroupList(user).then((res) => {
        console.log(res);
        this.crud.data = res.content;
        this.crud.page.total = res.totalElements;
      }).catch(err => {
        data.enabled = !data.enabled
        console.log(err.data.message)
      });
    },
    // 条件查询重置按钮
    onCancel() {
      this.search = "";
      this.valueDpet = "";
      this.valueRole = "";
      this.valueJob = "";
    },

    //删除一行通知列表表单的数据
    deleteRow(index, noId) {
      console.log(noId.groupId);
      let _that = this;

      //弹框
      this.$confirm("你确定要删除吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          crudgGroup.del(noId.groupId).then((res) => {
            this.$message.success("删除成功");
                   _that.getNoteList();
          }).catch(err => {
            data.enabled = !data.enabled
            console.log(err.data.message)
          });
        })
        .catch((e) => e);
    },
    handleChange(file, fileList) {
      console.log("---");
      this.tableData = [];
      this.totalCount = 0;
      this.importfxx(file.raw);
    },
    successMethod(response, file, fileList) {
      console.log("---sucess");
      console.log(response);
      if (response.code != 200) {
        this.$message({
          message: response.message + response.data + "，导入失败",

          type: "warning",
        });
      } else {
        this.$message({
          message: "导入成功",

          type: "success",
        });
      }
      this.getNoteList();
    },
    getJobName(value) {
      if (value == undefined) {
        return "";
      }
      let obj = this.optionsJob.find((item) => {
        //这里的oneData就是上面遍历的数据源
        return item.value === value; //筛选出匹配数据
      });
      return obj.label;
    },
    queryOnCondition(value) {
      this.getNoteList();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    importfxx(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer;

      // 通过DOM取文件数据
      console.log(event.currentTarget);
      console.log(event.currentTarget.files);
      if (event.currentTarget.files == undefined) {
        return;
      }
      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串

      var f = this.file;

      var reader = new FileReader();

      //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require("xlsx");

          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }

          wb.Sheets[wb.SheetNames[0]].A1 = { t: "n", v: "工号", w: "USERID" };
          wb.Sheets[wb.SheetNames[0]].B1 = { t: "s", v: "姓名", w: "USERNAME" };
          wb.Sheets[wb.SheetNames[0]].C1 = {
            t: "s",
            v: "职称",
            w: "PROFESSIONAL",
          };
          wb.Sheets[wb.SheetNames[0]].D1 = { t: "s", v: "科室", w: "DEPTNAME" };
          wb.Sheets[wb.SheetNames[0]].E1 = { t: "s", v: "角色", w: "ROLE" };
          wb.Sheets[wb.SheetNames[0]].F1 = {
            t: "s",
            v: "入职日期",
            w: "INDATE",
          };

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          var newList = [];
          var newListMore = [];
          var msg = "";

          for (var index in outdata) {
            console.log(!outdata[index].PROFESSIONAL);
            if (newList.indexOf(outdata[index].USERID) < 0) {
              newList.push(outdata[index].USERID);
              //----判断数据是否有空值
              //   if((!outdata[index].USERID)||(!outdata[index].USERNAME)||(!outdata[index].PROFESSIONAL)||(!outdata[index].DEPTNAME)||(!outdata[index].ROLE)||(!outdata[index].INDATE)){
              //     _this.$alert("有数据未填写完整", "数据异常！", {
              //   dangerouslyUseHTMLString: true,
              // });
              //     return;
              //   }
            } else {
              var indexs = index;
              indexs++;
              newListMore.push(outdata[index].USERID);
              msg +=
                "<b><p>" +
                "第" +
                indexs +
                "行-工号：" +
                outdata[index].USERID +
                "</p></b>";
            }
          }
          console.log(msg);
          if (msg == "") {
            _this.$alert(msg, "工号重复,请修改！", {
              dangerouslyUseHTMLString: true,
            });
            return;
          } else {
            _this.totalCount = outdata.length;
            _this.pageSize = outdata.length;
          }

          this.da = [...outdata];

          let arr = [];

          console.log(outdata);
          //           _this.tableData = outdata;

          this.da.map((v) => {
            let obj = {};

            obj.id = v.id;

            obj.status = v.status;

            arr.push(obj);
          });

          let para = {
            //withList: JSON.stringify(this.da)

            withList: arr,
          };

          // _this.$message({
          //   message: "请耐心等待导入成功",

          //   type: "success",
          // });

          // withImport(para).then(res => {

          //  window.location.reload()

          // })
        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
  },
};
</script>
