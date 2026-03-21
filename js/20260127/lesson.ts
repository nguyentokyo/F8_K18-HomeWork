
// 1. Create an interface for an employee.
interface EmployeeI {
    // id: number;
    // name: string;
    // salary: number;
    // get
    getId: () => number;
    getName: () => string;
    getSalary:() => number;

    //set
    setName: (name: string) => void;
    setSalary: (salary: number) => void;

    calculateSalary(): number;
}

abstract class Employee implements EmployeeI {
    protected id: number;
    protected name: string;
    protected salary: number;

    constructor(id: number, name: string, salary: number) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSalary() {
        return this.salary;
    }
    setName(name: string) {
        this.name = name;
    }
    setSalary(salary: number) {
        if (salary < 0) throw new Error("Salary must be positive");

        this.salary = salary;
    }

    abstract calculateSalary(): number;
}

class Developer extends Employee {
    overtimeHours: number = 0;

    constructor(id: number, name: string, salary: number, overtimeHours: number) {
        super(id, name, salary);
        this.overtimeHours = overtimeHours;
    }
    calculateSalary() {
        return this.getSalary() + (this.overtimeHours * 50_000);
    }
}

class Manager extends Employee {
    teamSize: number = 0;

    constructor(id: number, name: string, salary: number, teamSize: number) {
        super(id, name, salary);
        this.teamSize = teamSize;
    }

    calculateSalary() {
        return this.getSalary() + (this.teamSize * 200_000);
    }

}

const dev1 = new Developer(1, "Nguyen dev1", 1_000_000, 20);
const dev2 = new Developer(2, "Nguyen dev2", 4_000_000, 50);
console.log(dev1.calculateSalary().toLocaleString( 'vi-VN', { style: 'currency', currency: 'VND' }));
console.log(dev2.calculateSalary().toLocaleString( 'ja-JP', { style: 'currency', currency: 'JPY' }));


const mag1 = new Manager(1, "Nguyen Manage", 1_000_000, 2);
console.log(mag1.calculateSalary());