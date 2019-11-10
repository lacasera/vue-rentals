<template>
    <div class=" w-1/5 py-6 h-screen px-2 bg-blue-900">
        <div class="w-full md:w-1/3 px-2 py-4 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                From
            </label>
            <div class="inline-block relative w-64">
                <datepicker
                     v-model.trim="$v.from.$model"
                    :format="format"
                    input-class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                />
            </div>
        </div>
        <div class="w-full md:w-1/3 px-2 py-4 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                To
            </label>
            <div class="inline-block relative w-64">
                <datepicker
                        v-model.trim="$v.to.$model"
                    :format="format"
                    input-class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                />
            </div>
        </div>
        <div class="w-full md:w-1/3 px-2 py-4 mb-6 md:mb-0">
            <div class="inline-block relative w-64">
                <label class="flex items-center">
                    <input  v-model.trim="$v.agree.$model" type="checkbox" class="form-checkbox">
                    <span class="ml-2 text-white"> I agree with the T&Cs</span>
                </label>
            </div>
        </div>

        <div class="py-4">
            <button @click="handleBooking"
               class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                <loading v-if="isLoading" /> Book
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { required } from 'vuelidate/lib/validators'
import Loading from '@/components/layout/Loading'

export default {
  name: 'Booking',
  components: {
    Loading,
    Datepicker
  },
  data () {
    return {
      to: '',
      from: '',
      agree: false,
      format: 'd MMMM yyyy',
      property_id: this.$route.params.id
    }
  },
  validations: {
    to: { required },
    from: { required },
    agree: { required }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapActions(['book']),
    handleBooking: function () {
      this.book({
        to: this.to,
        from: this.from,
        property: this.property_id
      })
    }
  }
}
</script>

<style scoped>

</style>
