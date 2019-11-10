const { defaultsDeep } = require('lodash')
const faker = require('faker')

const getLoginResponse = ({ overrides = {} } = {}) => {
    const user = Object.assign({}, overrides)
    return defaultsDeep(user, {
        "user": {
            "id": faker.random.number({min: 1, max: 100}),
            "name": faker.internet.userName(),
            "email": faker.internet.email(),
            "phone": faker.phone.phoneNumber()
        },
        access_token: 'access_token'
    })
}

module.exports = {
    getLoginResponse
}