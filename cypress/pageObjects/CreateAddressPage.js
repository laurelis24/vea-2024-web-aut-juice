import { BasePage } from "../pageObjects/basePage";

export class CreateAddressPage extends BasePage {
  static get url() {
    return "/#/address/create";
  }

  static fillNewAddress(options) {
    let idx = 1;
    for (let i in options) {
      if (idx === 5) {
        cy.get(`textarea#address`).type(options[i]);
      } else {
        cy.get(`#mat-input-${idx}`).type(options[i]);
      }
      idx++;
    }
  }

  static get submitButton() {
    return cy.get("button#submitButton");
  }
}
