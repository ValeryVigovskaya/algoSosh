describe('products management works correctly', function () {
    before(function () {
        cy.visit('/recursion');
    })

    it('should be an inactive button if the Input is empty', function () {
        cy.get('[class^=string_input_container__]').as('container');
        cy.get('@container').find('[class^=input_input]').as('input');
        cy.get('@container').find('button').as('button');

        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled');
    });
})

describe('correct turn of the line', function () {
    before(function () {
        cy.visit('/recursion');
        cy.get('input').type('Hello');
        cy.get('[class^=string_input_container__]').find('button').should('not.be.disabled').contains('Развернуть').click();
    });

    it('should be the correct string reversal', function () {
        cy.get('ul>li').as('array');
        const testArr = ['o', 'l', 'l', 'e', 'H'];

        //проверка перебором на дефолтное состояние
        cy.get('@array')
            .should('have.length', 5)
            .each(($li) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                cy.get('@circle').should('have.css', 'border-color', 'rgb(0, 50, 255)');
            });

        //проверка перебором первого и последнего элементов на изменение
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', 'rgb(210, 82, 225)');
                }
            });
        //следующий шаг изменения цвета
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
                }
                if (index === 1 || index === (list.length - 2)) {
                    cy.get('@circle').should('have.css', 'border-color', 'rgb(210, 82, 225)');
                }
            });
        //следующий шаг изменения цвета
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index, list) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                if (index === 0 || index === (list.length - 1)) {
                    cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
                }
                if (index === 1 || index === (list.length - 2)) {
                    cy.get('@circle').should('have.css', 'border-color', 'rgb(210, 82, 225)');
                }
            });

        //финальный шаг
        cy.get('@array')
            .should('have.length', 5)
            .each(($li) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                cy.get('@circle').should('have.css', 'border-color', 'rgb(127, 224, 81)');
            });

        //проверка корректного переворота строки
        cy.get('@array')
            .should('have.length', 5)
            .each(($li, index) => {
                cy.get($li).find('[class^=circle_circle__]').as('circle');
                cy.get('@circle').should('contain.text', testArr[index]);
            });
    });
})