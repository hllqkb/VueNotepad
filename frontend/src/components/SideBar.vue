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
            v-for="(note, index) in notesList" 
            :key="note.fileName" 
            :index="`2-${index + 1}`"
            @click="fetchFileContent(note.fileName)"
          >
            {{ note.title }}
          </el-menu-item>
        </div>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title><el-icon><Clock /></el-icon>记录</template>
        <el-menu-item index="3-1">item one</el-menu-item>
        <el-menu-item index="3-2">item two</el-menu-item>
        <el-menu-item index="3-3">item three</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4" @click="navigateTo('link4')">
        <el-icon><Calendar /></el-icon>日历
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>

import { ref, onMounted, watch, computed } from 'vue';
import { Calendar, Clock, Edit, Plus, Search } from '@element-plus/icons-vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const refresh=computed(()=>store.state.isupdatedNotes)
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

const router = useRouter();
const emits = defineEmits(['updateVisible']);

 //functions.updateNotes():  { fetchNotes();}
  

const fetchNotes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/notes'); // 替换成你的请求地址
    notesList.value = response.data;
    // 按创建时间倒序排序
notesList.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  } catch (error) {
    console.error('获取笔记列表失败:', error);
  }
};

const fetchFileContent = async (fileName) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/notes/${fileName}`); // 修正了这里，单斜杠
    //console.log('文件内容:', response.data);
    // 在这里处理文件内容的显示，可能要通过 props 或者 emit 传递给其他组件
    store.commit('setNote', response.data.content);
    store.commit('setTitle', response.data.title);
  } catch (error) {
    console.error('获取文件内容失败:', error);
  }
};

onMounted(() => {
  fetchNotes();
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

function addnote() {
  emits('updateVisible', true);
  router.push('/addnote');
}

function handleSearch() {
  console.log(`搜索内容: ${searchTerm.value}`);
  // 在这里可以实现搜索逻辑
}

function navigateTo(link) {
  const newIndex = link.charAt(link.length - 1);
  if (!isNaN(newIndex)) {
    activeMenu.value = newIndex;
    
    const menuItems = document.querySelectorAll('.el-menu-item');
    menuItems.forEach(item => {
      item.classList.remove('active');
    });

    const selectedMenuItem = document.querySelector(`.el-menu-item[index="${newIndex}"]`);
    if (selectedMenuItem) {
      selectedMenuItem.classList.add('active');
    }
  }
  console.log(`导航到: ${link}`);
}
</script>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh;
}

.notes-list {
  /* 可以根据需要添加样式 */
}
</style>
