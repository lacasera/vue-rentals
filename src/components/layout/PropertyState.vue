<template>
    <span>
    <i v-if="state !== null" class="fa fa-thumbs-down cursor-pointer m-2 text-teal-500"></i>
    <i v-else class="fa fa-thumbs-up cursor-pointer m-2 text-teal-500"></i>
    </span>
</template>

<script>
export default {
  name: 'PropertyState',
  props: ['state']
}
</script>

<style scoped>

</style>
