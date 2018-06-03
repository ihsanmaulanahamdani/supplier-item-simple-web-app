<template>
  <div class="list-item">
    <table class="table table-bordered">
      <thead class="bg-dark">
        <tr class="text-white">
          <th scope="col">No</th>
          <th scope="col">Item Code</th>
          <th scope="col">Supplier</th>
          <th scope="col">Item Name</th>
          <th scope="col">Item type</th>
          <th scope="col">Item Quantity</th>
          <th scope="col">Item Unit</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list_items" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.code }}</td>
          <td>{{ item.supplier }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.unit }}</td>
          <td><button class="btn btn-danger" @click="deleteItem(item._id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'list_items'
    ])
  },
  methods: {
    ...mapActions([
      'getAllItems'
    ]),
    deleteItem (id) {
      axios
        .delete(`http://35.197.128.166/items/delete/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          alert(data.message)
          this.getAllItems()
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getAllItems()
  }
}
</script>
