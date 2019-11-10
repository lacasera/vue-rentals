import { shallowMount, mount } from '@vue/test-utils'
import Alert from '@/components/notifications/Alert'

const spy = jest.spyOn(console, 'error')

describe('Alert', () => {
  afterEach(() => spy.mockReset())

  it('should render properly', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'error',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with the text passed', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'error',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.find('div').text()).toEqual('Hello   Word')
  })

  it('should throw error if "type" prop is not passed', () => {
    mount(Alert, {
      propsData: {
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "type"'))
  })

  it('should throw error if "title" prop is not passed', () => {
    mount(Alert, {
      propsData: {
        type: 'error',
        message: 'Word'
      }
    })

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "title"'))
  })

  it('should throw error if "message" prop is not passed', () => {
    mount(Alert, {
      propsData: {
        type: 'error',
        title: 'Word'
      }
    })

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "message"'))
  })

  it('should have the right success class', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'error',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.classes()).toEqual([
      'border-t-4',
      'rounded-b',
      'px-4',
      'py-3',
      'shadow-md',
      'bg-red-100',
      'border-red-500',
      'text-red-900'
    ])
  })

  it('shoudl have the right error class', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'success',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.classes()).toEqual([
      'border-t-4',
      'rounded-b',
      'px-4',
      'py-3',
      'shadow-md',
      'bg-teal-100',
      'border-teal-500',
      'text-teal-900'
    ])
  })

  it('shoudl have the right info class', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'info',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.classes()).toEqual([
      'border-t-4',
      'rounded-b',
      'px-4',
      'py-3',
      'shadow-md',
      'bg-blue-100',
      'border-blue-500',
      'text-blue-900'
    ])
  })

  it('shoudl have the right warning class', () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        type: 'warning',
        title: 'Hello',
        message: 'Word'
      }
    })

    expect(wrapper.classes()).toEqual([
      'border-t-4',
      'rounded-b',
      'px-4',
      'py-3',
      'shadow-md',
      'bg-orange-100',
      'border-orange-500',
      'text-orange-900'
    ])
  })
})
