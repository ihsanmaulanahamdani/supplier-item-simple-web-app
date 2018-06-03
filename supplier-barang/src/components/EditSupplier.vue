<template>
<div class="edit-supplier">
  <div style="margin: 25px 25px; border: 1px solid black; padding: 15px; border-radius: 5px;">
    <h1 class="text-center mt-2">Edit Supplier</h1>
    <div class="form-group">
      <label for="inputCode">Code</label>
      <input type="text" class="form-control" v-model="code" placeholder="Supplier Code">
    </div>
    <div class="form-group">
      <label for="inputName">Name</label>
      <input type="text" class="form-control" v-model="name" placeholder="Supplier Name">
    </div>
    <div class="form-group">
      <label for="inputAddress">Address</label>
      <input type="text" class="form-control" v-model="address" placeholder="Supplier Address">
    </div>
    <div class="form-group">
      <label for="inputPhone">Phone</label>
      <input type="text" class="form-control" v-model="phone" placeholder="Supplier Phone">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-outline-success" @click="editDataSupplier">SUBMIT</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      supplierId: '',
      code: '',
      name: '',
      address: '',
      phone: ''
    }
  },
  computed: {
    ...mapState([
      'list_suppliers'
    ])
  },
  methods: {
    editDataSupplier () {
      let { supplierId, token, code, name, address, phone } = this

      axios
        .put(`http://35.197.128.166/suppliers/update/${supplierId}`, {
          code,
          name,
          address,
          phone
        }, {
          headers: {
            token
          }
        })
        .then(({ data }) => {
          this.$router.push({ path: '/suppliers' })
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created () {
    this.supplierId = this.$route.query.id

    this.list_suppliers.forEach(supp => {
      if (supp._id === this.supplierId) {
        this.code = supp.code
        this.name = supp.name
        this.address = supp.address
        this.phone = supp.phone
      }
    })
  }
}
</script>
