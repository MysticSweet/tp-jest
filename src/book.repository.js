class BookRepository {

    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

    save (book) {
        this.db.get('books').push(book).write();
    }

    /**
     * Nombre total de livre
     */
    getTotalCount() {
        var books = this.db.get('books');
        return books.length;
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
        var books = this.db.get('books');
        var total = 0;

        for (var i = books.length - 1; i >= 0; i--) {
            total += Number(books[i].price);
        }

        return total;
    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {

    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month, 2,
     *          count, 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month, 3,
     *          count, 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */
    getCountBookAddedByMont(bookName) {

    }

}


module.exports = BookRepository;