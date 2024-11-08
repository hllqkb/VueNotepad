<template>
  <div class="myCheck">
    <div class="table_box">
      <!-- 表格主体 -->
      <el-table :data="this.$store.state.applyInfo" style="width: 100%" stripe border max-height="568">
        <!-- 姓名 -->
        <el-table-column label="姓名" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <!-- 宿舍楼 -->
        <el-table-column
          label="宿舍楼"
          width="90"
          :filters="[
            { text: '15栋', value: '15栋' },
            { text: '16栋', value: '16栋' },
            { text: '17栋', value: '17栋' },
            { text: '18栋', value: '18栋' }
          ]"
          :filter-method="filterDon"
        >
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.don }}</span>
          </template>
        </el-table-column>

        <!-- 房间号 -->
        <el-table-column label="房间号" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.fangjian }}</span>
          </template>
        </el-table-column>

        <!-- 床号 -->
        <el-table-column
          label="床号"
          width="90"
          :filters="[
            { text: '1号床', value: '1号床' },
            { text: '2号床', value: '2号床' },
            { text: '3号床', value: '3号床' },
            { text: '4号床', value: '4号床' },
            { text: '5号床', value: '5号床' },
            { text: '6号床', value: '6号床' }
          ]"
          :filter-method="filterChuang"
        >
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.chuang }}</span>
          </template>
        </el-table-column>

        <!-- 学院 -->
        <el-table-column
          label="学院"
          width="90"
          :filters="[
            { text: '信工学院', value: '信工学院' },
            { text: '传媒学院', value: '传媒学院' },
            { text: '设计学院', value: '设计学院' },
            { text: '商学院', value: '商学院' },
            { text: '外国语学院', value: '外国语学院' },
            { text: '人文学院', value: '人文学院' }
          ]"
          :filter-method="filterSchool"
        >
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.school }}</span>
          </template>
        </el-table-column>

        <!-- 班级 -->
        <el-table-column label="班级" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.class }}</span>
          </template>
        </el-table-column>

        <!-- 性别 -->
        <el-table-column
          label="性别"
          width="90"
          :filters="[
            { text: '男', value: '男' },
            { text: '女', value: '女' }
          ]"
          :filter-method="filterGender"
        >
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.gender }}</span>
          </template>
        </el-table-column>

        <!-- 学号 -->
        <el-table-column label="学号" width="130">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.number }}</span>
          </template>
        </el-table-column>

        <!-- 电话 -->
        <el-table-column label="电话" width="130">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <!-- 家属电话 -->
        <el-table-column label="家属电话" width="130">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.homephone }}</span>
          </template>
        </el-table-column>

        <!-- 同意与拒绝按钮  -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div style="marginleft: 5px">
              <el-button size="mini" type="success" @click="handleAgree(scope.$index)">同意</el-button>

              <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">拒绝</el-button>
            </div>
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
    }
  },
  mounted() {
    this.$store.state.now = '入住申请'
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
