<template>
  <section class="login">
    <form class="form">
      <div class="form-item"><label for="email">email:  </label><input type="text" id="email" v-model="email"></div>
      <div class="form-item"><label for="password">password:  </label><input type="text" id="password" v-model="password"></div>
      <div class="form-item">
        <button @click="submit">login</button>
      </div>
    </form>
  </section>
</template>

<script>
import { onLogin } from '../vue-apollo.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['login']),
    submit(e) {
      e.preventDefault();
      // if (this.email && this.password) {
      //   onLogin(this.$apolloProvider.defaultClient, `${this.email}/${this.password}`)
      //   this.login()
      //   this.$router.push('/')
      // } else {
      //   alert('不能为空')
      // }
      fetch('http://localhost:3001/get-token', {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          let token = data.token
          console.log('login success', token)
          onLogin(this.$apolloProvider.defaultClient, token)
          this.login()
          this.$router.push('/')
        } else {
          alert(data.message || 'fail to get auth token')
        }
      }).catch(err => {
        console.error('errp',err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.form-item {
  margin-top: 1em;
}
label {
  display: inline-block;
  width: 80px;
  text-align: right;
}
</style>
