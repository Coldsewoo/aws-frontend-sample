import Vue from 'vue';
import Vuex from 'vuex';

Vue.config.devtools = true;


Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    posts: [],
    _id: 1,
  },
  mutations: {
    newPost(state, payload) {
      const post = {
        ...payload,
        _id: state._id,
        edit: false,
      }
      state.posts.push(post)
      state._id += 1
    },
    deleteMessage(state, _id) {
      const deleteIndex = state.posts.findIndex(x => x._id === _id)
      state.posts.splice(deleteIndex, 1)
    },
    editMessage(state, payload) {
      const editIndex = state.posts.findIndex(x => x._id === payload._id)
      state.posts[editIndex] = {
        ...payload,
        edit: false,
      }
    },
  },
});

export default store
