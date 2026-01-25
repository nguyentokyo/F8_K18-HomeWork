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

const updatePartTime: PartTime = {
    ...partTime,
    hoursWorked: 45
}

console.log(updatePartTime);

console.log("--------lesson 01 end---");











