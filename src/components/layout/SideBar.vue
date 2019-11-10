<template>
    <div class=" w-1/5 h-vh py-6 px-2 bg-blue-900">
        <input
                class="pbg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                placeholder="Search ...">
        <div class="w-full md:w-1/3 px-2 py-6 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                Category
            </label>
            <div class="inline-block relative w-64">
                <select
                    v-model="category"
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option value="estate">Real Estate</option>
                    <option value="automobile">Automobile</option>
                    <option value="electronics">Electronics</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="w-full md:w-1/3 px-2 py-4 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                Min Price
            </label>
            <div class="inline-block relative w-64">
                <input
                   v-model="minPrice"
                   class="pbg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                   type="text"
                   placeholder="100">
            </div>
        </div>
        <div class="w-full md:w-1/3 px-2 py-4 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                Max Price
            </label>
            <div class="inline-block relative w-64">
                <input
                   v-model="maxPrice"
                   class="pbg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                   type="text"
                   placeholder="100">
            </div>
        </div>
        <div class="py-4">
            <button
                    @click="filterBy({category, maxPrice , minPrice})"
                    class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                Apply
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SideBar',
  data () {
    return {
      category: 'automobile',
      minPrice: 10,
      maxPrice: 2000
    }
  },
  methods: {
    ...mapActions(['filterBy'])
  }
}
</script>

<style scoped>

</style>
