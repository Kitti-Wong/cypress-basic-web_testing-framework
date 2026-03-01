// Import required variables
import { VERIFY_WEBPAGE, TAGS } from "../support/data/Tags_Input_Box";

//Positive Cases
const Tags_Input_Box = (() => {
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
        Add_Tags_with_Enter_Key: () => {
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const RemainingCount = 8;
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;
            let AddedTargetCount = 0;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  cy.get("ul input").type(`${tag.toLowerCase()}{enter}`);
                  cy.step(`Added tag: ${tag.toLowerCase()}`);

                  AddedTargetCount++;
                  // verify the tag is added
                  if (AddedTargetCount < RemainingCount) {
                    cy.get("ul li").should("contain", tag.toLowerCase());
                  } else {
                    // verify the remaining count is limited at 0 and no more tags can be added
                    cy.get("p").eq(1).should("contain", `0 tags are remaining`);
                  }
                }
              });
            });
          });
        },
        Add_Tags_with_Comma: () => {
          let RemainingCount = 8;
          let AddedTargetCount = 0;
          let AddedTags = [];
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  const remainingCount = RemainingCount - AddedTargetCount;
                  if (remainingCount > 0) {
                    AddedTargetCount++;
                    cy.get("ul input").type(`${tag.toLowerCase()}`);
                    if (remainingCount > 1) {
                      cy.get("ul input").type(",");
                    }
                    cy.step(
                      `Added tag: ${tag.toLowerCase()}, Remaining count: ${remainingCount - 1}`,
                    );
                    AddedTags.push(tag.toLowerCase());
                  } else {
                    // enter key to put the tag into the list
                    cy.get("ul input").type("{enter}");
                    // verify the tag is added
                    AddedTags.forEach((addedTag) => {
                      cy.get("ul li").should("contain", addedTag);
                    });
                    // verify the remaining count is updated
                    cy.step(
                      `Remaining count is already: ${remainingCount} - No more tags can be added`,
                    );
                    cy.get("p")
                      .eq(1)
                      .should(
                        "contain",
                        `${remainingCount} tags are remaining`,
                      );
                  }
                }
              });
            });
          });
        },
        Remove_Tags_with_Button: () => {
          let AddedTargetCount = 0;
          let AddedTags = [];
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const RemainingCount = 8;
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  cy.get("ul input").type(`${tag.toLowerCase()}{enter}`);
                  cy.step(`Added tag: ${tag.toLowerCase()}`);

                  AddedTargetCount++;
                  AddedTags.push(tag.toLowerCase());
                  // verify the tag is added
                  if (AddedTargetCount < RemainingCount) {
                    cy.get("ul li").should("contain", tag.toLowerCase());
                  } else {
                    // verify the remaining count is limited at 0 and no more tags can be added
                    cy.get("p").eq(1).should("contain", `0 tags are remaining`);
                  }
                }
              });
            });
            // verify the remaining count is updated and tags are removed when click the "Remove All" button
            cy.get("button").contains("Remove All").click();
            cy.get("p").eq(1).should("contain", `10 tags are remaining`);
            cy.step(`Removed all tags, Remaining count should be updated to 10`)
          });
        },
        Remove_Tags_with_first_Tag: () => {
          let AddedTargetCount = 0;
          let AddedTags = [];
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const RemainingCount = 8;
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  cy.get("ul input").type(`${tag.toLowerCase()}{enter}`);
                  cy.step(`Added tag: ${tag.toLowerCase()}`);

                  AddedTargetCount++;
                  AddedTags.push(tag.toLowerCase());
                  // verify the tag is added
                  if (AddedTargetCount < RemainingCount) {
                    cy.get("ul li").should("contain", tag.toLowerCase());
                  } else {
                    // verify the remaining count is limited at 0 and no more tags can be added
                    cy.get("p").eq(1).should("contain", `0 tags are remaining`);
                  }
                }
              });
            });
            //verify remove the first tag and verify the remaining count is updated
            cy.get("i").eq(0).click();
            cy.get("p").eq(1).should("contain", `1 tags are remaining`);
            cy.step(`Removed the first tag, Remaining count should be updated to 1`)
          });
        },
        Add_Tags_MayExceeding_Limit_with_Enter_Key: () => {
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const RemainingCount = 9;
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;
            let AddedTargetCount = 0;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  cy.get("ul input").type(`${tag.toLowerCase()}{enter}`);
                  cy.step(`Added tag: ${tag.toLowerCase()}`);

                  AddedTargetCount++;
                  // verify the tag is added
                  if (AddedTargetCount <= RemainingCount - 1) {
                    cy.get("ul li").should("contain", tag.toLowerCase());
                  } else {
                    // verify the remaining count is limited at 0 and no more tags can be added
                    cy.get("p").eq(1).should("contain", `0 tags are remaining`);
                  }
                }
              });
            });
          });
        },
        Add_Tags_MayExceeding_Limit_with_Comma: () => {
          let RemainingCount = 9;
          let AddedTargetCount = 0;
          let AddedTags = [];
          // Visit webpage
          cy.visit(VERIFY_WEBPAGE);
          cy.url().should("include", "tags-input-box");

          cy.get("ul li").then(($existing) => {
            const initialCount = $existing.length;
            const targetCount = initialCount + RemainingCount;

            cy.step(
              `Starting with ${initialCount} tags. Target is ${targetCount}. (Remaining count: ${RemainingCount})`,
            );

            TAGS.forEach((tag) => {
              cy.get("ul").then(($ul) => {
                const currentCount = $ul.find("li").length;

                //check if tag already exists
                const tagExists =
                  $ul.find("li").filter((index, li) => {
                    return li.innerText
                      .toLowerCase()
                      .includes(tag.toLowerCase());
                  }).length > 0;

                // add if it hasn't reached target remaining count and tag doesn't duplicate
                if (currentCount < targetCount && !tagExists) {
                  const remainingCount = RemainingCount - AddedTargetCount;
                  if (remainingCount > 0) {
                    AddedTargetCount++;
                    cy.get("ul input").type(`${tag.toLowerCase()}`);
                    if (remainingCount > 1) {
                      cy.get("ul input").type(",");
                    }
                    cy.step(
                      `Added tag: ${tag.toLowerCase()}, Remaining count: ${remainingCount - 1}`,
                    );
                    AddedTags.push(tag.toLowerCase());
                  } else {
                    // enter key to put the tag into the list
                    cy.get("ul input").type("{enter}");
                    // verify the tag is added
                    AddedTags.forEach((addedTag) => {
                      cy.get("ul li").should("contain", addedTag);
                    });
                    // verify the remaining count is limited at 0 and no more tags can be added
                    cy.step(
                      `Remaining count is already: ${remainingCount} - No more tags can be added`,
                    );
                    cy.get("p").eq(1).should("contain", `0 tags are remaining`);
                  }
                }
              });
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
describe("Cypress - Verify Tags Input Box Flow", () => {
  const callFunction = Tags_Input_Box.init();

  it("Verify Adding Tags with Enter Key", function () {
    callFunction.Add_Tags_with_Enter_Key();
  });
  it("Verify Adding Tags with Comma", function () {
    callFunction.Add_Tags_with_Comma();
  });
  it("Verify Removing Tags with Remove All Button", function () {
    callFunction.Remove_Tags_with_Button();
  });
  it("Verify Removing Tags with first Tag", function () {
    callFunction.Remove_Tags_with_first_Tag();
  });
  it("Verify Adding Tags May Exceeding Limit with Enter Key", function () {
    callFunction.Add_Tags_MayExceeding_Limit_with_Enter_Key();
  });
  it("Verify Adding Tags May Exceeding Limit with Comma", function () {
    callFunction.Add_Tags_MayExceeding_Limit_with_Comma();
  });
});
