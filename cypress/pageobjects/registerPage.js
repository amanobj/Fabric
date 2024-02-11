class RegisterPage {
    elements = {
        firstNameInput: () => cy.get('[name="customer.firstName"]'),
        lastNameInput: () => cy.get('[name="customer.lastName"]'),
        streetInput: () => cy.get('[name="customer.address.street"]'),
        cityInput: () => cy.get('[name="customer.address.city"]'),
        stateInput: () => cy.get('[name="customer.address.state"]'),
        zipCodeInput: () => cy.get('[name="customer.address.zipCode"]'),
        phoneNumberInput: () => cy.get('[name="customer.phoneNumber"]'),
        ssnInput: () => cy.get('[name="customer.ssn"]'),
        usernameInput: () => cy.get('[name="customer.username"]'),
        passwordInput: () => cy.get('[name="customer.password"]'),
        confirmPasswordInput: () => cy.get('[name="repeatedPassword"]'),
        registerBtn: () => cy.get('input.button[value="Register"][type="submit"]'),
    }

    fillRegistrationForm(userData) {
        if (userData.firstName) {
            this.elements.firstNameInput().clear().type(userData.firstName);
        }
        if (userData.lastName) {
            this.elements.lastNameInput().clear().type(userData.lastName);
        }
        if (userData.address && userData.address.street) {
            this.elements.streetInput().clear().type(userData.address.street);
        }
        if (userData.address && userData.address.city) {
            this.elements.cityInput().clear().type(userData.address.city);
        }
        if (userData.address && userData.address.state) {
            this.elements.stateInput().clear().type(userData.address.state);
        }
        if (userData.address && userData.address.zipCode) {
            this.elements.zipCodeInput().clear().type(userData.address.zipCode);
        }
        if (userData.phoneNumber) {
            this.elements.phoneNumberInput().clear().type(userData.phoneNumber);
        }
        if (userData.ssn) {
            this.elements.ssnInput().clear().type(userData.ssn);
        }
        if (userData.username) {
            this.elements.usernameInput().clear().type(userData.username);
        }
        if (userData.password) {
            this.elements.passwordInput().clear().type(userData.password);
            this.elements.confirmPasswordInput().clear().type(userData.password);
        }
    }
    

    clickRegisterBtn() {
        this.elements.registerBtn().click();
    }

    
}

export default RegisterPage;
