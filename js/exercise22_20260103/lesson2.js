// Lesson 2: Days in a Month Calculator
// Using a switch case, write a function that takes a month number (1-12) as input. Print how many days are in that month.
//
//     Hint: Months 1, 3, 5, 7, 8, 10, 12 have 31 days. Months 4, 6, 9, 11 have 30 days. Month 2 has 28 or 29 days (temporarily calculate as 28 days).


const getDayInMonth = (month) => {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        case 4: case 6: case 9: case 11: return 30;
        case 2: return 28;
        default: return 'Invalid month';
    }
}

// console.log(`${getDayInMonth(2)} day`)
console.log(getDayInMonth(3))     //31
console.log(getDayInMonth(11))    //30
console.log(getDayInMonth(2))     //28
console.log(getDayInMonth(13))    //Invalid month