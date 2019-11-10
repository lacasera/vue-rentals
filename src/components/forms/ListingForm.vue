<template>
            <form class="m-8" novalidate>
                <div class="mt-4">
                    <div class="mt-2">
                        <label class="block">
                            <span class="text-gray-700">Listing Title</span>
                            <input
                               v-model="listing.title"
                               class="form-input mt-1 block w-full" placeholder="Jane Doe"
                               :class="{
                                'border-red-500': submitted && $v.listing.title.$error,
                                 'border-green-500': submitted && !$v.listing.title.$error
                                 }"
                            >
                        </label>
                        <p class="text-red-500 text-sm" v-if="submitted && !$v.listing.title.required">title is required</p>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="mt-2">
                        <label class="block mt-4">
                            <span class="text-gray-700">Category</span>
                            <select
                                v-model="listing.category"
                                class="form-select mt-1 block w-full"
                                :class="{
                                'border-red-500': submitted && $v.listing.category.$error,
                                 'border-green-500': submitted && !$v.listing.category.$error}"
                            >
                                <option value="electronics">Electronics</option>
                                <option value="automobile">Automobile</option>
                                <option value="real-estate">Real Estate</option>
                            </select>
                        </label>
                        <p class="text-red-500 text-sm" v-if="submitted && !$v.listing.category.required">category is required</p>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="block">
                        <span class="text-gray-700">Price</span>
                        <input
                           v-model="listing.price"
                           class="form-input mt-1 block w-full"
                           placeholder="10"
                           :class="{ 'border-red-500': submitted && $v.listing.price.$error,  'border-green-500': submitted && !$v.listing.price.$error}"
                        >
                    </label>
                    <p class="text-red-500 text-sm" v-if="submitted && !$v.listing.price.required">price is required</p>
                    <p class="text-red-500 text-sm" v-if="submitted && !$v.listing.price.numeric">price must be a number</p>
                </div>
                <div class="mt-4">
                    <label class="block mt-4">
                        <span class="text-gray-700">Pricing Frequency</span>
                        <select
                            v-model="listing.pricing_frequency"
                            class="form-select mt-1 block w-full"
                            :class="{ 'border-red-500': submitted && $v.listing.pricing_frequency.$error,  'border-green-500': submitted && !$v.listing.pricing_frequency.$error}"
                        >
                            <option value="">{{listing.pricing_frequency}}</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                        <p class="text-red-500 text-sm" v-if="submitted && !$v.listing.pricing_frequency.required">pricing frequency is required</p>
                    </label>
                </div>
                <div class="mt-4">
                    <label class="block mt-4">
                        <span class="text-gray-700">Description</span>
                        <vue-editor
                           v-model.trim="listing.description"
                           :class="{
                                'border-red-500': submitted && $v.listing.description.$error,
                                'border-green-500': submitted && !$v.listing.description.$error
                           }"
                           class="resize border rounded focus:outline-none w-full focus:shadow-outline"
                           rows="5"></vue-editor>
                    </label>
                    <p
                       class="text-red-500 text-sm"
                       v-if="submitted && !$v.listing.description.required">
                        description is required
                    </p>
                </div>
                <div class="mt-4">
                    <label class="block mt-4">
                        <span class="text-gray-700">Features</span>
                        <input v-model="feature" class="form-input mt-1 block w-full" @keyup.space="addFeature">
                    </label>
                    <div class="tooltip">
                        <list-item
                                class="m-2 text-sm"
                                v-for="(feature, index ) in listing.features"
                                :key="index"
                                :item="feature" />
                        <span class="tooltiptext">
                Click to remove from feature list.
            </span>
                    </div>
                </div>
                <div class="mt-4 w-full">
                    <VueCloudinaryUpload @images-uploaded="imagesHandler" />
                </div>
                <div class="flex m-6">
                    <label class="flex items-center" v-if="type ==='create'">
                        <input v-model="listing.publish" type="checkbox" class="form-checkbox">
                        <span class="ml-2"> Publish</span>
                    </label>
                </div>
                <button v-if="type === 'create'" type="button" @click="saveListing"
                        class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                    <loading v-if="isLoading" />  Create Listing
                </button>
                <button v-if="type === 'edit'" @click="updateProperty" type="button"
                        class="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                    <loading v-if="isLoading" />  Update Listing
                </button>
            </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueEditor } from 'vue2-editor'
import { required, numeric } from 'vuelidate/lib/validators'

import ListItem from '@/components/layout/ListItem'
import VueCloudinaryUpload from '@/components/VueCloudinaryUpload'

export default {
  name: 'ListingForm',
  components: {
    ListItem,
    VueEditor,
    VueCloudinaryUpload
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  mounted () {
    if (this.type === 'edit') {
      this.listing = this.getRentalById()(this.$route.params.id)
    }
  },
  data () {
    return {
      listing: {
        price: '',
        title: '',
        category: '',
        images: [],
        description: '',
        features: [],
        publish: false,
        pricing_frequency: ''
      },
      feature: '',
      submitted: false
    }
  },
  validations: {
    listing: {
      title: { required },
      price: { required, numeric },
      category: { required },
      description: { required },
      pricing_frequency: { required }
    }
  },
  props: ['type'],
  methods: {
    ...mapGetters(['getRentalById']),

    addFeature () {
      this.listing.features.unshift(this.feature)
      this.feature = ''
    },

    async saveListing () {
      let notification

      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        const { data } = await this.$store.dispatch('saveListing', { ...this.listing })
        this.$store.dispatch('addRental', data.results)
        notification = {
          show: true,
          title: 'Success',
          type: 'success',
          message: 'Listing saved successfully....'
        }

        this.$router.push('/my/lisitngs')
      } catch (e) {
        notification = {
          show: true,
          title: 'Error',
          type: 'error',
          message: 'Unable to save listing....'
        }
      }
      this.$store.dispatch('setLoading', false)
      this.$store.dispatch('setNotification', notification)
    },

    async updateProperty () {
      this.submitted = true
      let notification
      this.$store.dispatch('setLoading', true)

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      try {
        await this.$store.dispatch('updateProperty', { id: this.$route.params.id, data: this.listing })
        notification = {
          show: true,
          title: 'Success',
          type: 'success',
          message: 'Listing saved successfully....'
        }
      } catch (_) {
        notification = {
          show: true,
          title: 'Error',
          type: 'error',
          message: 'Unable to save listing....'
        }
      }
      this.$store.dispatch('setLoading', false)
      this.$store.dispatch('setNotification', notification)
    },
    imagesHandler ($event) {
      this.listing.images = $event.images
    }
  }
}
</script>

<style scoped>
    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        color: #a0aec0;
        z-index: 1;
        font-size: smaller
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
</style>
