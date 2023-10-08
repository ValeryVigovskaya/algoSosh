const testArr = ['test', 'test', 'test', 'test', 'test', 'test', 'test'];

describe('products management works correctly', function async() {
    before(function () {
        cy.visit('/queue');
        cy.get('[class^=queue_input_container__]').as('container');
        cy.get('@container').find('[class^=input_input]').as('input');
        cy.get('@container').find('#addButton').as('addButton');
        cy.get('@container').find('#deleteButton').as('deleteButton');
        cy.get('@container').find('#clearButton').as('clearButton');
        cy.get('ul').as('list');
    })

    it('this should be a check of the correct operation of the add and remove buttons', function () {
        cy.get('@input').should('be.empty');
        cy.get('@addButton').should('be.disabled');
        cy.get('@deleteButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');

        //перебором заполнение массива и проверка анимации
        for (let i = 0; i < testArr.length; i++) {
            cy.get('@input').type('test');
            cy.get('@addButton').should('not.be.disabled').contains('Добавить').click();

            cy.get('@list').find(('[class^=circle_content__]')).as('circle-contaiter');
            if (i > 0) {
                cy.get('@circle-contaiter').eq(0).contains('head');
            }
            cy.get('@circle-contaiter').eq(i).contains('tail');
            cy.get('@circle-contaiter').find('[class^=circle_circle__]').eq(i).should('have.css', 'border-color', 'rgb(210, 82, 225)');

            cy.get('@circle-contaiter').find('[class^=circle_circle__]').eq(i).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        }

        //проверка полученного массива на соответствие содержимого
        cy.get('ul > li')
            .should('have.length', 7)
            .each(($li, index) => {
                cy.get($li).should('contain.text', testArr[index]);
            });

        //удаление элементов
        cy.clock()
        for (let i = 0; i < testArr.length; i++) {
            cy.get('@deleteButton').should('not.be.disabled').click();
            cy.tick(500);
            cy.get('@list').find('[class^=circle_content__]').as('circle-contaiter');
            cy.get('@circle-contaiter').eq(i).contains('head');
            cy.get('@circle-contaiter').find('[class^=circle_circle__]').eq(i).should('have.css', 'border-color', 'rgb(210, 82, 225)');
            cy.get('@circle-contaiter').find('[class^=circle_circle__]').eq(i - 1).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        }
    });
});

//очищение очереди
describe('correct clear', function () {
    before(function () {
        cy.visit('/queue');
        cy.get('[class^=queue_input_container__]').as('container');
        cy.get('@container').find('[class^=input_input]').as('input');
        cy.get('@container').find('#addButton').as('addButton');
        cy.get('@container').find('#clearButton').as('clearButton');
        cy.get('ul>li').as('list');
    })
    it('should be a check of the correct operation of the "clear" button', () => {
        cy.clock()
        for (let i = 0; i < 4; i++) {
            cy.get('@input').type('test');
            cy.get('@addButton').should('not.be.disabled').contains('Добавить').click();
            cy.tick(500);
        }
        cy.get('@clearButton').should('not.be.disabled').click();
        cy.get('@list').should('contain.text', 0);
    })
});