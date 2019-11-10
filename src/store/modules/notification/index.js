const state = {
  notification: {
    title: '',
    type: '',
    message: '',
    show: false
  },
  isLoading: false
}

const getters = {
  notification: _ => state.notification,
  isLoading: _ => state.isLoading
}

const actions = {
  setNotification (context, payload) {
    context.commit('setNotification', payload)
  },

  setLoading (context, payload) {
    context.commit('setLoading', payload)
  }
}

const mutations = {
  setNotification (state, payload) {
    state.notification = payload
  },

  setLoading (state, payload) {
    state.isLoading = payload
  }
}

export default { state, getters, actions, mutations }
