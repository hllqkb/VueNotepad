<!-- Start Generation Here -->
<template>
    <div class="calendar-container">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="选择日期"
        @change="handleDateChange"
        style="width: 100%;"
      />
      <div class="selected-date">
        <p>选中的日期: {{ formattedDate }}</p>
      </div>
      <div class="todo-container">
        <el-input
          v-model="todoText"
          placeholder="输入待办事项"
          style="margin-top: 10px;"
        />
        <el-button type="primary" @click="addTodo" style="margin-top: 10px;">添加待办事项</el-button>
      </div>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <span :class="{ completed: todo.isCompleted }">{{ todo.text }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import axios from 'axios';
  import config from '@/config.js'; // 确保引入配置文件
  
  const selectedDate = ref(null);
  const todoText = ref('');
  const todos = ref([]);
  
  const formattedDate = computed(() => {
    return selectedDate.value ? selectedDate.value.toLocaleDateString() : '未选择日期';
  });
  
  const handleDateChange = (date) => {
    console.log('选中的日期:', date);
  };
  
  const addTodo = async () => {
    if (todoText.value) {
      
      const account = localStorage.getItem('username');
      try {
        const response = await axios.post(`${config.API_BASE_URL}/api/notes/todos`, {
          content: todoText.value,
          account
        });
        console.log('代办事项发布成功:', response.data);
        todos.value.push({ text: todoText.value, isCompleted: false });
        todoText.value = ''; // 清空输入框
      } catch (error) {
        console.error('发布代办事项失败:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    padding: 20px;
  }
  .selected-date {
    margin-top: 10px;
    font-size: 16px;
  }
  .todo-container {
    margin-top: 20px;
  }
  .completed {
    text-decoration: line-through;
  }
  </style>
  <!-- End Generation Here -->