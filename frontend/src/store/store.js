import Vue from 'vue'
import Vuex from 'vuex'

// Entrance section
import login from './entrance/login'
import signup from './entrance/signup'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    login,
    signup
  },
  strict: debug
})
