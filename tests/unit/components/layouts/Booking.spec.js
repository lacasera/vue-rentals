import { mount, createLocalVue } from '@vue/test-utils'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import Booking from '@/components/layout/Booking'
import Datepicker from 'vuejs-datepicker'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuelidate)
localVue.use(VueRouter)

const router = new VueRouter()

describe('Booking.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      isLoading: () => ({
        isLoading: false
      })
    }
    store = new Vuex.Store({
      getters
    })
  })
  it('should match snapshot', () => {
    const wrapper = mount(Booking, {
      localVue,
      router,
      store,
      stubs: {
        Datepicker
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
