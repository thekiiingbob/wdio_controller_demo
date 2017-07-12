import LoginController from "../../src/controllers/login.controller.js";

describe("Using controllers", () => {
  afterEach(() => {
    browser.refresh();
  });

  it("can be super fun!", () => {
    let loginController = new LoginController();
    loginController.login("12345");
    expect(loginController.isLoggedIn()).to.be.true;
  });

  it("and you can still drop down to the base page objects", () => {
    let loginController = new LoginController();
    loginController.loginPage.login("12345");
    // this will fail, because we havent waited for us to be logged in
    expect(loginController.isLoggedIn()).to.be.true;
  });
});
