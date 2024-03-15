import { BasePage } from "../pageObjects/basePage";

export class PaymentOptionsPage extends BasePage {
  static get url() {
    return "/#/payment/shop";
  }

  static get selectCard() {
    return cy.get(`label[for="mat-radio-46-input"]`);
  }

  static get continueButton() {
    return cy.get(`button[aria-label="Proceed to review"]`);
  }
}
