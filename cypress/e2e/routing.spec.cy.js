describe('app works correctly with routes', function () {
    before(function () {
        cy.visit('/');
    })

    it('should open a page default', function () {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('should open a page with a string algorithm', function () {
        // cy.visit(`/recursion`);
        // cy.contains("Строка");
        cy.visit('/');
        cy.get(`[href="/recursion"]`).click();
        cy.location('pathname').should('eq', '/recursion')
    });

    // it('should open a page with the algorithm Fibonacci sequence', function () {
    //     cy.visit(`/fibonacci`);
    //     cy.contains("Последовательность Фибоначчи");
    // });

    // it('should open a page with sorting algorithms', function () {
    //     cy.visit(`/sorting`);
    //     cy.contains("Сортировка массива");
    // });

    // it('should open a page with a stack algorithm', function () {
    //     cy.visit(`/stack`);
    //     cy.contains("Стек");
    // });

    // it('should open a page with a queue algorithm', function () {
    //     cy.visit(`/queue`);
    //     cy.contains("Очередь");
    // });

    // it('should open a page with a list algorithm', function () {
    //     cy.visit(`/list`);
    //     cy.contains("Связный список");
    // });

    // it('should open agreement page after continue button click', function() {
    //   cy.contains('Обычная доставка').click();
    //   cy.get('button').contains('Продолжить оформление').click();
    //   cy.contains('Подтверждение заказа');
    // });
}); 