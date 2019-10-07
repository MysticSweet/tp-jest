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

describe('union', function () {
    var interval1 = new Interval(1,5);
    var interval2 = new Interval(5,7);
    var result12 = [new Interval(1,7)];

    var interval3 = new Interval(2,10);
    var result13 = [new Interval(1,10)];

    var interval4 = new Interval(50,60);
    var result14 = [interval1, interval4];

    var interval5 = new Interval(2,4);
    var result15 = [interval1];

    test('Test union - intervals qui se suivent', () => { 
        expect(interval1.union(interval2)).toEqual(result12)
    });
    test('Test union - intervals qui se superposent', () => { 
        expect(interval1.union(interval3)).toEqual(result13)
    });
    test('Test union - intervals qui sont séparés', () => { 
        expect(interval1.union(interval4)).toEqual(result14)
    });
    test('Test union - interval inclu dans l\'autre', () => { 
        expect(interval1.union(interval5)).toEqual(result15)
    });
});

describe('intersection', function () {
    var interval1 = new Interval(1,5);
    var interval2 = new Interval(3,10);
    var result12 = new Interval(3,5);

    var intervalOut = new Interval(99,110);
    var intervalIn = new Interval(2,4);

    var intervalSequel = new Interval(5,20);
    var result = new Interval(5,5);

    test('Test intersection - intervals qui se superposent', () => { 
        expect(interval1.intersection(interval2)).toEqual(result12)
    });
    test('Test intersection - intervals qui se superposent (inversement)', () => { 
        expect(interval2.intersection(interval1)).toEqual(result12)
    });
    test('Test intersection - intervals qui sont séparés', () => { 
        expect(interval1.intersection(intervalOut)).toBeNull()
    });
    test('Test intersection - interval A inclu interval B', () => { 
        expect(interval1.intersection(intervalIn)).toEqual(intervalIn)
    });
    test('Test intersection - interval B inclu interval A', () => { 
        expect(intervalIn.intersection(interval1)).toEqual(intervalIn)
    });
    test('Test intersection - interval A est suivi par interval B', () => { 
        expect(interval1.intersection(intervalSequel)).toEqual(result)
    });
    test('Test intersection - interval B suit interval A', () => { 
        expect(intervalSequel.intersection(interval1)).toEqual(result)
    });
});

describe('exclusion', function () {
    var interval1 = new Interval(1,10);
    var interval2 = new Interval(4,6);
    var result12 = [new Interval(1,3), new Interval(7,10)];

    var interval3 = new Interval(6,15);
    var result13 = [new Interval(1,5), new Interval(11,15)];

    var interval1Sequel = new Interval(10,20);
    var result = [new Interval(1,9), new Interval(11,20)];

    var intervalOut = new Interval(50,60);
    var separe = [interval1, intervalOut];

    test('Test exclusion - interval A inclu interval B', () => { 
        expect(interval1.exclusion(interval2)).toEqual(result12)
    });
    test('Test exclusion - interval B inclu interval A', () => { 
        expect(interval2.exclusion(interval1)).toEqual(result12)
    });
    test('Test exclusion - intervals qui se superposent', () => { 
        expect(interval1.exclusion(interval3)).toEqual(result13)
    });
    test('Test exclusion - intervals qui se suivent', () => { 
        expect(interval1.exclusion(interval1Sequel)).toEqual(result)
    });
    test('Test exclusion - intervals qui se suivent (inversement)', () => { 
        expect(interval1Sequel.exclusion(interval1)).toEqual(result)
    });
    test('Test exclusion - intervals qui sont séparés', () => { 
        expect(interval1.exclusion(intervalOut)).toEqual(separe)
    });
    test('Test exclusion - intervals qui sont séparés (inversement)', () => { 
        expect(intervalOut.exclusion(interval1)).toEqual(separe)
    });
});

