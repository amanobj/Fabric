import LoginPage from '../pageobjects/loginPage';

describe('Create Savings Account Test', () => {
    let loginPage;
    let userData;
    let newAccountNumber;

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

        // Select savings account type
        cy.get('#type').select('SAVINGS');

        // Click on Open New Account button
        cy.get('[value="Open New Account"][type="submit"]').click()

        // account number
        cy.get('#newAccountId').invoke('text').then((accountNumber) => {
            // Get the text of the account number
            const accountNum = accountNumber.trim();
            newAccountNumber = accountNum
            // Assert that the account number is not null or empty
            expect(accountNum, 'Account number should not be null or empty').to.not.be.null;
            expect(accountNum, 'Account number should not be null or empty').to.not.be.empty;

        });
    });



    it('Verify Balance Details on Account Overview Page for New Account Created', () => {
        // Login with valid credentials
        loginPage.enterUsername(userData.loginSuccess.username);
        loginPage.enterPassword(userData.loginSuccess.password);
        loginPage.clickSubmit();

        
        // Assert that the balance details are displayed
        cy.get('#accountTable')
            .contains('tr', newAccountNumber)
            .within(() => {
                cy.get('td').eq(1).should('contain', '$100.00'); // Adjust the index based on the column position of balance
            });
    });


    it('Verify Successful Bill Payment', () => {
        // Login with valid credentials
        loginPage.enterUsername(userData.loginSuccess.username);
        loginPage.enterPassword(userData.loginSuccess.password);
        loginPage.clickSubmit();

        // Navigate to the bill payment section
        cy.contains('Bill Pay').click();

        // Fill out the bill payment form
        cy.get('input[name="payee.name"]').type(userData.billPay.payeeName);
        cy.get('input[name="payee.address.street"]').type(userData.billPay.payeeAddress.street);
        cy.get('input[name="payee.address.city"]').type(userData.billPay.payeeAddress.city);
        cy.get('input[name="payee.address.state"]').type(userData.billPay.payeeAddress.state);
        cy.get('input[name="payee.address.zipCode"]').type(userData.billPay.payeeAddress.zipCode);
        cy.get('input[name="payee.phoneNumber"]').type(userData.billPay.payeePhoneNumber);
        cy.get('input[name="payee.accountNumber"]').type(userData.billPay.payeeAccountNumber);
        cy.get('input[name="verifyAccount"]').type(userData.billPay.payeeAccountNumber); // Assuming verifyAccount is to confirm the account number
        cy.get('input[name="amount"]').type(userData.billPay.amount);
        cy.get('select[name="fromAccountId"]').select(newAccountNumber);

        // Submit the bill payment form
        cy.contains('Send Payment').click();

        // Verify that the bill payment is successful
        cy.contains('Bill Payment Complete').should('be.visible');
    });


    
    
});
