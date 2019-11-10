<template>
  <container>
    <sidebar slot="sidebar" />
    <div slot="content" class="bg-white w-full rounded-sm">
        <listing-form type="create" />
    </div>
  </container>
</template>

<script>
import ListingForm from '@/components/forms/ListingForm'

export default {
  name: 'AddListing',
  components: {
    ListingForm
  }
}
</script>
