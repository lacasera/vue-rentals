import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import Container from '@/components/Container'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Container.vue', () => {
  let wrapper
  let getters
  let store

  beforeEach(() => {
    getters = {
      notification: () => ({
        show: false
      })
    }
    store = new Vuex.Store({
      getters
    })
  })
  it('should render correctly', () => {
    wrapper = shallowMount(Container, {
      store,
      localVue,
      slots: {
        'sidebar': '<div>Sidebar Slot</div>',
        'content': '<div>Content Slot</div>'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render both sidebar and content slots', () => {
    wrapper = shallowMount(Container, {
      store,
      localVue,
      slots: {
        'sidebar': '<div class="sidebar">Sidebar Slot</div>',
        'content': '<div class="content">Content Slot</div>'
      }
    })

    expect(wrapper.find('.sidebar').text()).toEqual('Sidebar Slot')
    expect(wrapper.find('.content').text()).toEqual('Content Slot')
  })
})
