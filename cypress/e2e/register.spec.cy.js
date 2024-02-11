import RegisterPage from '../pageobjects/registerPage';
import LoginPage from '../pageobjects/loginPage';

describe('Registration Test', () => {
    let loginPage;
    let registerPage;
    let userData;

    beforeEach(() => {
        // Load user data from fixture
        cy.fixture('paraBank.json').then((data) => {
            userData = data;
        });

        // executes prior each test within it block
        cy.visit(Cypress.config().baseUrl);
        loginPage = new LoginPage();
        registerPage = new RegisterPage();
        loginPage.clickRegisterLink();
    });

    it('Verify Successful Registration', () => {
        // Perform registration
        registerPage.fillRegistrationForm(userData.successfulRegistration);
        
        registerPage.clickRegisterBtn();

        cy.wait(10000);
        
        // Assert that sign-up is successful
        cy.url().should('include', '/register.htm'); 
        //cy.contains('Welcome Amanpreet').should('be.visible');

    });

    it('Verify Unsuccessful Registration', () => {
        // Perform unsuccessful registration
        registerPage.fillRegistrationForm(userData.failedRegistration);
        registerPage.clickRegisterBtn();
        
        // Add assertions for unsuccessful registration
        cy.url().should('include', '/register.htm');
    });
});
