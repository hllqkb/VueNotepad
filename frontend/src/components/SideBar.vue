<template>
  <div class="sidebar-container" @mousedown="onMouseDown">
    <el-menu 
      :default-active="activeMenu"
      :style="{background: props.currenttheme ? '#333' : '#fff'}"
      :text-color="props.currenttheme ? '#fff' : '#333'" 
    >
      <el-menu-item index="1">
        <el-input
          v-model="searchTerm"
          class="el-input-mini"
          placeholder="Search"
          :prefix-icon="Search"
          @keyup.enter="handleSearch"
        />
        <div @click="addnote()" style="margin-right: -10px;">
          <el-icon><Plus /></el-icon>
        </div>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Edit />
          </el-icon>笔记
        </template>
        <div class="notes-list">
          <el-menu-item 
            v-for="(note, index) in filteredNotes" 
            :key="note.fileName" 
            :index="`2-${index + 1}`"
            @click="fetchFileContent(note.fileName); setCurrentNoteId(note.id)"
          >
            {{ note.title }}
            <el-icon @click.stop="deleteNote(note.fileName)" style="margin-left: auto;">
              <Close />
            </el-icon>
          </el-menu-item>
        </div>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon><Clock /></el-icon>待办事项</template>
        <div class="todos-list">
          <el-menu-item 
            v-for="(todo, index) in todos" 
            :key="todo.id" 
            :index="`3-${index + 1}`"
          >
            <el-checkbox 
              v-model="todo.completed" 
              @change="handleTodoChange(todo)"
            >
              {{ todo.content }}
            </el-checkbox>
            <span class="todo-timestamp">{{ new Date(todo.created_at).toLocaleString() }}</span>
          </el-menu-item>
        </div>
      </el-sub-menu>
      <el-menu-item index="4" @click="openCalendar">
        <el-icon><Calendar /></el-icon>日历
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Calendar, Clock, Edit, Plus, Search, Close } from '@element-plus/icons-vue';
import axios from 'axios';
import config from '@/config.js'; // Import the config
import Fuse from 'fuse.js'; // Import Fuse.js

import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  currenttheme: {
    type: Boolean,
    default: false,
  },
});

const searchTerm = ref('');
const activeMenu = ref('2');
const notesList = ref([]);
const todos = ref([]); // 存储代办事项
const filteredNotes = ref([]); // 用于存储过滤后的笔记

const router = useRouter();
const emits = defineEmits(['updateVisible']);

const fetchNotes = async () => {
  try {
    const response = await axios.get(`${config.LOCAL_URL}/api/notes`); // Use LOCAL_URL
    notesList.value = response.data;
    // 按创建时间倒序排序
    notesList.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    filteredNotes.value = notesList.value; // 初始化过滤后的笔记
  } catch (error) {
    console.error('获取笔记列表失败:', error);
  }
};

const fetchFileContent = async (fileName) => {
  try {
    const response = await axios.get(`${config.LOCAL_URL}/api/notes/${fileName}`); // Use LOCAL_URL
    store.commit('setNote', response.data.content);
    store.commit('setTitle', response.data.title);
  } catch (error) {
    console.error('获取文件内容失败:', error);
  }
};

const setCurrentNoteId = (noteId) => {
  store.commit('setCurrentNoteId', noteId); // 更新当前笔记 ID
};

const fetchTodos = async () => {
  const account = "testUser"; // 这里可以替换为当前登录的用户名
  try {
    const response = await axios.get(`${config.API_BASE_URL}/api/notes/todos/${account}`);
    todos.value = response.data; // 设置代办事项
  } catch (error) {
    console.error('获取待办事项失败:', error);
  }
};

onMounted(() => {
  fetchNotes();
  fetchTodos(); // 组件挂载时获取代办事项
  watch(() => props.currenttheme, (newVal) => {
    if (newVal) {
      document.documentElement.style.setProperty('--el-menu-bg-color', '#333');
      document.documentElement.style.setProperty('--el-menu-border-color', '#444');
    } else {
      document.documentElement.style.setProperty('--el-menu-bg-color', '#fff');
      document.documentElement.style.setProperty('--el-menu-border-color', '#ccc');
    }
  });
});

// 监听 searchTerm 的变化以实现实时搜索
watch(searchTerm, (newVal) => {
  handleSearch(newVal);
});

function addnote() {
  const note = store.getters.note; // 从 Vuex 中获取笔记内容
  const title = store.getters.title; // 从 Vuex 中获取标题
  const newFileName = `${title}.md`; // 生成新的文件名
  const noteContent = note; // Replace with actual content
  const account = "testUser"; // Replace with the actual account

  // Send a request to create a new note
  axios.post(`${config.LOCAL_URL}/api/notes`, {
    content: noteContent,
    account: account,
    fileName: newFileName
  })
  .then(response => {
    console.log('笔记创建成功:', response.data);
    fetchNotes(); // Refresh the notes list
  })
  .catch(error => {
    console.error('创建笔记失败:', error);
  });

  emits('updateVisible', true);
  router.push('/addnote');
}

function openCalendar() {
  emits('updateVisible', true); // 打开登录窗口
  router.push('/calendar');
}

function handleSearch(query) {
  if (!query) {
    // 如果搜索内容为空，展示所有笔记
    filteredNotes.value = notesList.value;
    return;
  }

  const options = {
    keys: ['title', 'content'], // 搜索的字段
    includeScore: true, // 包含匹配分数
    threshold: 0.3, // 匹配阈值
  };
  const fuse = new Fuse(notesList.value, options);
  const result = fuse.search(query);
  filteredNotes.value = result.map(res => res.item); // 更新过滤后的笔记
}

const handleTodoChange = async (todo) => {
  if (todo.completed) {
    // Remove the todo from the frontend
    todos.value = todos.value.filter(t => t.id !== todo.id);

    // Send a request to the backend to delete the todo
    try {
      await axios.delete(`${config.API_BASE_URL}/api/notes/todos/${todo.id}`);
      console.log(`Todo with id ${todo.id} deleted successfully.`);
    } catch (error) {
      console.error('删除待办事项失败:', error);
      // Optionally, you can add the todo back to the list if the deletion fails
      todos.value.push(todo);
    }
  }
};

const deleteNote = async (fileName) => {
  // Remove the note from the frontend
  notesList.value = notesList.value.filter(note => note.fileName !== fileName);

  // Send a request to the backend to delete the note
  try {
    await axios.delete(`${config.LOCAL_URL}/api/deletenotes/${fileName}`);
    console.log(`Note with fileName ${fileName} deleted successfully.`);
  } catch (error) {
    console.error('删除笔记失败:', error);
    // Optionally, you can add the note back to the list if the deletion fails
    notesList.value.push({ fileName }); // You may need to restore the note details if available
  }
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh;
}

.notes-list, .todos-list {
  /* 可以根据需要添加样式 */
}

.todo-timestamp {
  margin-left: 10px; /* Add some spacing for the timestamp */
  font-size: 0.8em; /* Smaller font for the timestamp */
  color: #888; /* Lighter color for the timestamp */
}
</style>
