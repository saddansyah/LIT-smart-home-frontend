import { createStore } from 'vuex'

import device from './device.store'
import deviceUsage from './deviceUsage.store';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    device,
    deviceUsage
  }
});