// Lesson 3: Even/Odd Check
// Write a single line of code using the ternary operator to check variable n. If n is even, return the string "Even", otherwise return "Odd".


//Even ⇒ OK
(function (number) {console.log(typeof number !== 'number' ? 'Not a number' : number % 2 === 0 ? 'Even' : 'Odd')})(100);

//Odd ⇒ OK
(function (number) {console.log(typeof number !== 'number' ? 'Not a number' : number % 2 === 0 ? 'Even' : 'Odd')})(3);

//Not a number ⇒ OK
(function (number) {console.log(typeof number !== 'number' ? 'Not a number' : number % 2 === 0 ? 'Even' : 'Odd')})("11");



