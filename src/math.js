let Util = {};
Util.factorial = (n) => {
    if (n === 0) {
        return 1;
    }

    if (n >= 3000) {
        throw 'n too large'
    }

    if (n < 0) {
        throw 'n is negative'
    }

    return n * Util.factorial(n - 1);
};

/**
 * Détermine si n est un nombre premier.
 * Util.isPrime(5) => false
 * Util.isPrime(6) => true
 *
 * @param {number} n
 * @returns {boolean}
 */
Util.isPrime = function (n) {
    if (n === 1 || n === 0) {
        return false;
    }
    if (n < 0) {
        throw 'Unable to compute prime for n < 0'
    }
    for (var i = 2; i < n; i++)
        if (n % i === 0) return false;
    return true;

};


/**
 * Additionne l'ensemble des nombres premiers de 2 à n
 *
 * Util.sumPrime(6) = 2 + 3 + 5 = 10
 * Util.sumPrime(8) = 2 + 3 + 5 + 7 = 17
 *
 * @param {number} n
 * @returns {number}
 */
Util.sumPrime = function(n) {
    var res = 0;

    for (var i = 2; i <= n; i++) {
        if (Util.isPrime(i)) res += i;
    }

    return res;
};

/**
 * Cette méthode doit retourner un tableau de 1 à n tel que:
 * - Pour les nombres multiples de 3, les remplacer par "Fizz"
 * - Pour les nombres multiples de 5, les remplacer par "Buzz"
 * - Pour les nombres multiples de 3 et 5, les remplacer par "FizzBuzz"
 *
 * Exp :
 * Util.fizzBuzz(15) => [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
 *
 * @param {number} n
 * @returns {array}
 */
Util.fizzBuzz = function(n) {
    var array = [];

    if (n < 1) {
        throw 'Unable to comput fizzbuzz for n < 1'
    }

    for (var i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0){
            array.push("FizzBuzz");
        }
        else if (i % 3 === 0){
            array.push("Fizz");
        }
        else if (i % 5 === 0){
            array.push("Buzz");
        }
        else{
            array.push(i);
        }
    }

    return array;
};

/**
 * Chiffre une phrase selon la règle suivante : Les A deviennent des B, les B des C, etc.
 *
 * Exp :
 * Util.cipher("Test Unitaire") => "Uftu Tojubjsf"
 *
 * @param phrase
 * @returns {string}
 */
Util.cipher = function (phrase) {
    var str = "";

    for (var i = 0; i < phrase.length; i++) {
        var code = phrase.charCodeAt(i);
        var char = phrase.charAt(i);

        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
            if (code == 90) code = 65;
            else if (code == 122) code = 97;
            else code++;
            char = String.fromCharCode(code);
        }

        str += char;
    }

    return str;
};

/**
 * Retourne le nombre de paires dans un tableau
 *
 * Exp :
 *
 * Util.pairs([3,3]) => 1
 * Util.pairs([3,3,5]) => 1
 * Util.pairs([3,3,5,5,5]) => 4
 *
 * @param array
 * @return int
 */
Util.pairs = function(array) {
    var count = 0;

    for (var i = 0; i < array.length-1; i++) {
        for (var j = i+1; j < array.length; j++) {
            if (array[i] == array[j]) count++;
        }
    }

    return count;
};


module.exports = Util;

