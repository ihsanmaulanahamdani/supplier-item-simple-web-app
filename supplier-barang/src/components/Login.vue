<template>
  <div>
    <button class="btn btn-outline-success" data-toggle="modal" data-target="#modalLogin"><i class="fas fa-sign-in-alt"></i> LOGIN</button>

    <div>
      <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user"></i> Login</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputUsername">Username</label>
                  <input type="text" class="form-control" v-model="username" placeholder="Username">
                </div>
                <div class="form-group">
                  <label for="inputPassword">Password</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Password">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="loginUser">LOGIN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      let { username, password } = this

      axios
        .post('https://vast-wave-38866.herokuapp.com/login', {
          username,
          password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.user.id)
            window.location.reload()
          }
        })
        .catch(err => {
          alert('Email or Password Wrong!!!')
          console.error(err)
        })
    }
  }
}
</script>
