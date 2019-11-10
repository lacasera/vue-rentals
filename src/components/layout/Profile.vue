<template>
<div class="bg-gray-200 text-right max-w-xs mx-auto" >
  <div id="dropdown" class="relative inline-block">
    <button @click="toggle" class="inline-flex items-center pl-6 pr-2 py-2 font-semibold text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
      Account
      <i class="fa fa-bell text-red-500" ></i>
      <svg class="ml-2 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/>
      </svg>
    </button>
    <transition
      enter-class="opacity-0 scale-90"
      enter-active-class="ease-out transition-fastest"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-active-class="ease-in transition-fastest"
      leave-to-class="opacity-0 scale-90"
    >
      <!-- Replace "right-0 origin-top-right" with "left-0 origin-top-left" to left-align the dropdown -->
      <div v-if="isOpen" class="mt-2 absolute right-0 origin-top-right">
        <div class="w-64 text-left bg-white rounded-lg shadow-lg">
          <div class=" border-gray-200 py-1">
              <router-link class="block px-6 py-3 leading-tight hover:bg-gray-200" :to="{name: 'my-listings'}" >
                My Listings
              </router-link>
          </div>
          <form class="border-t-2 border-gray-200 py-1" action="#" method="POST">
            <button class="block w-full px-6 py-3 text-left leading-tight hover:bg-gray-200">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>
<script>
export default {
  name: 'Profile',
  data: function () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
