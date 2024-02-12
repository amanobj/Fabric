import LoginPage from '../pageobjects/loginPage';

describe('Create Savings Account Test', () => {
    let loginPage;
    let userData;
    let newAccountNumber;

    beforeEach(() => {
        // Load user data from fixture
        cy.fixture('paraBank.json').then((data) => {
            userData = data;
            
        // Executes prior each test within it block
        cy.visit(Cypress.config().baseUrl);
        loginPage = new LoginPage();

        // Login with valid credentials
        loginPage.enterUsername(userData.loginSuccess.username);
        loginPage.enterPassword(userData.loginSuccess.password);
        loginPage.clickSubmit();

    });
    });

    it('Verify Successful Account Creation', () => {

        // Navigate to Open New Account page
        cy.contains('Open New Account').click();

        // Select savings account type
        cy.get('#type').select('SAVINGS');

        // Select an existing account to transfer funds
        //cy.get('#fromAccountId').select('14343');

        cy.get('#type').select('SAVINGS');

        // Click on Open New Account button
        cy.get('[value="Open New Account"][type="submit"]').click()

         cy.wait(1000)
        // account number
        cy.get('#newAccountId').invoke('text').then((accountNumber) => {
            // Get the text of the account number
            const accountNum = accountNumber.trim();
            newAccountNumber = accountNum
            

            // Navigate to Transfer Funds page
        cy.contains('Transfer Funds').click();

        cy.wait(1000)

        // Perform funds transfer from the newly created account to another account
        cy.get('#fromAccountId').select(newAccountNumber); 
        cy.get('#amount').type('100'); 
        cy.contains('Transfer').click(); 
        });

        

    });



    

    it('Verify Successful Bill Payment', () => {
       
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
        cy.get('input[name="verifyAccount"]').type(userData.billPay.payeeAccountNumber); 
        cy.get('input[name="amount"]').type(userData.billPay.amount);
        cy.get('select[name="fromAccountId"]').select(newAccountNumber);

        // Submit the bill payment form
        cy.contains('Send Payment').click();

        // Verify that the bill payment is successful
        cy.contains('Bill Payment Complete').should('be.visible');
    });


    it('Verify API call should retrieve transactions by amount', () => {
        const expectedAmount = 1.00; 
    
        // Make the API request after login
        cy.fixture('paraBank.json').then(() => {
            cy.request({
                method: 'GET',
                url: 'https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/'+newAccountNumber+'/transactions/amount/' + expectedAmount
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
              expect(transaction.type).to.eq('Debit');
            });
        });
    });
    
});
