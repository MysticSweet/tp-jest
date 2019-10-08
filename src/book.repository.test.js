const BookRepository = require('./book.repository');
//const db = require('./db')

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test"});

        expect(dbMock.write.mock.calls.length).toBe(1);
    });
});

describe('Book repository getTotalCount', function () {

    test('getTotalCount of books - no save', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalCount()).toBeUndefined();
    });
    test('getTotalCount of books - with pre-save', () => {
        var books = [{id: 1, name: "Unit test"}, {id: 2, name: "Unit test 2"}];

        const dbMock = {
            get : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalCount();

        expect(total).toBe(2);
    });
    test('getTotalCount of books - get() appelé', () => {
        var books = [{id: 1, name: "Unit test"}, {id: 2, name: "Unit test 2"}, {id: 3, name: "Unit test 3"}];

        const dbMock = {
            get : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalCount();

        expect(dbMock.get).toBeCalled();
    });
});