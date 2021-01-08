<template>
  <div>


  <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
    <el-table-column label="报表名称">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="scope.$index == '0'?dialogVisible = true:scope.$index == '1'?dialogVisible1 = true:dialogVisible2 = true">{{scope.row.name}}</el-button>
      </template>

    </el-table-column>

  </el-table>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="80%"
      height="100%">
      <iframe src="http://localhost:18080/RDP-SERVER/rdppage/main/a1550087623c723be33476965d707360" frameborder="0" width="100%" height="500px"></iframe>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible1"
      width="80%"
      height="100%">
      <iframe src="http://localhost:18080/RDP-SERVER/rdppage/main/cb3b9fec5160bcfaed9248a228604382" frameborder="0" width="100%" height="500px"></iframe>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogVisible2"
      width="80%"
      height="100%">
      <iframe src="http://localhost:18080/RDP-SERVER/rdppage/main/00b586b1abd18af0fe82baa6968dd711" frameborder="0" width="100%" height="500px"></iframe>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '传染病报告科室统计表',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '传染病按职业统计',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-04',
        name: '传染病按科室图表',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true;
      console.log(index, row);
    },
    handleEdit1(index, row) {
      this.dialogVisible1 = true;
      console.log(index, row);
    },
    handleEdit2(index, row) {
      this.dialogVisible2 = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>
