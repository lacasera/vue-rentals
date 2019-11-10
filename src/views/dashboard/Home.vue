<template>
  <container>
    <div slot="content">
      <span :style="{display: 'flex'}"  v-if="getRentals.length">
        <rental-card v-for="rental in getRentals" :property="rental" :key="rental.id">
           <span slot="icons">
             <i v-if="rental.is_booked" class="fa fa-lock m-2 text-green-500" ></i>
           </span>
        </rental-card>
      </span>
    </div>
  </container>
</template>

<script>
import { mapGetters } from 'vuex'
import RentalCard from '@/components/layout/RentalCard'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getRentals'])
  },
  created () {
    this.$store.dispatch('fetchRentals')
  },
  components: {
    RentalCard
  }
}
</script>

<style lang="scss" scoped>
  .center {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    text-align: center;
  }
</style>
