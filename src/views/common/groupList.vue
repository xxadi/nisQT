<template>
  <div style="height: 400px; border: 1px solid #ccc">
    <el-container>
      <!-- <el-header>
        <div style=" line-height: 30px;text-align: center;border-bottom:1px solid #ccc">请选择人员</div>
      </el-header>-->
      <el-container>
        <el-container>
          <el-aside width="60%">
            <div>
              <div style="display: flex; margin-top: 10px">
                <div>
                  <i
                    class="el-icon-search"
                    style="line-height: 30px; margin-left: 10px"
                  ></i>
                </div>

                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="state"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.value }}</div>
                  </template>
                </el-autocomplete>
              </div>
              <div style="margin: 0 10px">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="按组织架构" name="first">
                    <el-tree
                      :data="data"
                      node-key="id"
                      default-expand-all
                      :expand-on-click-node="false"
                      :render-content="renderContent"
                      @node-click="append"
                    ></el-tree>
                  </el-tab-pane>
                  <el-tab-pane label="按组选择" name="second">
                    <el-tree
                      :data="data1"
                      default-expand-all
                      :expand-on-click-node="false"
                      :render-content="renderContent"
                      @node-click="append"
                    ></el-tree>
                  </el-tab-pane>
                  <el-tab-pane label="按职称选择" name="third">
                    <el-tree
                      :data="data2"
                      :props="defaultProps"
                      @node-click="handleNodeClick"
                    ></el-tree>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>

            <div style="float: left; width: 100%">
              <!-- 收信人： -->
              <input
                type="text"
                name="txtName"
                id="txtName"
                style="width: 200px; height: 250px; display: none"
              />
            </div>
          </el-aside>
          <el-container>
            <el-main>
              <label for>已选择的联系人</label>
              <div
                v-for="(item, index) in personList"
                v-bind:key="index"
                style="
                  display: flex;
                  align-items: center;
                  background-color: #ccc;
                  margin-top: 5px;
                  position: relative;
                "
              >
                <div :id="item.id" style="margin-left: 20px; width: 90%">
                  {{ item.name }}
                </div>
                <div>
                  <i
                    @click="deleteItem($event)"
                    class="el-icon-close"
                    style="
                      margin-left: 20px;
                      float: right;
                      position: absolute;
                      z-index: 1;
                      right: 0;
                      top: 1px;
                    "
                  ></i>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>

        <el-footer>
          <div style="border-bottom: 0.5px solid #ccc; margin: 3px"></div>
          <el-button size="mini" @click="sendPerson" type="primary"
            >添加</el-button
          >
          <el-button size="mini" type="primary">取消</el-button>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { queryAllPerson } from "@/api/yuangan/group";
