<template>
    <container>
        <sidebar slot="sidebar" />
        <div slot="content"  style="display: flex"  v-if="userListings.length">
            <rental-card  v-for="rental in userListings"  :key="rental.id" :property="rental" >
                <span slot="icons">
                     <i class="fa fa-trash cursor-pointer m-2 text-red-500"
                        @click="deleteRental(rental.id)"></i>
                    <span @click="updatePropertyStateHandler(rental.id, rental.published_at)">
                        <property-state :state="rental.published_at" />
                    </span>
                    <router-link :to="{name: 'edit-listing', params:{ id: rental.id }}">
                        <i class="fa fa-edit cursor-pointer m-2 text-blue-500"></i>
                    </router-link>
                </span>
            </rental-card>
        </div>
    </container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import RentalCard from '@/components/layout/RentalCard'
import PropertyState from '@/components/layout/PropertyState'

export default {
  name: 'MyListings',
  methods: {
    ...mapGetters(['getUserListings', 'notification']),
    ...mapActions(['deleteRental', 'publishProperty', 'fetchUserListings']),
    updatePropertyStateHandler: function (property, state) {
      const currentState = (state !== null) ? 'published' : 'unpublished'
      this.publishProperty({ property, currentState })
      this.$notify({
        group: 'rentme',
        duration: 10000,
        speed: 1000,
        title: this.alert.title,
        text: this.alert.text,
        type: this.alert.type
      })
    }
  },
  created () {
    this.$store.dispatch('fetchUserListings')
  },
  computed: {
    userListings: function () {
      return this.getUserListings()
    }
  },
  components: {
    RentalCard,
    PropertyState
  }
}
</script>
<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
</style>
