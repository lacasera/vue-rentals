<template>
    <container :showBooking="true">
        <booking slot="sidebar" />
        <div slot="content" class="bg-white p-4 w-full">
            <div class="flex mb-4">
                <div class="w-1/2 p-2">
                    <div class="md:flex-shrink-0 shadow-lg">
                        <carousel :per-page="1" :autoplay="true" :loop="true" :mouse-drag="true">
                            <slide v-for="(image , index) in property.images" :key="index">
                              <img class="rounded-lg w-full" :src="image.url" :alt="property.title">
                            </slide>
                          </carousel>
                    </div>
                    <div class="p-2 text-justify">
                        <h1 class="m-3 font-semibold text-lg leading-tight truncate">
                          {{ property.title }} ( ${{ property.price }} / {{ property.pricing_frequency }})
                          </h1>
                        {{property.description}}
                    </div>
                </div>
                <div class="w-1/2 m-3 p-4 bg-gray-100 rounded-lg text-justify">
                    <div class="flex flex-wrap mt-3 px-6">
                      <h1>Features</h1>
                        <ul>
                            <list-item
                              v-for="(feature, index) in property.features"
                              :key="index"
                              :item="feature" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </container>
</template>

<script>
import { mapGetters } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

import ListItem from '@/components/layout/ListItem'
import Booking from '@/components/layout/Booking'

export default {
  name: 'Listing',
  computed: {
    property () {
      return this.getRentalById()(this.$route.params.id)
    }
  },
  components: {
    ListItem,
    Carousel,
    Slide,
    Booking
  },
  methods: {
    ...mapGetters(['getRentalById'])
  }
}
</script>

<style scoped>

</style>
