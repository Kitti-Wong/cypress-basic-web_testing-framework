// Import required variables

import {
  DYNAMIC_TABLE_WEBPAGE,
  Heros_name,
} from "../support/data/Dynamic_Table";

//Positive Cases
const Dynamic_Table = (() => {
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
        SuperHero_Personal_Data: () => {
          // Visit webpage
          cy.visit(DYNAMIC_TABLE_WEBPAGE);
          cy.url().should("include", "dynamic-table");

          Object.values(Heros_name).forEach((hero) => {

            cy.step(`🕵️ Verifying Personal Information for ${hero.superhero_name}`);

            // We find the row containing the unique Superhero Name
            cy.contains("#tbody tr", hero.superhero_name).within(() => {

              // Verify Email (inside the same cell as the Name)
              cy.step(`Verifying Email for ${hero.superhero_name} => ${hero.email}`);
              cy.get("div").should("contain", hero.email);

              // Verify Status (second column)
              cy.step(`Verifying Status for ${hero.superhero_name} => ${hero.status}`);
              cy.get("td").eq(1).should("contain", hero.status);

              // Verify Real Name (third column)
              cy.step(`Verifying Real Name for ${hero.superhero_name} => ${hero.real_name}`);
              cy.get("td").eq(2).should("contain", hero.real_name);

            });
          });
        },
      };
    },
  };
})();

/////////////////////////////////////////////////////
// Cypress Test Cases                              //
/////////////////////////////////////////////////////
describe("Cypress - Dynamic Table", () => {
  const callFunction = Dynamic_Table.init();
  it("Verify Personal Information of Superheroes", function () {
    callFunction.SuperHero_Personal_Data();
  });
});
