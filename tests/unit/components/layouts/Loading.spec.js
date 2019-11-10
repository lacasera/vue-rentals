import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/layout/Loading.vue'
let wrapper

describe('Loading.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(Loading)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should contain a spinner icon', () => {
    expect(wrapper.contains('i')).toBe(true)
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['fa', 'fa-spinner', 'fa-spin'])
    )
  })
})
