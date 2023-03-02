describe('empty spec', () => {
  const email = "user@example.com"
  const password = "1234"
  beforeEach(() => {
    cy.login(email, password)
  })
  it('enroll in event', () => {
    cy.visit("http://localhost:3000/events")
    cy.get("#learnMoreButton").first().click()
    cy.wait(1000)
    cy.get("#participateButton").first().click()
  })
})