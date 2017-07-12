import HomePage from "../page_objects/home.page.js";
import LoginPage from "../page_objects/login.page.js";

class LoginController {
  constructor() {
    this.loginPage = new LoginPage();
    this.homePage = new HomePage();
  }

  login(extension) {
    this.loginPage.visit();
    this.loginPage.login(extension);
    this.waitUntilLoggedIn();
  }

  waitUntilLoggedIn() {
    this.homePage.myInfoDiv.waitForVisible();
  }

  isLoggedIn() {
    // we are just checking one element here,
    // but we could check for a slew of things
    return this.homePage.myInfoDiv.isVisible();
  }
}

export default LoginController;
