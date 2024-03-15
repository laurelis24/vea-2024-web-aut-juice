import { BasePage } from "../pageObjects/basePage";

export class SavedAddressesPage extends BasePage {
  static get url() {
    return "/#/address/saved";
  }

  static get addNewAdressButton() {
    return cy.get(`button[aria-label="Add a new address"]`);
  }

  static get addedAddressesTable() {
    return cy.get(`mat-table.mat-table.cdk-table.ng-star-inserted`);
  }
}
