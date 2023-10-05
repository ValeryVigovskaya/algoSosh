import { baseURL } from "./routing.spec.cy"

describe('products management works correctly', function () {
    before(function () {
        cy.visit(`${baseURL}/recursion`);
    })

    it('should be an inactive button if the Input is empty', function () {
        cy.get('[class^=string_input_container__]').first().as('container');
        cy.get('@container').find('[class^=input_input]').first().as('input');
        cy.get('@container').find('button').last().as('button');

        cy.get('@input').should('be.empty');
        cy.get('@button').should('be.disabled');
    });
})

describe('correct turn of the line', function () {
    before(function () {
        cy.visit(`${baseURL}/recursion`);
    })

    it('should be the correct string reversal', function () {
        cy.get('[class^=string_input_container__]').first().as('container');
        cy.get('@container').find('[class^=input_input]').first().as('input');
        cy.get('@container').find('button').last().as('button');
        cy.get('[class^=string_circle_container__]').first().as('circle_container');



        cy.get('@input').type('Hello');
        cy.get('@button').should('not.be.disabled');

        cy.get('@button').click();
        cy.get('ul>li')
        .should('have.length', 5)
        // .each(($li, index, $lis) => {
        //     cy.wrap($li).get('[class^=circle_default]')
        //   })
    });
})