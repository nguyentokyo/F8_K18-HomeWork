
// lesson 02 OOP
// 1. Create an interface for an employee.
// 2. Create a class for a full-time employee.
// 3. Create a class for a part-time employee.
// 4. Create a function to calculate the total salary of a list of employees.
// 5. Create a usage example.
//    Case1
//      One full-time employee.
//      One part-time employee.
//      Print the total salary
//    Case2
//      Two full-time employee.
//      Two part-time employee.
//      Print the total salary

// 1. Create an interface for an employee.
interface Employee {
    id: number;
    name: string;
    salary: number;
    getSalary(): number;
}

// 2. Create a class for a full-time employee.
class FullTimeEmployee implements Employee {
    id: number = 0;
    name: string = "";
    salary: number = 0;

    getSalary(): number {
        return this.salary
    }
}

// 3. Create a class for a part-time employee.
class PartTimeEmployee implements Employee {
    id: number = 0;
    name: string = "";
    salary: number = 0;
    hoursWorked: number = 0;

    getSalary(): number {
        return this.salary * this.hoursWorked
    }
}

// 4. Create a function to calculate the total salary of a list of employees.
function calculateTotalSalary(employees: Employee[]): number {
    let totalSalary = 0;

    for (const emp of employees) {
        totalSalary = totalSalary + emp.getSalary();
    }

    return totalSalary;
}


// 5. Create a usage example.
//    Case1
//      One full-time employee.
//      One part-time employee.
//      Print the total salary

console.log("--------Case1 Start---");
// One full-time employee.
const fullTime = new FullTimeEmployee()
fullTime.id = 1
fullTime.name = "FullTime 01"
fullTime.salary = 6000000

//  One part-time employee.
const partTime = new PartTimeEmployee()
partTime.id = 2
partTime.name = "PartTime 01"
partTime.salary = 15000
partTime.hoursWorked = 40

let employees: Employee[] = [fullTime, partTime]

let totalSalary = calculateTotalSalary(employees)

console.log(fullTime)
console.log(partTime)
console.log("totalSalary :", totalSalary)
// result
// FullTimeEmployee { id: 1, name: 'FullTime 01', salary: 6000000 }
// PartTimeEmployee { id: 2, name: 'PartTime 01', salary: 15000, hoursWorked: 40 }
// total Salary 6600000 (6000000 + (15000 * 40))

console.log("--------Case2 Start---");

// 5. Create a usage example.
//    Case2
//      Two full-time employee.
//      Two part-time employee.
//      Print the total salary

const fullTimeEmployees: Employee[] = [];
const partTimeEmployees: Employee[] = [];

const ft01 = new FullTimeEmployee()
ft01.id = 1
ft01.name = "FullTime 01"
ft01.salary = 6000000
fullTimeEmployees.push(ft01)

const ft02 = new FullTimeEmployee()
ft02.id = 2
ft02.name = "FullTime 02"
ft02.salary = 9000000
fullTimeEmployees.push(ft02)


const pt01 = new PartTimeEmployee()
pt01.id = 1
pt01.name = "PartTime 01"
pt01.salary = 30000
pt01.hoursWorked = 40
partTimeEmployees.push(pt01)

const pt02 = new PartTimeEmployee()
pt02.id = 2
pt02.name = "PartTime 02"
pt02.salary = 20000
pt02.hoursWorked = 50
partTimeEmployees.push(pt02)

const employees02: Employee[] = [...fullTimeEmployees, ...partTimeEmployees]

const totalSalary02 = calculateTotalSalary(employees02)

console.log(fullTimeEmployees)
console.log(partTimeEmployees)
console.log("totalSalary", totalSalary02)


// FullTimeEmployee { id: 1, name: 'FullTime 01', salary: 6000000 }
// FullTimeEmployee { id: 2, name: 'FullTime 02', salary: 9000000 }
// PartTimeEmployee { id: 1, name: 'PartTime 01', salary: 30000, hoursWorked: 40 }
// PartTimeEmployee { id: 2, name: 'PartTime 02', salary: 20000, hoursWorked: 50 }
// totalSalary 17200000 (6000000 + 9000000 + (30000 * 40) + (20000 * 50))