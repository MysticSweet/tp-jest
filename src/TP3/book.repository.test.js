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
        var books = [{id:1,price:5.0},{id:2,price:2.5}];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValueOnce(books.length).mockReturnValueOnce(books[0].price).mockReturnValueOnce(books[1].price)
        };
        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(total).toBe(7.5);
    });
    test('getTotalPrice of books - value() called 3 times', () => {
        var books = [{id:1,price:5.0},{id:2,price:2.5}];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            size : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValueOnce(books.length).mockReturnValueOnce(books[0].price).mockReturnValueOnce(books[1].price)
        };

        const repository = new BookRepository(dbMock);
        var total = repository.getTotalPrice();

        expect(dbMock.value.mock.calls.length).toBe(3);
    });
});

describe('Book repository getBookByName', function () {

    test('getTotalPrice of books - value() called', () => {
        var book = {
            id : 1,
            name :"test"
        };
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(book)
        };

        const repository = new BookRepository(dbMock);
        repository.getBookByName();

        expect(dbMock.value).toBeCalled();
    });
    test('getBookByName of books - livre "test"', () => {
        var book = {
            id : 1,
            name :"test"
        };
        //var books = [{id: 1,name:"test"},{id: 2,name:"truc"}];

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(book)
        };
        const repository = new BookRepository(dbMock);
        var received_book = repository.getBookByName("test");

        expect(received_book).toEqual(book);
    });
});

describe('Book repository getCountBookAddedByMonth', function () {

    test('test de getCountBookAddedByMonth - value() called', () => {
        var book = {
            id : 1,
            name :"test"
        };
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            sortBy : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnThis()
        };

        const repository = new BookRepository(dbMock);
        repository.getCountBookAddedByMonth();

        expect(dbMock.value).toBeCalled();
    });
    test('getCountBookAddedByMonth of books - 2 livres sur 2 mois', () => {
        var books = [{id : 1,added_at :"2017-02-05"},{id : 2,added_at :"2017-03-01"}];
        var res = [
                    {
                        year: 2017,
                        month: 2,
                        count: 1,
                        count_cumulative: 1
                    },
                    {
                        year: 2017,
                        month: 3,
                        count: 1,
                        count_cumulative: 2
                    }];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            sortBy : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(books)
        };
        const repository = new BookRepository(dbMock);
        var received_array = repository.getCountBookAddedByMonth();

        //expect(received_array.length).toBe(2);
        expect(received_array).toEqual(res);
    });
});


