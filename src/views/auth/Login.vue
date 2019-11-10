<template>
  <div class="login-area">
    <div class="w-full max-w-xs">

      <alert
        :title="notification.title"
        :type="notification.type"
        :message="notification.message"
        v-if="notification.show"/>

      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" novalidate @submit="signin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': submitted && $v.email.$error,  'border-green-500': submitted && !$v.email.$error}"
            id="email"
            type="email"
            placeholder="johndoe@domain.com"
            v-model="email"
          />
          <p class="text-red-500 text-sm" v-if="submitted && !$v.email.required">email is required</p>
          <p class="text-red-500 text-sm" v-if="submitted && !$v.email.email">email must be a valid email</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': submitted && $v.password.$error, 'border-green-500': submitted && !$v.password.$error}"
            id="password"
            type="password"
            placeholder="******************"
            v-model="password"
          />
          <p class="text-red-500 text-sm" v-if="submitted && $v.password.$error">password is required</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            id="login"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <loading v-if="isLoading" /> Sign In
          </button>
          <router-link
             id="create-account"
             class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
             :to="{name: 'signup'}"
          >Create Account</router-link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;2019 RentMe. All rights reserved.</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mounted () {
    if (this.isLoggedIn) {
      this.$router.push('/')
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: { required }
  },
  data () {
    return {
      email: '',
      password: '',
      submitted: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isLoading', 'notification'])
  },
  methods: {
    signin: async function (e) {
      e.preventDefault()
      this.submitted = true

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.$store.dispatch('setLoading', true)

      try {
        const { data } = await this.$store.dispatch('login', { email: this.email, password: this.password })
        this.$store.dispatch('setUser', { ...data })
        this.$store.dispatch('setIsLoggedIn', true)
        this.$router.push('/')
      } catch (_) {
        this.$store.dispatch('setNotification', {
          show: true,
          type: 'error',
          title: 'Login Failed',
          message: 'username and password not found'
        })
      }
      this.$store.dispatch('setLoading', false)
    }
  }
}
</script>
<style scoped>
.login-area {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
