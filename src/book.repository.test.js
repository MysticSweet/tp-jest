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

    test('getTotalCount of books - value() appelé', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalCount();

        expect(dbMock.value).toBeCalled();
    });
    test('getTotalCount of books - aucune donnée', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getTotalCount()).toBe(0);
    });
    test('getTotalCount of books - avec données', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(2)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalCount();

        expect(total).toBe(2);
    });
    test('getTotalCount of books - avec données save', () => {
        var arr_books = [{id: 1, name: "Unit test"}];

        const dbMock = {
            get : function() {
                var books = arr_books;
                return {
                    push : function (book) {
                        books.push(book);
                        return {
                            write : function () {
                                return 0;
                            }
                        }
                    },
                    size : function (){
                        var length = books.length;
                        return{
                            value : function (length) {
                                return arr_books.length;
                            }
                        }
                    }
                }
            }
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 2, name: "Unit test"});

        expect(repository.getTotalCount()).toBe(2);
    });
});

describe('Book repository getTotalPrice', function () {

    test('getTotalPrice of books - aucun livre', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(0)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(total).toBe(0);
    });
    test('getTotalPrice of books - 2 livres', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValueOnce(2).mockReturnValueOnce(5.0).mockReturnValueOnce(2.5)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(total).toBe(7.5);
    });
    test('getTotalPrice of books - value() called 3 times', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValueOnce(2).mockReturnValueOnce(5.0).mockReturnValueOnce(2.5)
        };

        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(dbMock.value.mock.calls.length).toBe(3);
    });
});

