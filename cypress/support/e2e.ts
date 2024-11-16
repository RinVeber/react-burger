// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const localHost = 'http://localhost:3000/';


export const users = {
  'success': {email: 'testmail@mail.ru', password: 'password123'},
  'error': {email: 'test111@test.com', password: '12345'},
}

export enum selector {
  modal = '[data-testid=modal]',
  modalOverlay = '[data-testid=modal-overlay]',
  modalHeader = '[data-testid=modal-header]',
  modalBody = '[data-testid=modal-body]',
  modalIngredient = `[data-testid='modal-ingredient-details']`,
  modalIngredientName = `[data-testid='modal-ingredient-details-name']`,
  modalOrder = `[data-testid='modal-order']`,
  modalFeed = `[data-testid='modal-feed-order']`,
  ingredientBun = '[data-testid=ingredient-bun]',
  ingredientSauce = '[data-testid=ingredient-sauce]',
  ingredientMain = '[data-testid=ingredient-main]',
  inputEmail = '[data-testid="auth-input-email"]',
  inputPassword = '[data-testid="auth-input-password"]',
  pageLogin = '[data-testid="page-login"]',
  pageConstructor = '[data-testid="page-constructor"]',
  pageProfile = '[data-testid="page-profile"]',
  pageFeed = '[data-testid="page-feed"]',
  buttonSubmit = '[data-testid="button-submit"]',
  buttonSubmitLogin = '[data-testid="button-submit-login"]',
  buttonSubmitRegister = '[data-testid="button-submit-register"]',
  buttonOrder = `[data-testid="button-order"]`,
  headerIndex = '[data-testid=header-index]',
  headerFeed = '[data-testid=header-feed]',
  headerAuth = '[data-testid="header-auth"]',
  listConstructor = '[data-testid=burger-constructor-list]',
}
