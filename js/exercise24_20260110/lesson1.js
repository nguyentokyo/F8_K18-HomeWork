
function isPrime(n) {
    if (typeof n !== 'number' || isNaN(n)) {
        return "Invalid input";
    }

    let result = true;

    if (n < 2) {
        result = false;
    }

    for (let i = 2; i <= n ** 0.5 ; i++) {
        if (n % i === 0) {
            result = false;
            break;
        }
    }

    return result;
}

console.log(isPrime(1))  // false
console.log(isPrime(2))  // true
console.log(isPrime(4))  // false
console.log(isPrime(17)) // true
