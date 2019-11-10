<template>
  <div id="app" class="container-fluid h-full antialiased text-gray-900">
    <div class="bg-gray-200 min-h-screen h-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import enableInterceptor from './helpers/interceptor'
export default {
  name: 'app',
  beforeMount () {
    enableInterceptor()
  }
}
</script>

<style>
</style>
