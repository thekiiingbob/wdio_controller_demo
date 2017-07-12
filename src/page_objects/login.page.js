class LoginPage {
  // elements
  get extensionField() {
    return browser.element("input#ext_field");
  }
  get loginButton() {
    return browser.element("button#login_button");
  }

  // page methods
  visit() {
    browser.url("file:///" + __dirname + "../../../test/test_pages/myApp.html");
  }

  login(extension) {
    this.extensionField.waitForVisible();
    this.extensionField.setValue(extension);
    this.loginButton.waitForEnabled();
    this.loginButton.click();
  }
}

export default LoginPage;
