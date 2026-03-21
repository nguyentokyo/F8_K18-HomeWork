// Lesson 5: Temperature Conversion
// Write a function to calculate the conversion from Celsius to Fahrenheit. Formula: F = C * 1.8 + 32


// ANSWER
const convertToFahrenheit = (celsius) => {
    if (typeof celsius !== 'number') {
        return 'Not a number'
    }
    else {
        return celsius * 1.8 + 32;
    }
}

console.log(convertToFahrenheit("10"))  //Not a number OK
console.log(convertToFahrenheit(-10))       //14 Ok
console.log(convertToFahrenheit(10))       //50 Ok

