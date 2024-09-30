// store.js and Vuex
//this.$store.commit('setVisible', false); // 调用 mutation

import { createStore } from 'vuex';

export default createStore({
  state: {
    note: '', // 初始化状态
    title: '', // 初始化状态
    isVisible: false, // 初始化状态
  },
  mutations: {
    setTitle(state, payload) {
      state.title = payload; // 更新状态的方法
      //console.log(state.title);
    },

    setNote(state, payload) {
      state.note = payload; // 更新状态的方法
    },
    setVisible(state, payload) {
      state.isVisible = payload; // 更新状态的方法
    },
  },
  actions: {
    updateNote({ commit }, note) {
      commit('setNote', note); // 提交 mutation 来更新状态
    },
    updateNote({ commit }, note) {
      commit('setNote', note); // 提交 mutation 来更新状态
    },
    updateVisibility({ commit }, visibility) { // 改变方法名称
      commit('setVisible', visibility); // 提交 mutation 来更新状态
    },
    
  },
  getters: {
    title: state => state.title, // 获取状态的方法
    note: state => state.note, // 获取状态的方法
    isVisible: state => state.isVisible, // 获取 isVisible 状态的方法
  },
});
