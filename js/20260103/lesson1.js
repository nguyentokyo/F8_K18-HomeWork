// Lesson 1: Academic Performance Classification
// Write a function that takes a student's score (0-10) as input and prints the classification:
// 9 - 10: Excellent
// 8 - under 9: Very Good
// 6.5 - under 8: Good
// 5 - under 6.5: Average
// Under 5: Weak
// Requirement: Check if the entered score is valid (0-10) before evaluating.


// ANSWER
function checkScore(score) {

    if (typeof score !== 'number') {
        return 'Score must be a number'
    }
    else if (score < 0 || score > 10) {
        return 'Score must be between 0 and 10'
    }
    else if (score >= 9) {
        return 'Excellent'
    }
    else if (score >= 8) {
        return 'Very Good'
    }
    else if (score >= 6.5) {
        return 'Good'
    }
    else if (score >= 5) {
        return 'Average'
    }
    else {
        return 'Weak'
    }
}

console.log(checkScore("test"))     //Score must be a number
console.log(checkScore(100))        //Score must be between 0 and 10
console.log(checkScore(-20))        //Score must be between 0 and 10
console.log(checkScore(4))          //Weak
console.log(checkScore(5.1))        //Average
console.log(checkScore(7))          //Good
console.log(checkScore(8))          //Very Good
console.log(checkScore(9.5))        //Excellent

console.log('-----------------arrow function-------------')

// arrow function
// let checkScoreFunction = (score) => {
//     if (typeof score !== 'number') {
//         return 'Score must be a number'
//     }
//     else if (score < 0 || score > 10) {
//         return 'Score must be between 0 and 10'
//     }
//     else if (score >= 9) {
//         return 'Excellent'
//     }
//     else if (score >= 8) {
//         return 'Very Good'
//     }
//     else if (score >= 6.5) {
//         return 'Good'
//     }
//     else if (score >= 5) {
//         return 'Average'
//     }
//     else {
//         return 'Weak'
//     }
// }
//
// console.log(checkScoreFunction("test"))     //Score must be a number
// console.log(checkScoreFunction(100))        //Score must be between 0 and 10
// console.log(checkScoreFunction(-20))        //Score must be between 0 and 10
// console.log(checkScoreFunction(4))          //Weak
// console.log(checkScoreFunction(5.1))        //Average
// console.log(checkScoreFunction(7))          //Good
// console.log(checkScoreFunction(8))          //Very Good
// console.log(checkScoreFunction(9.5))        //Excellent



