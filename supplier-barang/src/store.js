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
        .get('http://localhost:3000/suppliers', {
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
        .get('http://localhost:3000/items', {
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
