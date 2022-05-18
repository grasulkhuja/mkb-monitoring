import Vue from 'vue'
import Vuex from 'vuex'
import * as office from './modules/office'
import * as auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    office,
    auth
  }
})
