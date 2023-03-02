/// <reference types="cypress" />

const email = "admin@example.com"
const password = "1234"

describe('empty spec', () => {
  beforeEach(() => {
    cy.login(email, password)
  })
  it("should logged in as admin", () => {
    cy.visit('http://localhost:3000/admin')
  })
  it("should manage events", () => {
    cy.visit('http://localhost:3000/admin/events')
  })
  it("should manage users", () => {
    cy.visit('http://localhost:3000/admin/users')
  })
})
