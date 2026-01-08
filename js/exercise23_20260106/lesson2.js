

function isPerfectSquare(x) {
    if (typeof x !== 'number') {
        return false
    } else {
        return (x ** 0.5) % 1 === 0;
    }
}
console.log(isPerfectSquare("1"));  //string ⇒ false
console.log(isPerfectSquare(-1));   //false
console.log(isPerfectSquare(2));    //false
console.log(isPerfectSquare(4));    //true
console.log(isPerfectSquare(25));   //true