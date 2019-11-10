<template>
  <div :class="alertClass" role="alert" >
    <div class="flex">
      <div class="py-1">
        <svg :class="iconClass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
      </div>
      <div>
        <p id="alert-title" class="font-bold"> {{ title}} </p>
        <p id="alert-message" class="text-sm"> {{message}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Alert',
  mounted () {
    setTimeout(() => {
      this.setNotification({
        show: false,
        type: '',
        title: '',
        message: ''
      })
    }, 5000)
  },
  methods: {
    ...mapMutations(['setNotification'])
  },
  data () {
    return {
      classMap: {
        error: {
          header: 'bg-red-100 border-red-500 text-red-900',
          icon: 'text-red-500'
        },
        success: {
          header: 'bg-teal-100 border-teal-500 text-teal-900',
          icon: 'text-teal-500'
        },
        warning: {
          header: 'bg-orange-100 border-orange-500 text-orange-900',
          icon: 'text-orange-500'
        },
        info: {
          header: 'bg-blue-100 border-blue-500 text-blue-900',
          icon: 'text-blue-500'
        }
      }
    }
  },
  computed: {
    alertClass: function () {
      return this.type ? 'border-t-4 rounded-b px-4 py-3 shadow-md '.concat(this.classMap[this.type]['header']) : ''
    },
    iconClass: function () {
      return this.type ? 'fill-current h-6 w-6 text-red-500 mr-4 '.concat(this.classMap[this.type]['icon']) : ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: function (value) {
        return ['success', 'info', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>
