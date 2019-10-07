const Interval = require('./interval');

describe('overlaps', function () {
    var interval1 = new Interval(1,5);
    var interval1Bis = new Interval(1,5);
    var interval2 = new Interval(4,7);
    var interval3 = new Interval(7,10);
    var intervalI = new Interval(1,1);

    test('Test overlaps - overlapsing => true', () => { 
        expect(interval1.overlaps(interval2)).toBe(true)
    });
    test('Test overlaps - intervals identiques => true', () => { 
        expect(interval1.overlaps(interval1Bis)).toBe(true)
    });
    test('Test overlaps - unis aux limites => false', () => { 
        expect(interval2.overlaps(interval3)).toBe(false)
    });
    test('Test overlaps - intervals non séparés => false', () => { 
        expect(interval1.overlaps(interval3)).toBe(false)
    });
    test('Test overlaps - avec interval [1,1] => false', () => { 
        expect(interval1.overlaps(intervalI)).toBe(false)
    });
});

describe('includes', function () {
    var interval1 = new Interval(1,5);
    var interval1Bis = new Interval(1,5);
    var interval2 = new Interval(2,3);
    var interval3 = new Interval(0,6);
    var intervalLeft = new Interval(0,4);
    var intervalRight = new Interval(2,7);
    var intervalOut = new Interval(50,66);

    test('Test includes - intervals identiques => true', () => { 
        expect(interval1.includes(interval1Bis)).toBe(true)
    });
    test('Test includes - interval2 dans interval1 => true', () => { 
        expect(interval1.includes(interval2)).toBe(true)
    });
    test('Test includes - interval3 plus grand que interval1 => false', () => { 
        expect(interval1.includes(interval3)).toBe(false)
    });
    test('Test includes - interval plus grand (limite gauche) => false', () => { 
        expect(interval1.includes(intervalLeft)).toBe(false)
    });
    test('Test includes - interval plus grand (limite droite) => false', () => { 
        expect(interval1.includes(intervalRight)).toBe(false)
    });
    test('Test includes - intervals séparés => false', () => { 
        expect(interval1.includes(intervalOut)).toBe(false)
    });
});