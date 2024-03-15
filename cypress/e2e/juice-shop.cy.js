import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { getRandomEmail } from "../helper_functions/random";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAfressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { SavedPaymentMethodsPagee } from "../pageObjects/SavedPaymentMethodsPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.click();
      LoginPage.emailField.type("demo");
      LoginPage.passwordField.type("demo");
      LoginPage.loginButton.click();
      HomePage.accountButton.click();
      HomePage.profileMenuOption.should("contain", "demo");
    });

    it("Registration", () => {
      const randomEmail = getRandomEmail();

      HomePage.accountButton.click();
      HomePage.loginButton.click();
      LoginPage.notYetCostumerLink.first("a.primary-link").click();
      LoginPage.newUserEmail.type(randomEmail);
      LoginPage.newUserPassword.type("password");
      LoginPage.newUserPasswordRepat.type("password");
      LoginPage.securityQuestions.click();
      LoginPage.nameOfYourFavoritePetOption.click();
      LoginPage.securityAnswer.type("Fredis");
      LoginPage.registerButton.click();
      LoginPage.emailField.type(randomEmail);
      LoginPage.passwordField.type("password");
      LoginPage.loginButton.click();
      HomePage.accountButton.click();
      HomePage.profileMenuOption.should("contain", randomEmail);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      HomePage.searchButton.click();
      HomePage.searchField.type("Lemon{Enter}");
      HomePage.infoAboutFruit.click();
      HomePage.moreInfoFruitContainer.should("contain", "Sour but full of vitamins.");
    });

    it("Search for 500ml and validate lemon, while having multiple cards", () => {
      HomePage.searchButton.click();
      HomePage.searchField.type("500ml{Enter}");
      HomePage.selectProductCard.get("div.item-name").contains("Lemon Juice (500ml)").parent().click();
      HomePage.moreInfoFruitContainer.should("contain", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate cards", () => {
      HomePage.searchButton.click();
      HomePage.searchField.type("500ml{Enter}");

      HomePage.selectProductCard.get("div.item-name").contains("Eggfruit Juice (500ml)").parent().click();
      HomePage.moreInfoFruitContainer.should("contain", "Now with even more exotic flavour.");
      HomePage.closeSelectedProduct.click();

      HomePage.selectProductCard.get("div.item-name").contains("Lemon Juice (500ml)").parent().click();
      HomePage.moreInfoFruitContainer.should("contain", "Sour but full of vitamins.");
      HomePage.closeSelectedProduct.click();

      HomePage.selectProductCard.get("div.item-name").contains("Strawberry Juice (500ml)").parent().click();
      HomePage.moreInfoFruitContainer.should("contain", "Sweet & tasty!");
      //// Pieliku klāt ka vēl aizver trešo
      HomePage.closeSelectedProduct.click();
    });

    it("Read a review", () => {
      HomePage.searchButton.click();
      HomePage.searchField.type("King{Enter}");
      HomePage.selectProductCard
        .get("div.item-name")
        .contains(`OWASP Juice Shop "King of the Hill" Facemask`)
        .parent()
        .click();
      /// vajadzigs wait savadak pārāk ātri notiek klikšķis uz expand reviews un expand neatveras
      cy.wait(300).then(() => HomePage.expandReviewsOption.click());
      HomePage.selectReview.should("contain", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf");
    });

    it("Add a review", () => {
      const text = "Tastes like metal";

      HomePage.searchButton.click();
      HomePage.searchField.type("Raspberry{Enter}");
      HomePage.selectProductCard.get("div.item-name").contains(`Raspberry Juice (1000ml)`).parent().click();
      HomePage.addReviewInputField.click();
      HomePage.addReviewInputField.type(text);
      HomePage.submitReviewButton.click();
      cy.wait(300).then(() => HomePage.expandReviewsOption.click());
      HomePage.selectReview.should("contain", text);
    });

    it("Validate product card amount", () => {
      HomePage.itemsPerPageSection.click().get("mat-option#mat-option-1").click();
      HomePage.selectProductCard.should("have.length", 24);
      HomePage.itemsPerPageSection.click().get("mat-option#mat-option-2").click();
      HomePage.selectProductCard.should("have.length", 35);
    });

    it("Buy Girlie T-shirt", () => {
      HomePage.searchButton.click();
      HomePage.searchField.type("Girlie{Enter}");
      HomePage.selectProductCard
        .get("div.item-name")
        .contains(`OWASP Juice Shop CTF Girlie-Shirt`)
        .parentsUntil("mat-card.mat-card.mat-focus-indicator.mat-elevation-z6.ribbon-card")
        .get(`button[aria-label="Add to Basket"]`)
        .click();
      HomePage.myBasketButton.click();
      BasketPage.checkOutButton.click();
      SelectAddressPage.unitedFakeDomCheckbox.click();
      SelectAddressPage.continueButton.click();
      DeliveryMethodPage.deliverySpeed.click();
      DeliveryMethodPage.continueButton.click();
      PaymentOptionsPage.selectCard.click();
      PaymentOptionsPage.continueButton.click();
      OrderSummaryPage.buyButton.click();
      OrderCompletionPage.confirmationText.should("contain.text", "Thank you for your purchase!");
    });

    it("Add adress", () => {
      HomePage.accountButton.click();
      HomePage.ordersAndPaymentsButton.click();
      HomePage.savedAdressesButton.click();

      SavedAddressesPage.addNewAdressButton.click();
      let myAdress = {
        country: "Latvija",
        name: "Lauris Kairo",
        phone: "20133855",
        zip: 3451,
        address: "Jūras iela 25",
        city: "Liepāja",
        state: "Kurzeme",
      };
      CreateAddressPage.fillNewAddress(myAdress);
      CreateAddressPage.submitButton.click();
      SavedAddressesPage.addedAddressesTable.should("contain", myAdress.address);
    });

    it("Add payment option", () => {
      const myCard = {
        name: "Lauris Kairo",
        cardNumber: "1625 3469 0714 3938",
        monthExp: 7,
        yearExp: 2090,
      };
      HomePage.accountButton.click();
      HomePage.ordersAndPaymentsButton.click();
      HomePage.paymentOptionsButton.click();
      SavedPaymentMethodsPagee.addNewCardExpansion.click();
      SavedPaymentMethodsPagee.fillnewCardOptions(myCard);
      SavedPaymentMethodsPagee.submitCard.click();
      SavedPaymentMethodsPagee.checkForValidation(myCard.cardNumber);
    });
  });
});
