/* eslint-disable */
const faker = require('faker')
const { getLoginResponse } = require('../fixtures/auth')

describe('Login Page', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
    })

    it('should successfully login', () => {
        const response = getLoginResponse()
        cy.server()
           .route({
                url: 'login',
                method: 'POST',
                response
           })
           .visit('http://localhost:8080/login')
            .get('#email')
            .type(faker.internet.email())
            .get('#password')
            .type(faker.random.word())
            .get('#login')
            .click()
            .should(() => {
              const loggedInUser = JSON.parse(localStorage.getItem('user'))
            expect(localStorage.getItem('token')).to.eq(response.access_token)
            expect(loggedInUser.name).to.eq(response.user.name)
            expect(loggedInUser.email).to.eq(response.user.email)
            expect(loggedInUser.id).to.eq(response.user.id)
        })

    })

    it('should show alert when on unsuccessful login', () => {
        cy.server()
            .route({
                url: 'login',
                method: 'POST',
                status: 404
            })
            .visit('http://localhost:8080/login')
            .get('#email')
            .type(faker.internet.email())
            .get('#password')
            .type(faker.random.word())
            .get('#login')
            .click()
            .get('#alert-title')
            .should('have.contain.text', 'Login Failed')
            .get('#alert-message')
            .should('have.contain.text', 'username and password not found')

    })

    it('should contain a create account link', function () {
        cy.server()
            .visit('http://localhost:8080/login')
            .get('#create-account')
            .should('have.text', 'Create Account')

    })
})