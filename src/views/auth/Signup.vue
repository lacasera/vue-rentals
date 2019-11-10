<template>
  <div class="login-area">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" novalidate @submit="createAccount">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             :class="{ 'border-red-500': submitted && $v.name.$error,  'border-green-500': submitted && !$v.name.$error}"
             id="name"
             type="text"
             placeholder="John Doe"
             v-model="name"
          />
            <p class="text-red-500 text-sm" v-if="submitted && !$v.name.required">name is required</p>
            <p class="text-red-500 text-sm" v-if="submitted && !$v.name.minLength">name must be at least 5 characters</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone</label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': submitted && $v.phone.$error,  'border-green-500': submitted && !$v.phone.$error}"
              id="phone"
              type="tel"
              placeholder="1234567890"
              v-model="phone"
          />
            <p class="text-red-500 text-sm" v-if="submitted && !$v.phone.required">phone is required</p>
            <p class="text-red-500 text-sm" v-if="submitted && !$v.phone.phoneNumber">phone must be a valid phone number</p>
        </div>
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
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Password</label>
          <input
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             :class="{ 'border-red-500': submitted && $v.password.$error,  'border-green-500': submitted && !$v.password.$error}"
             id="password"
             type="password"
             placeholder="******************"
             v-model="password"
          />
            <p class="text-red-500 text-sm" v-if="submitted && !$v.password.required">password is required</p>
          <p class="text-red-500 text-sm" v-if="submitted && !$v.password.minLength">
            password must be at least 6 characters
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm_password">Confirm Password</label>
          <input
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
             :class="{ 'border-red-500': submitted && $v.confirm_password.$error}"
             id="confirm_password"
             type="password"
             placeholder="******************"
             v-model.trim="confirm_password"
          />
            <p class="text-red-500 text-sm" v-if="submitted && !$v.confirm_password.required">
              confirm your password
            </p>

            <p class="text-red-500 text-sm" v-if="submitted && !$v.confirm_password.sameAs">
              passwords do not match
            </p>
        </div>
        <div class="flex items-center justify-between">
          <button
              id="signup"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
          >
            <Loading v-if="isLoading" /> Sign Up
          </button>
          <router-link
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              :to="{name: 'login'}"
          >Sign in</router-link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;2019 RentMe. All rights reserved.</p>
    </div>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { phoneNumber } from '@/helpers/validators/'

import Loading from '@/components/layout/Loading'

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      confirm_password: '',
      submitted: false
    }
  },
  validations: {
    name: { required, minLength: minLength(5) },
    email: { required, email },
    phone: {
      required,
      phoneNumber
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirm_password: {
      required,
      sameAs: sameAs('password')
    }
  },
  methods: {
    async createAccount (e) {
      e.preventDefault()
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.$store.dispatch('setLoading', true)
      try {
        const { data } = await this.$store.dispatch('signup', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setUser', { ...data })
        this.$store.dispatch('setIsLoggedIn', true)
        this.$router.push('/')
      } catch (e) {
        this.$store.dispatch('setNotification', {
          show: true,
          type: 'error',
          title: 'Login Failed',
          message: 'username and password not found'
        })
      }
      this.$store.dispatch('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['notification', 'isLoading'])
  },
  components: {
    Loading
  }
}
</script>
<style scoped>
    .login-area{
        width: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
