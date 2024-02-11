import LoginPage from '../pageobjects/loginPage';

describe('Create Savings Account Test', () => {
    let loginPage;
    let userData;

    beforeEach(() => {
        // Load user data from fixture
        cy.fixture('paraBank.json').then((data) => {
            userData = data;
        });

        // Executes prior each test within it block
        cy.visit(Cypress.config().baseUrl);
        loginPage = new LoginPage();
    });

    it('Verify Successful Account Creation', () => {
        // Login with valid credentials
        loginPage.enterUsername(userData.loginSuccess.username);
        loginPage.enterPassword(userData.loginSuccess.password);
        loginPage.clickSubmit();

        // Navigate to Open New Account page
        cy.contains('Open New Account').click();

        // Fill out the form to create a savings account
        cy.get('#type').select('SAVINGS');
        
        cy.wait(2000)
        cy.get('input[value="Open New Account"][type="submit"]').click();
        // Capture the account number
        cy.get('#newAccountId').invoke('text').then((accountNumber) => {
            const accountNum = accountNumber.trim();
            cy.log(`New Savings Account Created. Account Number: ${accountNum}`);
            // You can perform further assertions or actions with the account number here
        });
    });
});
