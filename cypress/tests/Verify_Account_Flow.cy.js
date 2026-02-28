// Import required variables
import {
  VERIFY_ACCOUNT_WEBPAGE,
  VALID_VERIFY_CODE,
  INVALID_VERIFY_CODE,
} from "../support/data/Verify_Account_Flow";

//Positive Cases
const Verify_Account_Flow = (() => {
  const clearStorage = () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  };

  return {
    init: () => {
      before(() => {
        clearStorage();
      });

      beforeEach(() => {
        cy.window().then((win) => {
          win.moveTo(0, 0);
          win.resizeTo(screen.width, screen.height);
        });
      });

      afterEach(() => {
        clearStorage();
      });

      after(() => {
        clearStorage();
      });

      /////////////////////////////////////////////////////
      // Test Cases Workflow                             //
      /////////////////////////////////////////////////////
      return {
        Input_valid_verifycode: () => {
          // Visit webpage
          cy.visit(VERIFY_ACCOUNT_WEBPAGE);
          cy.url().should("include", "verify-account");

          // Input valid verify code

          const code = VALID_VERIFY_CODE.split("");

          cy.step(`🕵️ Inputting Valid Verify Code: ${code}`);

          cy.get(".code").each(($input, index) => {
            cy.step(`Input Valid Verify Code: ${code[index]}`);
            cy.wrap($input).wait(200).type(code[index]);
          });

          cy.xpath(
            "//small[contains(@class,'info') and contains(@class,'success') and text()='Success']",
          ).should("be.visible");
        },
        Input_invalid_verifycode: () => {
          // Visit webpage
          cy.visit(VERIFY_ACCOUNT_WEBPAGE);
          cy.url().should("include", "verify-account");

          // Input invalid verify code

          const code = INVALID_VERIFY_CODE.split("");

          cy.step(`🕵️ Inputting Invalid Verify Code: ${code}`);

          cy.get(".code").each(($input, index) => {
            cy.step(`Input Invalid Verify Code: ${code[index]}`);
            cy.wrap($input).wait(200).type(code[index]);
          });

          cy.xpath(
            "//small[contains(@class,'info') and contains(@class,'success') and text()='Success']",
          ).should("not.be.exist");
        },
      };
    },
  };
})();

/////////////////////////////////////////////////////
// Cypress Test Cases                              //
/////////////////////////////////////////////////////
describe("Cypress - Verify Account Flow", () => {
  const callFunction = Verify_Account_Flow.init();

  it("Verify Account with Valid Verify Code", function () {
    callFunction.Input_valid_verifycode();
  });
  it("Verify Account with Invalid Verify Code", function () {
    callFunction.Input_invalid_verifycode();
  });

});
