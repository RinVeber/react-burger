import {selector} from "../support/e2e";

describe('HEADER', function() {
    beforeEach(function() {
        cy.visit("/");
        cy.wait(1000);
    });

    it('navigation', function() {
        cy.get(selector.headerIndex).should('have.class', 'active');
        cy.get(selector.headerFeed).should('exist');
        cy.get(selector.headerAuth).should('exist');
        cy.get(selector.pageConstructor).should('exist');
        cy.wait(1000);

        // click feed
        cy.get(selector.headerFeed).click();
        cy.get(selector.headerFeed).should('have.class', 'active');
        cy.get(selector.pageFeed).should('exist');
        cy.location('pathname').should('eq', "/feed");
        cy.wait(1000);

        // click auth
        cy.get(selector.headerAuth).click();
        cy.get(selector.pageLogin).should('exist');
        cy.location('pathname').should('eq', "/login");
    });
});
