import userService from '@/services/user.service'
import {
  LOAD_USER_LIST,
  SET_USER_LIST,

  DELETE_USER,
  SET_DELETED_USER,
 
  ADD_NEW_USER,
  SET_ADDED_USER,


  UPDATE_USER,
  SET_UPDATED_USER,

} from './actions.type'

const state = {
    userList: null,
    currentUser: null,
}
 
const actions = {
  async [LOAD_USER_LIST] ({commit}){
    const res = await userService.getAll();
    commit(SET_USER_LIST, res.data);
    return res;
  },
  async [DELETE_USER] ({commit}, id){
    const res = await userService.deleteOne(id);
    commit(SET_DELETED_USER, id);
    return res;
  },
  async [ADD_NEW_USER] ({commit}, payload){
    const res = await userService.addOne(payload);
    commit(SET_ADDED_USER, payload);
    return res;
  },
  async [UPDATE_USER] ({commit}, payload){
    const res = await userService.updateOne(payload);
    commit(SET_UPDATED_USER, res.data);
    return res;
  },
}

// in store
const getters = {
  userList(state) {
    return state.userList;
  },
  currentUser(state){
    return state.currentUser;
  },
  userById: (state) => (id) => {
    return state.userList.find(x => x.id === id);
  }
}

const mutations = {
  [SET_USER_LIST] (state, data) {
    state.userList = data;
  },
  [SET_DELETED_USER](state, deletedId) {
    state.userList = state.userList.filter(x => x.id !== deletedId);
  },
  [SET_ADDED_USER](state, payload){
    state.userList.push(payload);
  },
  [SET_UPDATED_USER](state, payload){
    state.userList = state.userList.map(obj => obj.id == payload.id ? payload : obj);
  },
}

export default {
  state,
  actions,
  mutations,
  getters
};
