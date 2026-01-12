
function isPerfectNumber(n) {
    if (typeof n !== 'number' || isNaN(n)) {
        return "Invalid input";
    }

    if (n <= 0) {
        return false;
    }

    let sum = 0;

    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) {
            sum = sum + i;
        }
    }

    return sum === n;
}

console.log(isPerfectNumber(-6));    // No
console.log(isPerfectNumber(6));    //1+2+3=6 Ok
console.log(isPerfectNumber(28));   //1+2+4+7+14=28 OK
console.log(isPerfectNumber(10));   //1+2+5=8 NO
console.log(isPerfectNumber(1));    //1 NO