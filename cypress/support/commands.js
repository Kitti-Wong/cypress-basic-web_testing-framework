// Custom command to clear browser storage
Cypress.Commands.add('clearStorage', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Custom command to login
Cypress.Commands.add("step", (message) => {
  cy.addTestContext(`[STEP]: ${message}`);
});

Cypress.Commands.add("assertStep", (stepName, fn, actual = null) => {
  try {
    fn();

    cy.step(`✅ ${stepName} \n| Actual: ${JSON.stringify(actual)}`);
    console.log(`✅ ${stepName} \n| Actual: ${JSON.stringify(actual)}`);

  } catch (error) {

    const actualText =
      actual !== undefined ? `\n| Actual: ${JSON.stringify(actual)}` : "";

    cy.step(`❌ ${stepName}${actualText}`);
    console.error(`❌ ${stepName}`, actual);

    throw error; // important: keep test failing
  }
});

Cypress.Commands.add("cooldown", (ms = 500) => {
  cy.wait(ms);
});

