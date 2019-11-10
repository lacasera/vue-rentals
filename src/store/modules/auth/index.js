import axios from 'axios'

const state = {
  isLoggedIn: false,
  user: {},
  access_token: '',
  userListings: []
}

const getters = {
  getToken: _ => state.access_token,
  isLoggedIn: _ => state.isLoggedIn,
  getUserListings: _ => state.userListings
}

const actions = {
  login (context, payload) {
    return axios.post('https://backend.app/api/v1/login', payload)
  },

   signup (context, payload) {
    return axios.post('/register', payload)
  },

  setUser (context, payload) {
    context.commit('setUser', payload)
  },

  setIsLoggedIn (context, payload) {
    context.commit('setIsLoggedIn', payload)
  },

  setUserListings (context, payload) {
    context.commit('setUserListings', payload)
  },

  async fetchUserListings (context) {
    const { data } = await axios.get('/me/listings')
    context.commit('setUserListings', data.results)
  }
}

const mutations = {
  setUser (state, { user, access_token: accessToken }) {
    state.user = user
    state.access_token = accessToken
  },

  setIsLoggedIn (state, payload) {
    state.isLoggedIn = payload
  },

  setUserListings (state, payload) {
    state.userListings = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
