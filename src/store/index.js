import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import page from './modules/page'
import common from './modules/common'
import {getters} from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    common,
    page
  },
  getters
});
