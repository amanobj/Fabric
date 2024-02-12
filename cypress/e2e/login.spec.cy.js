import LoginPage from '../pageobjects/loginPage';

describe('Verify Login', () => {
    let loginPage;

    beforeEach(() => {
        // Executes prior each test within it block
        cy.visit(Cypress.config().baseUrl);
        loginPage = new LoginPage();
    });

    it('Verify Login Success', () => {
        // Load user data synchronously from fixture
        cy.fixture('paraBank.json').then((userData) => {
            // Login with valid credentials
            loginPage.enterUsername(userData.loginSuccess.username);
            loginPage.enterPassword(userData.loginSuccess.password);
            loginPage.clickSubmit();

            // Assert that login is successful
            cy.url().should('include', '/overview.htm'); // Assuming successful login redirects to '/home'
            // Add more assertions if needed
        });
    });

    it('Verify Login Failure', () => {
        // Load user data synchronously from fixture
        cy.fixture('paraBank.json').then((userData) => {
            // Login with invalid credentials
            loginPage.enterUsername(userData.loginFailure.username);
            loginPage.enterPassword(userData.loginFailure.password);
            loginPage.clickSubmit();

            // Assert that login fails
            cy.url().should('not.include', '/home'); // Assuming failed login doesn't redirect to '/home'
            // Add more assertions if needed
        });
    });
});
