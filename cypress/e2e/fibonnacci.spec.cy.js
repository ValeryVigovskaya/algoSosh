describe('products management works correctly', function () {
    before(function () {
        cy.visit('/fibonacci');
    })

    it('should be an inactive button if the Input is empty', function () {
        cy.get('[class^=fibonacci_input_container__]').as('container');
        cy.get('@container').find('[class^=input_input]').as('input');
        cy.get('@container').find('button').as('button');

        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled');
    });
});

describe('numbers are generated correctly', function () {
    before(function () {
        cy.visit('/fibonacci');
        cy.get('input').type('7');
        cy.get('[class^=fibonacci_input_container__]').find('button').should('not.be.disabled').contains('Рассчитать').click();
    });

    it('should be correct number generation', function () {
        cy.get('ul>li').as('array');
        const testArr = [1,1,2,3,5,8,13,21];
        //проверка корректную генерацию чисел
        cy.get('@array')
            .should('have.length', 7)
            .each(($li, index) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                cy.get('@circle').should('contain.text', testArr[index]);
            });
    });
})