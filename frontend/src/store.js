// store.js and Vuex
//this.$store.commit('setVisible', false); // 调用 mutation

import { createStore } from 'vuex';

export default createStore({
  state: {
    note: '', // 初始化状态
    title: '', // 初始化状态
    currentNoteId: null, // 新增字段用于存储当前笔记 ID
    isVisible: false, // 初始化状态
    username: '', // 新增字段用于存储用户名
    isDarkTheme: false, // 新增字段用于存储主题状态
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload; // 更新状态的方法
    },

    setNote(state, payload) {
      state.note = payload; // 更新状态的方法
    },
    setCurrentNoteId(state, payload) {
      state.currentNoteId = payload; // 更新当前笔记 ID
    },
    setVisible(state, payload) {
      state.isVisible = payload; // 更新状态的方法
    },
    setUsername(state, payload) { // 新增 mutation
      state.username = payload; // 更新用户名
    },
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme; // 切换主题状态
    },
  },
  actions: {
    updateNote({ commit }, note) {
      commit('setNote', note); // 提交 mutation 来更新状态
    },
    updateCurrentNoteId({ commit }, noteId) {
      commit('setCurrentNoteId', noteId); // 提交 mutation 来更新当前笔记 ID
    },
    updateVisibility({ commit }, visibility) { // 改变方法名称
      commit('setVisible', visibility); // 提交 mutation 来更新状态
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem('jwt');
      const username = localStorage.getItem('username'); // 从 localStorage 获取用户名
      if (token) {
        commit('setUsername', username); // 如果存在 JWT，则设置用户名
      }
    },
  },
  getters: {
    title: state => state.title, // 获取状态的方法
    note: state => state.note, // 获取状态的方法
    currentNoteId: state => state.currentNoteId, // 获取当前笔记 ID
    isVisible: state => state.isVisible, // 获取 isVisible 状态的方法
    username: state => state.username, // 新增 getter
    isDarkTheme: state => state.isDarkTheme, // 获取主题状态的方法
  },
});
