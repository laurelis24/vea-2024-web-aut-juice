import { BasePage } from "../pageObjects/basePage";

export class SavedPaymentMethodsPagee extends BasePage {
  static get url() {
    return "/#/saved-payment-methods";
  }

  static get addNewCardExpansion() {
    return cy.get("#mat-expansion-panel-header-0");
  }

  static get submitCard() {
    return cy.get("button#submitButton");
  }

  static get insertedCardContainers() {
    return cy.get("mat-row.mat-row.cdk-row.ng-star-inserted");
  }

  static fillnewCardOptions({ name, cardNumber, monthExp, yearExp }) {
    cy.get("input#mat-input-1").type(name);
    cy.get("input#mat-input-2").type(cardNumber);
    cy.get("select#mat-input-3").select(monthExp + "");
    cy.get("select#mat-input-4").select(yearExp + "");
  }

  static checkForValidation(cardNumber) {
    let arr = cardNumber.split(" ");
    let last = arr[arr.length - 1];
    let stars = "*".repeat((arr.length - 1) * 4);
    cy.get("mat-row.mat-row.cdk-row.ng-star-inserted").should("contain", stars + last);
  }
}
