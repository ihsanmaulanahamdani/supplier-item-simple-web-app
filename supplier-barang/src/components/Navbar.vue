<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Supplier Barang</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" v-if="isLogin">
        <li>
          <router-link style="text-decoration: none; color: white; margin-right: 10px;" to="/items">Items</router-link>
        </li>
        <li>
          <router-link style="text-decoration: none; color: white;" to="/suppliers">Suppliers</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mr-auto" v-else>

      </ul>
      <div v-if="isLogin">
        <Logout/>
      </div>
      <div v-else>
        <Login/>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'

export default {
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    Login,
    Logout
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>
