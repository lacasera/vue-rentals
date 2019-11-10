<template>
    <container>
        <sidebar slot="sidebar" />
        <div slot="content" class="bg-white w-full rounded-sm">
            <listing-form type="edit" />
        </div>
    </container>
</template>

<script>
import ListingForm from '@/components/forms/ListingForm'

export default {
  name: 'EditListing',
  components: {
    ListingForm
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
