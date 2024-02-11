describe('Navigation Links Test', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
    });

    it('should navigate to About Us page', () => {
        cy.contains('About Us').click();
        cy.url().should('include', 'about.htm');
    });

    it('should navigate to Services page', () => {
        cy.contains('Services').click();
        cy.url().should('include', 'services.htm');
    });

    it('should navigate to Products page', () => {
        // Click the Products link
        cy.contains('Products').then(($link) => {
            const url = $link.prop('href');
            cy.request(url).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
    it('should navigate to Locations page', () => {
        cy.contains('Locations').then(($link) => {
            const url = $link.prop('href');
            cy.request(url).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });

    it('should navigate to Admin Page', () => {
        cy.contains('Admin Page').click();
        cy.url().should('include', 'admin.htm');
    });
});
