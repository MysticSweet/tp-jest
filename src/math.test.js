const Util = require('./math');
test('Test factoriel de 0 => 1', () => {
    expect(Util.factorial(0)).toBe(1);
});

test('Test factoriel de 2 => 2', () => {
    expect(Util.factorial(3)).toBe(6);
});

test('Test factoriel de 3 => 6', () => {
    expect(Util.factorial(3)).toBe(6);
});

test('Test factoriel de 3000', () => {
    expect(()=> {Util.factorial(3000)}).toThrow();
});

test('Test factoriel -10', () => {
    expect(()=> {Util.factorial(-10)}).toThrow(/negative/);
});


describe('isPrime', function () {

    test('Test prime de 1 => false', () => {
        expect(Util.isPrime(1)).toBe(false)
    });
    test('Test prime de 0 => false', () => {
        expect(Util.isPrime(0)).toBe(false)
    });
    test('Test prime < 0 => throw exception', () => {
        expect(() => { Util.isPrime(-10) }).toThrow('Unable to compute prime for n < 0');
    });

    test.each([
        [2, true],
        [5, true],
        [17, true],
        [18, false],
        [53, true],
        [55, false],
    ])(
        'isPrime %i equals to %i',
        (n, expected) => {
            expect(Util.isPrime(n)).toBe(expected);
        }
    );
});

describe('sumPrime', function () {
    test('Test sum prime de 1 => 0', () => {
        expect(Util.sumPrime(1)).toBe(0)
    });
    test('Test sum prime de 6 => 10', () => {
        expect(Util.sumPrime(6)).toBe(10)
    });
    test('Test sum prime de 8 => 17', () => {
        expect(Util.sumPrime(8)).toBe(17)
    });
});

describe('fizzBuzz', function () {
    var arr = [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"];

    test('Test fizzBuzz < 1 => throw exception', () => {
        expect(() => { Util.fizzBuzz(0) }).toThrow('Unable to comput fizzbuzz for n < 1');
    });
    test('Test fizzBuzz retourne un tableau', () => {
        expect(Array.isArray(Util.fizzBuzz(15))).toBeTruthy()
    });
    test('Test fizzBuzz de 15', () => { 
        expect(Util.fizzBuzz(15)).toEqual(arr)
    });

});

describe('cipher', function () {

    test('Test cipher de chaine vide : "" => ""', () => { 
        expect(Util.cipher("")).toEqual("")
    });
    test('Test cipher de "Test Unitaire" => "Uftu Vojubjsf"', () => { 
        expect(Util.cipher("Test Unitaire")).toEqual("Uftu Vojubjsf")
    });
    test('Test cipher de "Voila Zoro !" => "Wpjmb Apsp !"', () => { 
        expect(Util.cipher("Voila Zoro !")).toEqual("Wpjmb Apsp !")
    });
    test('Test cipher de "1234" => "1234"', () => { 
        expect(Util.cipher("1234")).toEqual("1234")
    });
});

describe('pairs', function () {

    test('Test pairs de [2] => 0 (aucune pair)', () => { 
        expect(Util.pairs([2])).toBe(0)
    });
    test('Test pairs de tableau vide : [] => 0', () => { 
        expect(Util.pairs([])).toBe(0)
    });
    test('Test pairs de [3,3] => 1', () => { 
        expect(Util.pairs([3,3])).toBe(1)
    });
    test('Test pairs de [3,3,5] => 1', () => { 
        expect(Util.pairs([3,3,5])).toBe(1)
    });
    test('Test pairs de [3,3,5,5,5] => 4', () => { 
        expect(Util.pairs([3,3,5,5,5])).toBe(4)
    });
    test('Test pairs de [3,5,6,5,6,6,2,6] => 7', () => { 
        expect(Util.pairs([3,5,6,5,6,6,2,6])).toBe(7)
    });
});