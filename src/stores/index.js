import { createStore } from 'vuex'

import device from './device.store'
import deviceUsage from './deviceUsage.store';
import auth from './auth.store';

export default createStore({
  state: {
    access_token: localStorage.getItem('access_token')
  },
  mutations: {
    SET_TOKEN(state, payload){
      state.access_token = payload;
    }
  },
  actions: {
  },
  getters: {
    isAuth: state => {
      if(state.access_token != "" && state.access_token != null){
        return true
      }
      return false
    }
  },
  modules: {
    device,
    deviceUsage,
    auth
  }
});