import CRUD, {  presenter } from '@crud/crud'
export default {
  name: "GroupList",
  components: {queryAllPerson},
  cruds() {
    return CRUD({
      title: "人员",
      url: "api/user1/queryUserAll",
      sort: ["jobSort,asc", "id,desc"],
      crudMethod: { ...queryAllPerson },
    });
  },
  mixins: [presenter()],
  data() {
    return {
      value1: "",
      input: "",
      personList: [],
      data: [],
      data1: [
        {
          id: 100,
          label: "组",
          value: "组",
          children: [
            {
              id: 1001,
              label: "二级 1-1",
              value: "二级 1-1",
            },
          ],
        },
        {
          id: 4324,
          label: "一级 2",
          value: "一级 2",
          children: [
            {
              id: 1011,
              label: "二级 2-1",
              value: "二级 2-1",
            },
            {
              id: 1012,
              label: "二级 2-2",
              value: "二级 2-2",
            },
          ],
        },
        {
          id: 102,
          label: "一级 3",
          value: "一级 3",
          children: [
            {
              id: 1021,
              label: "二级 3-1",
              value: "二级 3-1",
            },
            {
              id: "102-2",
              label: "二级 3-2",
              value: "二级 3-2",
            },
          ],
        },
      ],
      data2: [
        {
          label: "职称111",
          value: "医师111",
          children: [
            {
              label: "二级 1-1",
              value: "医师",
              children: [
                {
                  label: "三级 1-1-1",
                  value: "医师",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          value: "医师",
          children: [
            {
              label: "二级 2-1",
              value: "医师",
              children: [
                {
                  label: "三级 2-1-1",
                  value: "医师",
                },
              ],
            },
            {
              label: "二级 2-2",
              value: "医师",
              children: [
                {
                  label: "三级 2-2-1",
                  value: "医师",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          value: "一级 3",
          children: [
            {
              label: "二级 3-1",
              value: "一级 3",
              children: [
                {
                  label: "三级 3-1-1",
                  value: "一级 3",
                },
              ],
            },
            {
              label: "二级 3-2",
              value: "一级 3",
              children: [
                {
                  label: "三级 3-2-1",
                  value: "一级 3",
                },
              ],
            },
          ],
        },
      ],
      searchList: [],
      activeName: "first",
      defaultProps: {
        children: "children",
        label: "label",
      },
      restaurants: [],
      state: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    $(obj) {
      return document.getElementById(obj);
    },
    friendsChanged(name) {
      var txtname = document.querySelector("#txtName").value;
      var x = document.getElementById("friends");
      var temText = x[x.selectedIndex].text;
      console.log(temText);
      var flag = 1;
      if (txtname.length > 0) {
        var arrname = txtname.split(";");
        for (var i = 0; i < arrname.length; i++) {
          //重复的不加上去
          if (arrname[i] == temText) {
            flag = 0;
            break;
          }
        }
      }

      if (flag == 1) {
        document.querySelector("#txtName").value += temText + ";";
        this.personList.push(temText);
      }
    },
    friendGroupsChanged(id) {},
    goBack() {
      console.log("go back");
    },
    renderContent(h, { node, data, store }) {
      if (node.data.hasOwnProperty("children")) {
        return (
          <span class="custom-tree-node">
            <i class="iconfont icon-jiaosequnti"></i>
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text">
                <i
                  class="el-icon-check"
                  style="display:none"
                  id={node.data.id}
                ></i>
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <i class="el-icon-user-solid"></i>
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text">
                <i
                  class="el-icon-check"
                  style="display:none"
                  id={node.data.id}
                ></i>
              </el-button>
            </span>
          </span>
        );
      }
    },
    append(node) {
      var map = new Map();
      // img.style.display = img.style.display.match("block") ? "none" : "block";
      if (node.hasOwnProperty("children")) {
        this.icoCheckDisplayAll(node);
      } else {
        this.icoCheckDisplay(node);
      }
    },
    icoCheckDisplay(node) {
      var temText = node.label;
      var temId = node.id;
      var img = document.getElementById(temId);
      if (img.style.display.match("block") == "block") {
        img.style.display = "none";
        img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
          "i"
        )[1].style.display = "none";
      } else {
        img.style.display = "block";
      }

      var flag = 1;
      if (this.personList.length > 0) {
        for (var i = 0; i < this.personList.length; i++) {
          //重复的不加上去
          if (this.personList[i].id == temId) {
            this.personList.splice(i, 1);
            flag = 0;
            break;
          }
        }
      }

      if (flag == 1) {
        this.personList.push({ id: temId, name: temText });
      }
    },
    icoCheckDisplayAll(node) {
      console.log(node);
      var flagT = false;

      var img = document.getElementById(node.id);
      if (img.style.display.match("block") == "block") {
        img.style.display = "none";
      } else {
        img.style.display = "block";
        flagT = true;
      }

      for (var i = 0; i < node.children.length; i++) {
        var numFlag = 1;
        var imgs = document.getElementById(node.children[i].id);
        var temText = node.children[i].label;
        var temId = node.children[i].id;
        if (flagT) {
          imgs.style.display = "block";
        } else {
          imgs.style.display = "none";
        }
        if (this.personList.length == 0) {
          this.personList.push({ id: temId, name: temText });
        } else {
          this.personList.forEach((item, index) => {
            if (flagT) {
              // 插入
              if (item.id == temId) {
                numFlag = 0;
              }
            } else {
              //删除
              if (item.id == temId) {
                this.personList.splice(index, 1);
              }
            }
          });
          if (flagT == true && numFlag == 1) {
            this.personList.push({ id: temId, name: temText });
          }
        }
      }
    },
    deleteItem(e) {
      var el = e.currentTarget;
      console.log(
        "el:" + el.parentNode.parentNode.getElementsByTagName("div")[0].id
      );
      var index = el.parentNode.parentNode.getElementsByTagName("div")[0].id;
      for (let i = 0; i < this.personList.length; i++) {
        if (this.personList[i].id == index) {
          this.personList.splice(i, 1);
          var img = document.getElementById(index);
          img.style.display = "none";
          img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
            "i"
          )[1].style.display = "none";
        }
      }
    },

    deleteItemById(id) {
      var index = id;
      for (let i = 0; i < this.personList.length; i++) {
        if (this.personList[i].id == index) {
          this.personList.splice(i, 1);
          var img = document.getElementById(index);
          img.style.display = "none";
          img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
            "i"
          )[1].style.display = "none";
        }
      }
      this.$emit("func", this.personList);

    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleSelect(item) {
      var node = { label: item.value, id: item.id };
      var result = this.personList.some((tmp) => {
        if (tmp.id == item.id) {
          return true;
        }
      });
      if (!result) {
        this.icoCheckDisplay(node);
      }
      this.state = "";
    },
    handleSearchData(data) {
      console.log("handleSearchData");
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        // this.searchList.push({"value":this.data[i].label,"id":this.data[i].id})
        if (data[i].hasOwnProperty("children")) {
          for (let j = 0; j < data[i].children.length; j++) {
            this.searchList.push({
              value: data[i].children[j].label,
              id: data[i].children[j].id,
            });
          }
        }
      }
      this.restaurants = this.searchList;
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    freshDate(data) {
     this.personList = data;
    },
    sendPerson() {
      //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
      this.$emit("func", this.personList);
    var imgs =  document.getElementsByClassName("el-icon-check");
       for (let i = 0; i < imgs.length; i++) {
          var img = imgs[i];
          img.style.display = "none";
          img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
            "i"
          )[1].style.display = "none";

      }
      this.personList = [];
    },
    queryAllPerson() {
      console.log("queryAllPerson");
       let _this = this;
      queryAllPerson().then((res) => {
        console.log(res);
        _this.data = res.content;
        this.handleSearchData(res.content);
      }).catch(err => {
        data.enabled = !data.enabled
        console.log(err.data.message)
      });
    },
  },
  mounted: function () {
    this.friendGroupsChanged("");

    /// 接全所有数组
    // this.handleSearchData(this.data);
  },
  created() {
    this.queryAllPerson();
  },
};
</script>
<style scoped>
.el-header {
  height: 40px !important;
}
.el-aside {
  /* background-color: rgb(0, 119, 255); */
  border-right: 1px solid #ccc;
}
.el-footer {
  /* background-color: rgb(136, 255, 0); */
}
.queryInput {
  height: 30px !important;
  margin-left: 10px;
}
>>> .el-input__inner {
  width: 190px;
  height: 30px;
}
.el-container {
  height: 360px !important;
}
.el-tabs el-tabs--top {
  margin: 5px !important;
}
</style>
