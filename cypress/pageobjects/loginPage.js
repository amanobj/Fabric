class LoginPage {
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginBtn: () => cy.get('input[type="submit"].button[value="Log In"]'),
        registerLink: () => cy.contains('Register'),
        successTxt: () => cy.get('h3'),
         errorTxt: () => cy.get('#rightPanel .error')
    }

    enterUsername(username) {
        this.elements.usernameInput().clear().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    clickSubmit() {
        this.elements.loginBtn().click();
    }

    clickRegisterLink(){
        this.elements.registerLink().click();
    }

}

export default LoginPage;
