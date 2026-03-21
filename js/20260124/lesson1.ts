// lesson 01: Interface
interface PartTime {
    id: number;
    name: string;
    salary: number;
    hoursWorked: number;
}

const partTime: PartTime = {
    id: 1,
    name: "Nguyen",
    salary: 20,
    hoursWorked: 40
}

console.log(partTime);

// shallow copy
// Use Shallow Copy (...) for simple operations, state updates, or when data is not nested.
const shallowCopyPartTime: PartTime = {
    ...partTime,
    hoursWorked: 45
}
console.log(shallowCopyPartTime);

//
// deep copy
// Use Deep Copy when dealing with multi-layered (nested) data and you require complete independence between objects.
// const deepCopyPartTime: PartTime = JSON.parse(JSON.stringify(partTime));
// deepCopyPartTime.hoursWorked = 45;
// console.log(deepCopyPartTime);













