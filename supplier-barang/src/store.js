import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list_suppliers: [],
    list_items: []
  },
  mutations: {
    getSuppliers (state, payload) {
      state.list_suppliers = payload
    },
    getItems (state, payload) {
      state.list_items = payload
    }
  },
  actions: {
    getAllSuppliers ({ commit }) {
      axios
        .get('https://vast-wave-38866.herokuapp.com/suppliers', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('getSuppliers', data.suppliers)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getAllItems ({ commit }) {
      axios
        .get('https://vast-wave-38866.herokuapp.com/items', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          commit('getItems', data.items)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})
