<template>
  <div class="add-supplier">
    <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalAddSupplier"><i class="fas fa-sign-in-alt"></i> ADD SUPPLIER</button>

    <div>
      <div class="modal fade" id="modalAddSupplier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user"></i> Add Supplier</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
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
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="addSupplier" data-dismiss="modal">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      code: '',
      name: '',
      address: '',
      phone: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapActions([
      'getAllSuppliers'
    ]),
    addSupplier () {
      let { code, name, address, phone, token } = this

      axios
        .post('https://vast-wave-38866.herokuapp.com/suppliers/add', {
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
          this.code = ''
          this.name = ''
          this.address = ''
          this.phone = ''
          this.$router.push({ path: '/suppliers' })
          this.getAllSuppliers()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
