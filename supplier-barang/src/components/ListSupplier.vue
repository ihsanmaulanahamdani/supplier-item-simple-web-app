<template>
  <div class="list-supplier">
    <table class="table table-bordered">
      <thead class="bg-dark">
        <tr class="text-white">
          <th scope="col">No</th>
          <th scope="col">Supplier Code</th>
          <th scope="col">Supplier Name</th>
          <th scope="col">Supplier Address</th>
          <th scope="col">Supplier Phone</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supp, index) in list_suppliers" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ supp.code }}</td>
          <td>{{ supp.name }}</td>
          <td>{{ supp.address }}</td>
          <td>{{ supp.phone }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteSupplier(supp._id)">Delete</button>
            &nbsp;
            <button class="btn btn-info" @click="editSuppLier(supp._id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  computed: {
    ...mapState([
      'list_suppliers'
    ])
  },
  methods: {
    ...mapActions([
      'getAllSuppliers'
    ]),
    deleteSupplier (id) {
      let { token } = this

      axios
        .delete(`http://localhost:3000/suppliers/delete/${id}`, {
          headers: {
            token
          }
        })
        .then(({ data }) => {
          alert(data.message)
          this.getAllSuppliers()
        })
        .catch(err => {
          console.error(err)
        })
    },
    editSuppLier (id) {
      this.$router.push({ path: '/suppliers/edit', query: { id } })
    }
  },
  mounted () {
    this.getAllSuppliers()
  }
}
</script>
