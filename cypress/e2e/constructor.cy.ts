describe('Constructor Page tests', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Add ingredients to constructor', function () {
    // empty constructor
    cy.get('[data-no-ingredients]').should('exist');
    cy.get('[data-no-buns]').should('exist');

    // find bun item from ingredients
    cy.get('[data-testid="ingredient-bun"]').first().as('firstBun');

    // click AddButton
    cy.get('@firstBun').within(() => {
      cy.contains('Добавить').click();
    });

    // buns exist
    cy.get('[data-no-buns]').should('not.exist');

    // check buns text contents
    cy.get('@firstBun')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((name) => {
        cy.get('[data-testid="constructor"]')
          .find('.constructor-element__text')
          .first()
          .should('have.text', `${name.trim()} (верх)`);

        cy.get('[data-testid="constructor"]')
          .find('.constructor-element__text')
          .last()
          .should('have.text', `${name.trim()} (низ)`);
      });

    // find main item from ingredients
    cy.get('[data-testid="ingredient-main"]').first().as('firstMain');

    // click AddButton
    cy.get('@firstMain').within(() => {
      cy.contains('Добавить').click();
    });

    // main ingredient exists
    cy.get('[data-no-ingredients]').should('not.exist');

    // check main ingredient text content
    cy.get('@firstMain')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((name) => {
        cy.get(`[data-testid="constructor-element-${name.trim()}"]`).should(
          'exist'
        );
      });
  });
});
