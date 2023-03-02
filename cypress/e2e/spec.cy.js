/// <reference types="cypress" />

const email = "admin@example.com"
const password = "1234"

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.loginAsAdmin(email, password)
  })
  // it("should login as admin", () => {
  //   cy.get('#test').click()
  // })
  it("should login as admin", () => {
    cy.visit('http://localhost:3000/admin')
  })
  it(should)
})