
const isTriangle = (a, b, c) => {
    const isTriangle = (a + b > c) && (b + c > a) && (c + a > b);
    const isEquilateral = (a === b && b === c);
    const isIsosceles = (a === b || b === c || a === c);
    const isRight = (a ** 2 === b ** 2 + c ** 2) || (b ** 2 === a ** 2 + c ** 2) || (c ** 2 === a ** 2 + b ** 2);

    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number' || isNaN(a) || isNaN(b) || isNaN(c)) {
        return "Invalid input"
    } else if (!(isTriangle)) {
        return "Not a triangle"
    } else if (isEquilateral) {
        return "Equilateral triangle";
    } else if (isIsosceles) {
        return "Isosceles triangle"
    } else if (isRight) {
        return "Right triangle"
    } else {
        return "Scalene triangle"
    }
}

console.log(isTriangle(NaN, 4, 2)); // Invalid input OK
console.log(isTriangle("1", "4", 2)); // Invalid input OK
console.log(isTriangle(1, 4, 2)); // Not a triangle OK
console.log(isTriangle(3, 4, 5)); // Right triangle OK
console.log(isTriangle(5, 5, 5)); // Equilateral triangle OK
console.log(isTriangle(5, 4, 2)); // Scalene triangle OK



