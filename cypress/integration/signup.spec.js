/* eslint-disable */
const faker = require('faker')
const { getLoginResponse } = require('../fixtures/auth')

describe('Signup Page', ()  => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it('should successfully register', () => {
        const response = getLoginResponse()
        cy.server()
            .route({
                url: 'register',
                method: 'POST',
                response
            })
            .visit('http://localhost:8080/signup')
            .get('#name')
            .type(faker.internet.userName())
            .get('#email')
            .type(faker.internet.email())
            .get('#phone')
            .type(faker.phone.phoneNumber())
            .get('#password')
            .type(faker.random.word())
            .get('#signup')
            .click()
            .should(() => {
                const loggedInUser = JSON.parse(localStorage.getItem('user'))
                expect(localStorage.getItem('token')).to.eq(response.access_token)
                expect(loggedInUser.name).to.eq(response.user.name)
                expect(loggedInUser.email).to.eq(response.user.email)
                expect(loggedInUser.id).to.eq(response.user.id)
            })
    })

})