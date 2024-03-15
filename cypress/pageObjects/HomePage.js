import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static get accountButton() {
    return cy.get("button#navbarAccount");
  }
  static get loginButton() {
    return cy.get("button#navbarLoginButton");
  }

  static get profileMenuOption() {
    return cy.get(`button[aria-label="Go to user profile"]`);
  }

  static get searchButton() {
    return cy.get(".mat-search_icon-search");
  }

  static get searchField() {
    return cy.get(".mat-form-field.mat-search_field");
  }

  static get infoAboutFruit() {
    return cy.get(`[aria-label="Click for more information about the product"]`);
  }

  static get moreInfoFruitContainer() {
    return cy.get(`div.container.mat-typography > div > div > div`);
  }

  static get selectProductCard() {
    return cy.get(`div[aria-label="Click for more information about the product"]`);
  }

  static get closeSelectedProduct() {
    return cy.get(`button[aria-label="Close Dialog"]`);
  }

  static get expandReviewsOption() {
    return cy.get(`[aria-label="Expand for Reviews"]`);
  }

  static get selectReview() {
    return cy.get(`div.mat-tooltip-trigger.review-text > p`);
  }

  static get addReviewInputField() {
    return cy.get(`textarea[aria-label="Text field to review a product"]`);
  }

  static get submitReviewButton() {
    return cy.get("button#submitButton");
  }

  static get itemsPerPageSection() {
    return cy.get("mat-form-field #mat-select-value-1");
  }

  static get addToBasketButton() {
    return cy.get(`button[aria-label="Add to Basket"]`);
  }

  static get myBasketButton() {
    return cy.get(`button[aria-label="Show the shopping cart"]`);
  }

  static get ordersAndPaymentsButton() {
    return cy.get(`button[aria-label="Show Orders and Payment Menu"]`);
  }

  static get savedAdressesButton() {
    return cy.get(`button[aria-label="Go to saved address page"]`);
  }

  static get paymentOptionsButton() {
    return cy.get(`button[aria-label="Go to saved payment methods page"]`);
  }
}
