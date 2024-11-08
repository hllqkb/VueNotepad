<template>
  <div>
    <!-- 表单 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" :inline="true" :rules="rules">
        <!-- 表单内容 -->
        <el-form-item label="姓名" :label-width="'120px'" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 192px" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="学号" :label-width="'120px'">
          <el-input v-model="form.number" autocomplete="off" style="width: 192px" placeholder="请输入学号"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="'120px'">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学院" :label-width="'120px'">
          <el-select v-model="form.school" placeholder="请选择学院">
            <el-option label="信工学院" value="信工学院"></el-option>
            <el-option label="传媒学院" value="传媒学院"></el-option>
            <el-option label="设计学院" value="设计学院"></el-option>
            <el-option label="商学院" value="商学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="人文学院" value="人文学院"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" :label-width="'120px'">
          <el-input v-model="form.class" autocomplete="off" style="width: 192px" placeholder="请输入班级"></el-input>
        </el-form-item>

        <el-form-item label="宿舍楼" :label-width="'120px'">
          <el-select v-model="form.don" placeholder="请选择宿舍楼">
            <el-option label="15栋" value="8栋"></el-option>
            <el-option label="16栋" value="9栋"></el-option>
            <el-option label="17栋" value="10栋"></el-option>
            <el-option label="18栋" value="11栋"></el-option>
            <el-option label="15栋" value="12栋"></el-option>
            <el-option label="16栋" value="13栋"></el-option>
            <el-option label="17栋" value="14栋"></el-option>
            <el-option label="18栋" value="15栋"></el-option>
            <el-option label="17栋" value="18栋"></el-option>
            <el-option label="18栋" value="21栋"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间号" :label-width="'120px'">
          <el-input
            v-model="form.fangjian"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入房间号"
          ></el-input>
        </el-form-item>

        <el-form-item label="床号" :label-width="'120px'">
          <el-select v-model="form.chuang" placeholder="请选择床号">
            <el-option label="1号床" value="1号床"></el-option>
            <el-option label="2号床" value="2号床"></el-option>
            <el-option label="3号床" value="3号床"></el-option>
            <el-option label="4号床" value="4号床"></el-option>
            <el-option label="5号床" value="5号床"></el-option>
            <el-option label="6号床" value="6号床"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" :label-width="'120px'">
          <el-input v-model="form.phone" autocomplete="off" style="width: 192px" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item label="家属电话" :label-width="'120px'">
          <el-input
            v-model="form.homephone"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入家属电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单的确认与取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="resetForm()">重 置</el-button>
        <el-button type="primary" @click="isAdd ? handleAdd() : handleUpData()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="myTable">
      <!-- 顶部功能区 -->
      <div class="top">
        <!-- 重置的按钮 -->
        <el-button v-if="searched" type="warning" style="marginright: 780px" @click="back">重置</el-button>

        <!-- 搜索框 -->
        <div class="seaDiv">
          <el-input placeholder="请输入姓名" v-model="input" clearable> </el-input>
        </div>

        <!-- 搜索的按钮 -->
        <el-button type="primary" style="marginright: 5px" @click="search" icon="el-icon-search">搜索</el-button>

        <!-- 添加的按钮 -->
        <el-button type="success" style="marginright: 20px" @click="add" icon="el-icon-edit">添加</el-button>
      </div>
      <!-- 表格主体 -->
      <div class="table_box">
        <el-table :data="this.$store.state.tableData" style="width: 100%" stripe border max-height="568">
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
              { text: '8栋', value: '8栋' },
              { text: '9栋', value: '9栋' },
              { text: '10栋', value: '10栋' },
              { text: '11栋', value: '11栋' },
              { text: '12栋', value: '12栋' },
              { text: '13栋', value: '13栋' },
              { text: '14栋', value: '14栋' },
              { text: '15栋', value: '15栋' },
              { text: '18栋', value: '18栋' },
              { text: '21栋', value: '21栋' }
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

          <!-- 编辑与退宿按钮  -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div style="marginleft: 5px">
                <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">退宿</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myTable',
  data() {
    return {
      // 判断表单是否该出现
      dialogFormVisible: false,
      //表单判断是添加还是编辑
      isAdd: '',
      //索引
      index: '',
      // 输入框内容
      input: '',
      // 搜索结果数量
      have: 0,
      //记录是否搜索过了
      searched: false,
      //主数据备份
      tableDataBF: [],
      //表单数据
      form: {
        name: '',
        don: '',
        fangjian: '',
        chuang: '',
        school: '',
        class: '',
        gender: '',
        number: '',
        phone: '',
        homephone: ''
      },
      // 表单内容检查
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击编辑按钮
    handleEdit(index, row) {
      if (this.globalVariable.thePower >= 1) {
        console.log('开始编辑')
        this.isAdd = false
        this.index = index
        //将对应数据放在显示的表单中
        for (let i in this.form) {
          this.form[i] = row[i]
        }
        this.dialogFormVisible = true
      } else {
        this.myError('无权限')
      }
    },
    // 点击删除按钮
    handleDelete(index) {
      if (this.globalVariable.thePower >= 1) {
        this.$store.state.tableData.splice(index, 1)
        console.log('删除成功')
      } else {
        this.myError('无权限')
      }
    },
    // 点击添加按钮
    add() {
      if (this.globalVariable.thePower >= 1) {
        this.isAdd = true
        // 将表单内容清空
        this.resetForm()
        this.dialogFormVisible = true
        console.log('开始添加')
      } else {
        this.myError('无权限')
      }
    },
    // 表单确认后判断为编辑现存学生触发的函数
    handleUpData() {
      if (this.form.name.length >= 2 && this.form.name.length <= 4) {
        for (let i in this.$store.state.tableData[this.index]) {
          this.$store.state.tableData[this.index][i] = this.form[i]
        }
        this.dialogFormVisible = false
        console.log('编辑完成')
        // 弹窗消息
        this.mySuccess('修改成功')
      } else {
        this.myWarning('请输入名字')
      }
    },
    // 表单确认后判断为添加新学生触发的函数
    handleAdd() {
      if (this.form.name.length >= 2 && this.form.name.length <= 4) {
        this.dialogFormVisible = false
        this.$store.state.tableData.unshift({
          name: this.form.name,
          don: this.form.don,
          fangjian: this.form.fangjian,
          chuang: this.form.chuang,
          school: this.form.school,
          class: this.form.class,
          gender: this.form.gender,
          number: this.form.number,
          phone: this.form.phone,
          homephone: this.form.homephone
        })
        console.log('添加完成')
        // 弹窗消息
        this.mySuccess('添加成功')
      } else {
        this.myWarning('请输入名字')
      }
    },
    // 表单重置后的函数
    resetForm() {
      for (let i in this.form) {
        this.form[i] = ''
      }
    },
    // 点击搜索按钮的函数
    search() {
      this.have = 0
      // 输入框有内容
      if (this.input) {
        //如果搜索过就先初始化主数据备份与主数据
        if (this.searched === true) {
          this.back()
        }
        //将数据备份
        this.tableDataBF = this.$store.state.tableData
        this.$store.state.tableData = []
        //开找
        this.tableDataBF.forEach((item, index) => {
          let reg = new RegExp(this.input)
          if (reg.test(item.name)) {
            this.$store.state.tableData.unshift(this.tableDataBF[index])
            this.searched = true
            this.have++
            this.searched = true
          }
        })
        // 没找到
        if (this.have === 0) {
          this.myWarning('没有对应学生数据')
          this.searched = true
        }
        // 找到了
        if (this.have !== 0) {
          this.$message({
            message: '找到了' + this.have + '个对应名字的学生',
            type: 'success',
            center: true
          })
        }
      }
      // 输入框无内容
      if (!this.input) {
        this.myWarning('请输入姓名')
      }
    },
    // 点击重置按钮后，初始化主数据备份与主数据
    back() {
      this.$store.state.tableData = this.tableDataBF
      this.tableDataBF = []
      this.searched = false
      console.log('已还原数据')
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
    this.$store.state.now = '宿舍人员'
  },
  destroyed() {
    // 离开页面后还原信息
    if (this.searched === true) {
      this.back()
    }
  },
  // 搜索框点叉后重置
  watch: {
    // 点击清空输入框的叉还原数据
    input: {
      handler(New, Old) {
        if (New === '' && Old !== '' && this.searched === true) {
          this.back()
        }
      }
    }
  }
}
</script>

<style scoped>
/* 表格插件大背景 */
.myTable {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  background-color: white;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  flex-direction: column;
}
/* 表格上方控制台 */
.top {
  width: 1480px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: end;
}
/* 搜索框 */
.seaDiv {
  width: 187.5px;
  height: 42px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 表格背景 */
.table_box {
  width: 1460px;
  height: 709px;
  margin-left: 10px;
}
</style>
