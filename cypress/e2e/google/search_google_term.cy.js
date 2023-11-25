describe('search term on google', () => {
    beforeEach(() => {
        cy.visit('https://google.com');
    })

    // it('searches for a term', () => {
    //     cy.get('[aria-label="Buscar"]').type('github{enter}');
    //     cy.wait(1000);
    //     cy.get('#rso').should('contain', 'github.com');
    // })

    it('get iphones in mercado libre', async () => {
        searchGoogle('mercado libre colombia');
        clickOnFirstResult();
        searchMercadoLibre('iphone 14 pro max');
        const results = await getTheFourFirstsResults();
        debugger;
        cy.log('Results: ', results)
    })
});

function searchGoogle(term) {
    cy.get('[aria-label="Buscar"]').type(`${term}{enter}`);
    cy.wait(1000);
}

function clickOnFirstResult() {
    cy.get('#rso').find('a').first().click();
}

function searchMercadoLibre(term) {
    cy.wait(2000);
    // validate url
    cy.visit('https://www.mercadolibre.com.co/');
    cy.origin('https://www.mercadolibre.com.co/', {args: {term}}, ({ term }) => {
        cy.get('#cb1-edit').type(`${term}{enter}`);
    });
    cy.wait(1000); // Puedes ajustar el tiempo de espera según sea necesario
}

async function getTheFourFirstsResults() {
    await cy.origin('https://listado.mercadolibre.com.co/iphone-14-pro-max#D[A:iphone%2014%20pro%20max]', () => {
        return cy.get('.ui-search-layout__item');
    })
}