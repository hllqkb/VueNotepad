<template>
  <div class="myCheck">
    <div class="table_box">
      <!-- 表格主体 -->
      <el-table :data="this.$store.state.applyInfo" style="width: 100%" stripe border max-height="568">
        <!-- 文档名称 -->
        <el-table-column label="文档名称" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <!-- 文档类型 -->
        <el-table-column
          label="文档类型"
          width="90"
          :filters="[ { text: '类型1', value: '类型1' }, { text: '类型2', value: '类型2' } ]"
          :filter-method="filterType"
        >
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>

        <!-- 文档状态 -->
        <el-table-column label="文档状态" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myCheck',
  methods: {
    //同意
    handleAgree(index) {
      if (this.globalVariable.thePower >= 1) {
        if (
          this.$store.state.applyInfo[index].name.length >= 2 &&
          this.$store.state.applyInfo[index].name.length <= 4
        ) {
          // 添加的过程
          this.dialogFormVisible = false
          this.$store.state.tableData.unshift({
            name: this.$store.state.applyInfo[index].name,
            don: this.$store.state.applyInfo[index].don,
            fangjian: this.$store.state.applyInfo[index].fangjian,
            chuang: this.$store.state.applyInfo[index].chuang,
            school: this.$store.state.applyInfo[index].school,
            class: this.$store.state.applyInfo[index].class,
            gender: this.$store.state.applyInfo[index].gender,
            number: this.$store.state.applyInfo[index].number,
            phone: this.$store.state.applyInfo[index].phone,
            homephone: this.$store.state.applyInfo[index].homephone
          })
          console.log('已同意')
          // 弹窗消息
          this.mySuccess('已同意')
          // 输出入住申请中得数据
          this.$store.state.applyInfo.splice(index, 1)
          console.log('入住申请已删除')
        } else {
          this.myWarning('请输入名字')
        }
      } else {
        this.myError('无权限')
      }
    },
    //拒绝
    handleDelete(index) {
      if (this.globalVariable.thePower >= 1) {
        this.$store.state.applyInfo.splice(index, 1)
        console.log('入住申请已删除')
        this.mySuccess('已拒绝')
      } else {
        this.myError('无权限')
      }
    },
    // 表头筛选对应宿舍楼
    filterDon(value, row) {
      return row.don === value
    },
    // 表头筛选对应床号
    filterChuang(value, row) {
      return row.chuang === value
    },
    // 表头筛选对应学院
    filterSchool(value, row) {
      return row.school === value
    },
    // 表头筛选对应性别
    filterGender(value, row) {
      return row.gender === value
    },
    // 表头筛选对应文档类型
    filterType(value, row) {
      return row.type === value
    }
  },
  mounted() {
    this.$store.state.now = '文档申请'
  }
}
</script>

<style scoped>
/* 大背景 */
.myCheck {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 表格 */
.table_box {
  width: 1460px;
  height: 709px;
  margin-left: 10px;
}
</style>
