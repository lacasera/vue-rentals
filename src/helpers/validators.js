const phoneRex = require('phone-regex')

export const phoneNumber = value => phoneRex({ exact: true }).test(value)
