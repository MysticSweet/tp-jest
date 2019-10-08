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

describe('Book repository getTotalPrice', function () {

    test('getTotalPrice of books - with pre-save', () => {
        var books = [{id: 1, name: "Unit test", price: 8.1}, {id: 2, name: "Unit test 2", price: 1.9}];

        const dbMock = {
            get : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(total).toBe(10);
    });
    test('getTotalPrice of books - with pre-save in text', () => {
        var books = [{id: 1, name: "Unit test", price: "10.6"}, {id: 2, name: "Unit test 2", price: "1.9"}];

        const dbMock = {
            get : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(total).toBe(12.5);
    });
    test('getTotalPrice of books - get() appelé', () => {
        var books = [{id: 1, name: "Unit test", price: "10.0"}];

        const dbMock = {
            get : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(dbMock.get).toBeCalled();
    });
});

