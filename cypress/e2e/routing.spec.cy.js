export const baseURL = 'http://localhost:3000';
describe('app works correctly with routes', function () {
    before(function () {
        cy.visit(baseURL);
    });

    it('should open a page default', function () {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('should open a page with a string algorithm', function () {
        cy.visit(`${baseURL}/recursion`);
        cy.contains("Строка");
    });

    it('should open a page with the algorithm Fibonacci sequence', function () {
        cy.visit(`${baseURL}/fibonacci`);
        cy.contains("Последовательность Фибоначчи");
    });

    it('should open a page with sorting algorithms', function () {
        cy.visit(`${baseURL}/sorting`);
        cy.contains("Сортировка массива");
    });

    it('should open a page with a stack algorithm', function () {
        cy.visit(`${baseURL}/stack`);
        cy.contains("Стек");
    });

    it('should open a page with a queue algorithm', function () {
        cy.visit(`${baseURL}/queue`);
        cy.contains("Очередь");
    });

    it('should open a page with a list algorithm', function () {
        cy.visit(`${baseURL}/list`);
        cy.contains("Связный список");
    });

    // it('should open agreement page after continue button click', function() {
    //   cy.contains('Обычная доставка').click();
    //   cy.get('button').contains('Продолжить оформление').click();
    //   cy.contains('Подтверждение заказа');
    // });
}); 