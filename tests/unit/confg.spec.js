import config from '../../src/config'
let envsCopy

describe('Config', () => {
  beforeAll(() => {
    envsCopy = process.env
    process.env = {
      VUE_APP_CLIENT_ID: 'access_token'
    }
  })

  afterAll(() => {
    process.env = envsCopy
  })

  it('should throw an error when an env key is not found', () => {
    try {
      config('NON_EXISTING_KEY')
    } catch (error) {
      expect(error.message).toBe('No env key defined for NON_EXISTING_KEY')
    }
  })

  it('should return an env key if it exists', () => {
    const key = config('CLIENT_ID')
    expect(key).toBe('access_token')
  })
})
