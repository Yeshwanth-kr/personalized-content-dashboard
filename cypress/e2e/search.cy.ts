describe("Dashboard Search Flow", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("/");
    // Wait for the initial content to load by checking for the grid container's children
    cy.get(".grid > div", { timeout: 20000 }).should(
      "have.length.greaterThan",
      1
    );
  });

  it("should filter content correctly when a user types a search query", () => {
    // Assuming the API returns at least one item with "Matrix" in the title
    // Let's first get the initial count of items
    cy.get(".grid > div")
      .its("length")
      .then((initialCount) => {
        // Type into the search bar
        cy.get('input[placeholder="Search for content..."]').type("Space");

        // The number of items should be less than the initial count
        cy.get(".grid > div").should("have.length.lessThan", initialCount);
        // And the remaining item should contain the word "Matrix"
        cy.get(".grid > div").should("contain", "Space");
      });
  });

  it('should display a "no content" message for a search with no results', () => {
    // Type a string that is unlikely to match any content
    cy.get('input[placeholder="Search for content..."]').type("asdfghjkl12345");

    // Assert that the grid is now empty
    cy.get(".grid > div").should("not.exist");
    // Assert that the message for no results is visible
    cy.contains("No content matches your search.").should("be.visible");
  });
});
