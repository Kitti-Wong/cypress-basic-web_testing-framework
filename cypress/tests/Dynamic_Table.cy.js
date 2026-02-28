// Import required variables

import {
  DYNAMIC_TABLE_WEBPAGE,
  Heros,
  Villains,
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
        //In this test case, I assume that the data is already populated in the table, only in Heros not in Villains, 
        //so I will verify the data of Heros first, then I will verify the data of Villains.
        //with Data-Driven Testing
        SuperHero_Personal_Data: () => {
          // Visit webpage
          cy.visit(DYNAMIC_TABLE_WEBPAGE);
          cy.url().should("include", "dynamic-table");

          Object.values(Heros).forEach((hero) => {

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

        Villian_Personal_Data: () => {
          // Visit webpage
          cy.visit(DYNAMIC_TABLE_WEBPAGE);
          cy.url().should("include", "dynamic-table");

          Object.values(Villains).forEach((villain) => {

            cy.step(`🕵️ Verifying Personal Information for ${villain.villain_name}`);
            // We find the row containing the unique Villain Name
            cy.contains("#tbody tr", villain.villain_name).within(() => {
              // Verify Real Name (second column)
              cy.step(`Verifying Real Name for ${villain.villain_name} => ${villain.real_name}`);
              cy.get("td").eq(1).should("contain", villain.real_name);
              // Verify Email (third column)
              cy.step(`Verifying Email for ${villain.villain_name} => ${villain.email}`);
              cy.get("td").eq(2).should("contain", villain.email);
              // Verify Status (fourth column)
              cy.step(`Verifying Status for ${villain.villain_name} => ${villain.status}`);
              cy.get("td").eq(3).should("contain", villain.status);
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
  it("Verify Personal Information of Villains", function () {
    callFunction.Villian_Personal_Data();
  });


});
