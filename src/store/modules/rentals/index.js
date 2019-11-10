import { cloneDeep, filter } from 'lodash'
import axios from 'axios'

const state = {
  rentals: []
}

const getters = {
  getRentals: (state) => state.rentals,

  getRentalById: (state) => (id) => {
    return cloneDeep(state.rentals).find(rental => rental.id === id)
  }
}

const actions = {

  filterBy (context, query) {
    const rentalCopy = cloneDeep(state.rentals)
    context.commit('filter', rentalCopy)
    const filteredRentals = filter(state.rentals, (rental) =>
      rental.priceInCents >= query.minPrice &&
            rental.priceInCents <= query.maxPrice &&
            rental.category === query.category
    )
    context.commit('filter', filteredRentals)
  },

  saveListing (context, payload) {
    return axios.post('/properties', payload)
  },

  updateProperty (context, payload) {
    return axios.put(`/properties/${payload.id}`, payload.data)
  },

  deleteRental (context, id) {
    return axios.delete(`properties/${id}`)
  },

  async fetchRentals (context) {
    const { data } = await axios.get('/properties')
    context.commit('addRental', data.results)
  },

  book (context, { to, from, property }) {
    return axios.post(`/properties/${property}/book`, { to, from })
  },

  publishProperty (context, { property, currentState }) {
    return axios.patch(`/properties/${property}/state`, { state: currentState })
  }
}

const mutations = {

  filter (state, payload) {
    state.rentals = payload
  },
  addRental (state, payload) {
    state.rentals = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
