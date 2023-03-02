/// <reference types="cypress" />

const email = "admin@example.com"
const password = "1234"

describe('empty spec', () => {
  beforeEach(() => {
    cy.loginAsAdmin(email, password)
  })
  // it("should logged in as admin", () => {
  //   cy.visit('http://localhost:3000/admin')
  // })
  // it("should manage events", () => {
  //   cy.visit('http://localhost:3000/admin/events')
  // })
  // it("should manage users", () => {
  //   cy.visit('http://localhost:3000/admin/users')
  // })
  it("should enroll users to events", () => {
    cy.visit('http://localhost:3000/admin/users')
    cy.wait(1000)
    // cy.contains("James Bond").click()
    // cy.wait(1000)
  })
})
