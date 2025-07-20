describe("Favorites User Flow", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("/");
    // Wait for the initial content to load by checking for the grid, increasing timeout for slow APIs
    cy.get(".grid > div", { timeout: 20000 }).should(
      "have.length.greaterThan",
      1
    );
  });

  it("should allow a user to add an item to favorites and view it in the favorites section", () => {
    // Find the first card on the page and click its favorite button
    cy.get(".grid > div").first().find("button").click();

    // Get the title of the card that was just favorited
    cy.get(".grid > div")
      .first()
      .find("h3")
      .invoke("text")
      .then((cardTitle) => {
        // Navigate to the Favorites section by clicking the button in the sidebar
        cy.contains("button", "Favorites").click();

        // The favorited card's title should now be visible in the Favorites section
        cy.get(".grid > div").should("have.length", 1);
        cy.get(".grid > div").should("contain", cardTitle);
      });
  });

  it("should allow a user to remove an item from favorites", () => {
    // Add the first item to favorites
    cy.get(".grid > div").first().find("button").click();

    // Go to the favorites section
    cy.contains("button", "Favorites").click();

    // Verify the item is there
    cy.get(".grid > div").should("have.length", 1);

    // Click the favorite button again on the card inside the favorites section to remove it
    cy.get(".grid > div").first().find("button").click();

    // The "empty favorites" message should now be visible
    cy.contains("You have not favorited any content yet.").should("be.visible");
  });
});
