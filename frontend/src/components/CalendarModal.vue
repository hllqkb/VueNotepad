<template>
  <div>
    <el-button type="primary" @click="openDialog">选择日期</el-button>
    
    <el-dialog :visible.sync="dialogVisible" title="选择日期" @close="resetDate">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        :shortcuts="shortcuts"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDate">取消</el-button>
        <el-button type="primary" @click="confirmDate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const dialogVisible = ref(false); // 控制弹窗的显示状态
const selectedDate = ref(''); // 存储选择的日期

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true;
};

// 确认选择的日期
const confirmDate = () => {
  ElMessage.success(`您选择的日期是: ${selectedDate.value}`);
  dialogVisible.value = false; // 关闭弹窗
};

// 重置日期和关闭弹窗
const resetDate = () => {
  selectedDate.value = ''; // 清空选择的日期
  dialogVisible.value = false; // 关闭弹窗
};

// 快捷选项
const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    },
  },
];
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style> 