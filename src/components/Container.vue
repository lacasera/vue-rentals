<template>
    <div>
        <navbar />
        <div class="flex flex-row flew-col flex-wrap mb-4 h-screen">
            <slot name="sidebar" />
            <div class=" w-4/5 p-2 ">
                <div class="flex flex-row flex-wrap ">
                    <div class="w-full" v-if="notification.show">
                        <div class="m-2">
                            <alert
                               :show="notification.show"
                               :type="notification.type"
                               :message="notification.message"
                               :title="notification.title" />
                        </div>
                    </div>
                    <slot name="content"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/components/layout/NavBar'

export default {
  name: 'Container',
  components: {
    'navbar': NavBar
  },
  computed: {
    ...mapGetters(['notification'])
  }
}
</script>

<style scoped>

</style>
