<template>
  <div class="add_question">
   基础数据维护
  </div>
</template>

<script>
export default {
  data() {
    return {
      gradeList: [
        {
          label: '一年级',
          value: '一年级'
        },
        {
          label: '二年级',
          value: '二年级'
        },
        {
          label: '三年级',
          value: '三年级'
        },
        {
          label: '四年级',
          value: '四年级'
        },
        {
          label: '五年级',
          value: '五年级'
        },
        {
          label: '六年级',
          value: '六年级'
        }
      ],  //年级可选列表
      subjectList: [
        {
          label: '语文',
          value: '语文'
        },
        {
          label: '数学',
          value: '数学'
        },
        {
          label: '英语',
          value: '英语'
        }
      ],  //科目可选列表
      typeList: [
        {
          label: '判断题',
          value: 1
        },
        {
          label: '选择题',
          value: 2
        },
        {
          label: '填空题',
          value: 3
        }
      ],      //题目类型
      choice_options: { //选择题选项
        A: '', B: '', C: '', D: ''
      },
      formData: {
        grade: '',  //年级
        subject: '',  //科目
        question: '', //题目
        answer: '',   //答案
        type: null,   //类型
        options: ''   //选项
      }
    }
  },
  methods: {
    ok() {  //提交
      this.formData.options = ''; //因为选项是由数组拼接成字符串提交 因为页面不用每次提交就刷新 所以第二次提交把选项内容清空
      if (this.formData.type === 2) {
        let keys = Object.keys(this.choice_options);
        keys.forEach((key)=>{
          this.formData.options += key + ':' + this.choice_options[key] + ';'
        })
      }
      add_question(this.formData).then((response) => {
        let data =response.data;
        if(data.status ===1 ){
          this.$Message.success(data.message)
        }else{
          this.$Message.error(data.message);
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.add_question{
  width: 400px;
  margin:200px 0 0 400px;
}
.ivu-row {
  margin: 10px 0;
}
</style>
