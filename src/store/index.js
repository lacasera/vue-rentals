import Vue from 'vue'
import Vuex from 'vuex'
import SecureLS from 'secure-ls'
import createLogger from "vuex/dist/logger";
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'
import rentals from './modules/rentals'
import notification from './modules/notification'

Vue.use(Vuex)

const ls = new SecureLS({ isCompression: false })
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    rentals,
    notification
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    }),
    createLogger()
  ]
})
