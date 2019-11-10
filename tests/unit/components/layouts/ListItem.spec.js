import { shallowMount } from '@vue/test-utils'
import ListItem from '@/components/layout/ListItem'

describe('ListItem.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(ListItem, {
      propsData: {
        item: 'Hello Word'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prop passed to it', () => {
    const wrapper = shallowMount(ListItem, {
      propsData: {
        item: 'Hello World'
      }
    })

    const expected = wrapper.find('.text-gray-700', '.text-lg ml-3').text()

    expect(expected).toBe('Hello World')
  })
})
