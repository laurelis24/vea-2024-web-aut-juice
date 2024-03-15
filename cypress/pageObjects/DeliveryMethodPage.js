import { BasePage } from "../pageObjects/basePage";

export class DeliveryMethodPage extends BasePage {
  static get url() {
    return "/#/delivery-method";
  }

  static get deliverySpeed() {
    return cy.get("mat-radio-button#mat-radio-45");
  }

  static get continueButton() {
    return cy.get(`button[aria-label="Proceed to delivery method selection"]`);
  }
}
