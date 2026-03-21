// Lesson 4: Movie Ticket Price Calculation
// A cinema has a base ticket price of 100k.
//     If it's a child (under 13 years old), the ticket price is reduced by 50%.
// Otherwise, the price remains 100k.
//
//     Requirement: Use the ternary operator to assign the value to the ticketPrice variable.

// ANSWER
const baseTicketPrice = 100;
const discount = 0.5;

const getTicketPrice = (age) => {
    if (typeof age !== 'number') {
        return 'Not a age'
    }
    else if (age < 0) {
        return 'Age must be positive'
    }
    else  {
        return  age < 13 ? `${baseTicketPrice * discount}k` : `${baseTicketPrice}k`;
    }
}

console.log(getTicketPrice("20"));     //Not a age ⇒ OK
console.log(getTicketPrice(-12));     //Age must be positive ⇒ OK
console.log(getTicketPrice(10));     //50k ⇒ OK
console.log(getTicketPrice(20));     //100k ⇒ OK
