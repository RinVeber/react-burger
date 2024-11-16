import {selector} from '../support/e2e';
import bun from '../fixtures/bun.json';

describe('MODAL', function () {
  beforeEach(function () {
    cy.visit("/");
    cy.wait(1000);
  });

  it('ingredients loaded', function () {
    cy.contains('Соберите бургер');
    cy.get('[data-testgroup=ingredient]').should('have.length.at.least', 10);
  });

  it('open', function () {
    cy.get(selector.ingredientBun).first().click();

    cy.get(selector.modalOverlay).should('exist');
    cy.get(selector.modal).should('exist');

    cy.get(selector.modalHeader).contains('Детали ингредиента');
    cy.get(selector.modalIngredient).should('not.be.empty');

    cy.wait(1000);
  });

  it('open bun details', function () {
    cy.get(selector.ingredientBun).first().click();

    cy.get(selector.modalOverlay).should('exist');
    cy.get(selector.modal).should('exist');

    // check bun details
    cy.location('pathname').should(
      'eq',
      "/ingredients/:id".replace(':id', bun._id),
    );
    cy.get(selector.modalIngredient)
      .find('img')
      .should('have.attr', 'src', bun.image);
      cy.wait(1000);
    cy.get(selector.modalIngredientName).contains(bun.name);

    Object.entries({
        calories: 'Калории, ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г',
      }).forEach(([key, name]) => {
      cy.get(selector.modalBody).contains(name).next('div').contains(bun[key]);
    });

    cy.wait(1000);
  });

  it('close', function () {
    cy.get(selector.ingredientBun).first().click();

    cy.get(selector.modalOverlay).should('exist');
    cy.get(selector.modal).should('exist');

    cy.get(selector.modalHeader).contains('Детали ингредиента');
    cy.get(selector.modalIngredient).should('not.be.empty');
    cy.wait(2000);

    // closing
    cy.get(selector.modalHeader).find('svg').click();
    cy.get(selector.modalOverlay).should('not.exist');
    cy.get(selector.modal).should('not.exist');

    cy.location('pathname').should('eq', "/");
  });
});
