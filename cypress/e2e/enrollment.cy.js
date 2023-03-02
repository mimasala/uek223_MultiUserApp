describe('empty spec', () => {
  const userEmail = "user@example.com"
  const userPassword = "1234"
  const adminEmail = "admin@example.com"
  const adminPassword = "1234"
  it('user can enroll in event', () => {
    cy.login(userEmail, userPassword)
    cy.visit("http://localhost:3000/events")
    cy.get("#learnMoreButton").first().click()
    cy.wait(1000)
    cy.get("#participateButton").first().click()
    cy.wait(5000)
  })
  it("admin cant enroll in event", () => {
    cy.login(adminEmail, adminPassword)
    cy.visit("http://localhost:3000/events")
    cy.get("#learnMoreButton").first().click()
    cy.wait(1000)
    cy.get("#participateButton").should('not.exist')
  })
})