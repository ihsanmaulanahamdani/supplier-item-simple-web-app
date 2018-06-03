<template>
  <div class="container">
    <div class="row">
      <AddItem/>
      &nbsp;
      <AddSupplier/>
      &nbsp;
      <button class="btn btn-outline-danger" @click="logoutUser">LOGOUT</button>
    </div>
  </div>
</template>

<script>
import AddSupplier from '@/components/AddSupplier.vue'
import AddItem from '@/components/AddItem.vue'

export default {
  components: {
    AddSupplier,
    AddItem
  },
  methods: {
    logoutUser () {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        window.location.replace('/')
      }
    }
  }
}
</script>
