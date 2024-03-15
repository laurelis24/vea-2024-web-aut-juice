import { BasePage } from "../pageObjects/basePage";

export class SelectAddressPage extends BasePage {
  static get url() {
    return "/#/adress/select";
  }

  static get unitedFakeDomCheckbox() {
    return cy.get(`label[for="mat-radio-42-input"]`);
  }

  static get continueButton() {
    return cy.get(`button[aria-label="Proceed to payment selection"]`);
  }
}
