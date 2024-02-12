import LoginPage from '../../pageobjects/loginPage';

describe('API Test - Find Transactions by Amount', () => {
    let loginPage;
    let userData;

    beforeEach(() => {
        // Load user data from fixture
        cy.fixture('paraBank.json').then((data) => {
            userData = data;

            // Execute login after loading the fixture data
            login();
        });
    });

    function login() {
        // Visit the login page
        cy.visit(Cypress.config().baseUrl);
        loginPage = new LoginPage();

        // Login with valid credentials
        loginPage.enterUsername(userData.loginSuccess.username);
        loginPage.enterPassword(userData.loginSuccess.password);
        loginPage.clickSubmit();
    }

    it.skip('should retrieve transactions by amount', () => {
        const expectedAmount = 100; // Replace with the expected amount for validation
    
        // Make the API request after login
        cy.fixture('paraBank.json').then(() => {
            cy.request({
                method: 'GET',
                url: 'https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/14454/transactions/amount/' + expectedAmount
            }).then((response) => {
                // Verify that the API call was successful
                expect(response.status).to.eq(200);
    
                // Parse the JSON response
                const transactions = response.body;
    
                // Ensure that at least one transaction is returned
                expect(transactions).to.have.length.greaterThan(0);
    
                // Validate details of the first transaction
                const transaction = transactions[0];
                expect(transaction.amount).to.eq(expectedAmount);
                expect(transaction.type).to.eq('Credit');
            });
        });
    });
    
});
