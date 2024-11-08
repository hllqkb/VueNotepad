import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    avatar: localStorage.getItem('avatar') || '',
    background: localStorage.getItem('background') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
      localStorage.setItem('avatar', avatar);
    },
    setBackground(state, background) {
      state.background = background;
      localStorage.setItem('background', background);
    },
    clearAuth(state) {
      state.token = '';
      state.avatar = '';
      state.background = '';
      localStorage.removeItem('token');
      localStorage.removeItem('avatar');
      localStorage.removeItem('background');
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('setToken', payload.token);
      commit('setAvatar', payload.avatar);
      commit('setBackground', payload.background);
    },
    logout({ commit }) {
      commit('clearAuth');
    }
  },
  modules: {}
}); 