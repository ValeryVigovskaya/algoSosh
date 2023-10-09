const testArr = ['test'];

describe('products management works correctly', function () {
    beforeEach(function () {
        cy.visit('/list');
        cy.get('[class^=list_inputs_container__]').as('containerInputs');
        cy.get('[class^=list_input_container__]').first().as('containerInputValue');
        cy.get('[class^=list_input_container__]').last().as('containerInputIndex');
        cy.get('@containerInputValue').find('[class^=input_input]').as('inputValue');
        cy.get('@containerInputIndex').find('[class^=input_input]').as('inputIndex');
        cy.get('@containerInputValue').find('#addHead').as('addHead');
        cy.get('@containerInputValue').find('#addTail').as('addTail');
        cy.get('@containerInputValue').find('#deleteHead').as('deleteHead');
        cy.get('@containerInputValue').find('#deleteHead').as('deleteTail');
        cy.get('@containerInputIndex').find('#addByIndex').as('addByIndex');
        cy.get('@containerInputIndex').find('#deleteByIndex').as('deleteByIndex');
        cy.get('ul').as('list');
        cy.get('ul>li').as('array');
    })

    it('should be an inactive button if the Inputs is empty', function () {
        cy.get('@inputValue').should('be.empty');
        cy.get('@addHead').should('be.disabled');
        cy.get('@addTail').should('be.disabled');

        cy.get('@inputIndex').should('be.empty');
        cy.get('@addByIndex').should('be.disabled');
        cy.get('@deleteByIndex').should('be.disabled');
    });

    it('should be a correct rendering of the default list', () => {
        cy.get('@array')
            .should('have.length', 4)
            .each(($li, index, list) => {
                cy.get($li).find('[class^=circle_content__]').as('circle-contaiter');
                if (index === 0) {
                    cy.get('@circle-contaiter').should('contain', 'head');
                } else {
                    cy.get('@circle-contaiter').should('not.have.contain', 'head');
                }
                if (index === (list.length - 1)) {
                    cy.get('@circle-contaiter').should('contain', 'tail');
                } else {
                    cy.get('@circle-contaiter').should('not.have.contain', 'tail');
                }
                cy.get('@circle-contaiter').find('[class^=circle_circle__]').should('have.css', 'border-color', 'rgb(0, 50, 255)');
            });
    });

    it('should be a valid addition adding an element to head', () => {
        cy.get('@inputValue').type('test');
        cy.get('@addHead').should('not.be.disabled').contains('Добавить в head').click();
        cy.get('ul>li').find('[class^=circle_content__]').as('circle-contaiter');
        cy.get('@circle-contaiter').find('[class^=circle_circle__]').as('circle')

        //добавление в head
        cy.get('@circle').eq(0).should('contain', 'test');
        cy.get('@circle').eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.clock();
        cy.tick(500);

        //перемещение в начало
        cy.get('@circle').eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);
        cy.get('@circle-contaiter').eq(0).should('contain', 'head');
    });

    it('should be a valid addition adding an element to tail', () => {
        cy.get('@inputValue').type('test');
        cy.get('@addTail').should('not.be.disabled').contains('Добавить в tail').click();
        cy.get('ul>li').find('[class^=circle_content__]').as('circle-contaiter');
        cy.get('@circle-contaiter').find('[class^=circle_circle__]').as('circle')

        //добавление в tail
        cy.get('@circle').eq('@list'.length - 2).should('contain', 'test');
        cy.get('@circle').eq('@list'.length - 2).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.clock();
        cy.tick(500);

        //перемещение в конец
        cy.get('@circle').eq('@list'.length - 1).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.tick(500);
        cy.get('@circle').should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.tick(500);
        cy.get('@circle-contaiter').eq('@list'.length - 1).should('contain', 'tail');
    });

    it('should be a correct addition adding an element by index', () => {
        cy.get('@inputValue').type('itsT');
        cy.get('@inputIndex').type('3');
        cy.get('@addByIndex').should('not.be.disabled').contains('Добавить по индексу').click();
        cy.get('ul>li').find('[class^=circle_content__]').as('circle-contaiter');
        cy.get('@circle-contaiter').find('[class^=circle_circle__]').as('circle');
        
        cy.get('ul >li')
        .should('have.length', 4)
        .each(($li, index, list) => {
            cy.get($li).find('[class^=circle_circle__]').as('circle');
            cy.get('@circle').eq(0).should('contain', 'itsT');
            if(index < 3){
                cy.get('@circle').eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)');
             }
            if(index === (list.length - 1)){            
                cy.get('@circle').eq(1).should('have.css', 'border-color', 'rgb(127, 224, 81)');
                cy.get('@circle').eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)');
            }
        });
    });
});

// //очищение очереди
// describe('correct clear', function () {
//     before(function () {
//         cy.visit('/queue');
//         cy.get('[class^=queue_input_container__]').as('container');
//         cy.get('@container').find('[class^=input_input]').as('input');
//         cy.get('@container').find('#addButton').as('addButton');
//         cy.get('@container').find('#clearButton').as('clearButton');
//         cy.get('ul>li').as('list');
//     })
//     it('should be a check of the correct operation of the "clear" button', () => {
//         cy.clock()
//         for (let i = 0; i < 4; i++) {
//             cy.get('@input').type('test');
//             cy.get('@addButton').should('not.be.disabled').contains('Добавить').click();
//             cy.tick(500);
//         }
//         cy.get('@clearButton').should('not.be.disabled').click();
//         cy.get('@list').should('contain.text', 0);
//     })
// });