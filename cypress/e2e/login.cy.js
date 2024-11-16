import {selector, users} from "../support/e2e";

describe('LOGIN', function() {

    beforeEach(function() {
        cy.visit("/login");

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it('page exists', function() {
        cy.get('[data-testid="auth-form-login"]').should('exist');

        cy.get(selector.inputEmail).should('exist');
        cy.get(selector.inputPassword).should('exist');

        cy.get(selector.buttonSubmitLogin).should('exist').should('be.disabled');
    });

    it('SUCCESS', function() {
        // type data
        cy.get(selector.inputEmail).type(users.success.email);
        cy.get(selector.inputPassword).type(users.success.password);
        cy.wait(500);

        // check button enabled
        cy.get(selector.buttonSubmitLogin).should('not.be.disabled');
        cy.wait(500);

        // submit
        cy.intercept('POST', '/api/auth/login', { fixture: 'login_success.json' });
        cy.get(selector.buttonSubmitLogin).click();

        // check profile page loaded
        cy.get(selector.headerAuth).should('not.contain', 'Личный кабинет');
        cy.get(selector.headerAuth).click();
        cy.get('[data-testid="auth-form-profile"]').should('exist');
        cy.contains('Профиль');

        cy.wait(500);
        cy.get('a').contains('Выход').click();
    });

    it('ERROR', function() {
        // type data
        cy.get(selector.inputEmail).type(users.error.email);
        cy.get(selector.inputPassword).type(users.error.password)
        cy.wait(500);

        // check button enabled
        cy.get(selector.buttonSubmitLogin).should('not.be.disabled');
        cy.wait(500);

        // submit
        cy.intercept('POST', '/api/auth/login', { fixture: 'login_error.json', statusCode: 401 });
        cy.get(selector.buttonSubmitLogin).click();
        cy.get(selector.pageLogin).should('exist');
    });

});
