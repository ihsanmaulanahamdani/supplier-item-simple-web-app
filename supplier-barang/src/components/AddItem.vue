<template>
  <div class="add-item">
    <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalAddItem"><i class="fas fa-sign-in-alt"></i> ADD ITEM</button>

    <div>
      <div class="modal fade" id="modalAddItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-item"></i> Add Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputCode">Code</label>
                  <input type="text" class="form-control" v-model="code" placeholder="Item Code">
                </div>
                <div class="form-group">
                  <label for="inputName">Name</label>
                  <input type="text" class="form-control" v-model="name" placeholder="Item Name">
                </div>
                <div class="form-group">
                  <label for="inputType">Type</label>
                  <input type="text" class="form-control" v-model="type" placeholder="Item Type">
                </div>
                <div class="form-group">
                  <label for="inputQuantity">Quantity</label>
                  <input type="text" class="form-control" v-model="quantity" placeholder="Item Quantity">
                </div>
                <div class="form-group">
                  <label for="inputUnit">Unit</label>
                  <input type="text" class="form-control" v-model="unit" placeholder="Item Unit">
                </div>
                <div class="form-group">
                  <label for="inputSupplier">Supplier</label>
                  <select class="form-control" v-model="supplier">
                    <option v-for="(supp, index) in list_suppliers" :key="index">
                      <option>{{ supp.name }}</option>
                    </option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="addItem" data-dismiss="modal">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      code: '',
      name: '',
      type: '',
      quantity: '',
      unit: '',
      supplier: '',
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
      'getAllSuppliers',
      'getAllItems'
    ]),
    addItem () {
      let { code, name, type, quantity, unit, supplier, token } = this

      axios
        .post('http://35.197.128.166/items/add', {
          code,
          name,
          type,
          quantity,
          unit,
          supplier
        }, {
          headers: {
            token
          }
        })
        .then(({ data }) => {
          this.code = ''
          this.name = ''
          this.type = ''
          this.quantity = ''
          this.unit = ''
          this.supplier = ''
          this.$router.push({ path: '/items' })
          this.getAllItems()
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.getAllSuppliers()
  }
}
</script>
