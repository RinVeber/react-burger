import {localHost, selector} from "../support/e2e"

describe('APP is available', function() {
    it('localhost', function() {
        cy.visit(localHost);

        cy.get(selector.pageConstructor).should('exist');
        cy.location('pathname').should('eq', "/");
    });
});
