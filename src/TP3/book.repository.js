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
        return this.db.get('books').size().value();
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
        var count = this.getTotalCount();
        var total = 0;

        for (var i = 0; i < count; i++) {
            total += this.db.get('books['+i+'].price').value();
        }

        return total;
    }

    /**
     * Retourne un livre
     */
    getBookByName(bookName) {
        return this.db.get('books').find({name: bookName}).value();
    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month: 2,
     *          count: 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month: 3,
     *          count: 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */
    getCountBookAddedByMonth(bookName) {
        var counter = 0;
        var counter_cumulative = 0;
        var last_y = -1;
        var last_m = -1;
        var result = [];

        var books = this.db.get('books').sortBy('added_at').value();
        for (var i = 0; i < books.length; i++){
            var date = books[i].added_at.split('-');
            var current_y = Number(date[0]);
            var current_m = Number(date[1]);

            if (last_y !== current_y || last_m !== current_m){
                if (last_m !== -1 && last_y !== -1){
                    result.push({
                        year: last_y, 
                        month: last_m, 
                        count: counter, 
                        count_cumulative: counter_cumulative
                    });
                    counter = 0;
                }

                last_y = current_y;
                last_m = current_m;
            }

            counter++;
            counter_cumulative++;

            if (counter_cumulative == books.length){
               result.push({
                    year: last_y, 
                    month: last_m, 
                    count: counter, 
                    count_cumulative: counter_cumulative
                }); 
            }
        }

        return result;
    }

}


module.exports = BookRepository;