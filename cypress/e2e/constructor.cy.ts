import * as mockOrder from '../fixtures/order.json';

describe('Constructor Page tests', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
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

  it('Open ingredient modal, close by button', function () {
    // find bun item
    cy.get('[data-testid="ingredient-bun"]').first().as('firstBun');

    cy.get('@firstBun')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((name) => {
        // click on chosen bun
        cy.get('@firstBun').click();

        // check modal has been opened
        cy.get('[data-testid="modal"]').should('exist');

        // compare titles (ingredient card & modal card)
        cy.get('[data-testid="ingredient-title"]').should(
          'have.text',
          name.trim()
        );

        // click on close button (there's only one button in modal)
        cy.get('button').click();

        // check modal has been closed
        cy.get('[data-testid="modal"]').should('not.exist');
      });
  });

  it('Open ingredient modal, close by overlay', function () {
    // find bun item
    cy.get('[data-testid="ingredient-bun"]').first().as('firstBun');

    cy.get('@firstBun')
      .find('p.text_type_main-default')
      .invoke('text')
      .then((name) => {
        // click on chosen bun
        cy.get('@firstBun').click();

        // check modal has been opened
        cy.get('[data-testid="modal"]').should('exist');

        // compare titles (ingredient card & modal card)
        cy.get('[data-testid="ingredient-title"]').should(
          'have.text',
          name.trim()
        );

        // click on close button (there's only one button in modal)
        cy.get('[data-testid="overlay"]').click({ force: true });

        // check modal has been closed
        cy.get('[data-testid="modal"]').should('not.exist');
      });
  });

  it('Create order', function () {
    // find bun item from ingredients
    cy.get('[data-testid="ingredient-bun"]').first().as('firstBun');

    // click AddButton
    cy.get('@firstBun').within(() => {
      cy.contains('Добавить').click();
    });

    // find main item from ingredients
    cy.get('[data-testid="ingredient-main"]').first().as('firstMain');

    // click AddButton
    cy.get('@firstMain').within(() => {
      cy.contains('Добавить').click();
    });

    // click on order button
    cy.get('[data-testid="order-button"]').click();

    // check modal has been opened
    cy.get('[data-testid="modal"]').should('exist');

    // check order number equals to mock order number
    cy.get('[data-testid="order-modal-number"]').should(
      'have.text',
      mockOrder.order.number
    );

    // click on close button (there's only one button in modal)
    cy.get('[data-testid="overlay"]').click({ force: true });

    // check modal has been closed
    cy.get('[data-testid="modal"]').should('not.exist');

    // empty constructor
    cy.get('[data-no-ingredients]').should('exist');
    cy.get('[data-no-buns]').should('exist');
  });
});
