import { BasePage } from "../pageObjects/basePage";

export class LoginPage extends BasePage {
  static get url() {
    return "/#/login";
  }

  static get elementName() {
    return cy.get("elementSelector");
  }

  static get emailField() {
    return cy.get("#email");
  }

  static get passwordField() {
    return cy.get("#password");
  }

  static get loginButton() {
    return cy.get("button#loginButton");
  }

  static get notYetCostumerLink() {
    return cy.get("#newCustomerLink");
  }

  static get newUserEmail() {
    return cy.get("input#emailControl");
  }
  static get newUserPassword() {
    return cy.get("input#passwordControl");
  }
  static get newUserPasswordRepat() {
    return cy.get("input#repeatPasswordControl");
  }

  static get securityQuestions() {
    return cy.get("span.mat-select-placeholder");
  }

  static get nameOfYourFavoritePetOption() {
    return cy.get("mat-option#mat-option-9");
  }

  static get securityAnswer() {
    return cy.get("input#securityAnswerControl");
  }

  static get registerButton() {
    return cy.get("button#registerButton");
  }
}
