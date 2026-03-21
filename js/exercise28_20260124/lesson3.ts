console.log("-----------This in function----------------")

function printName() {
    console.log(`Tôi là ${this.ten}`)
}

function F1(name : any, printFn : any = printName) {
    this.ten = name
    this.printName = printFn
}

const f1 = new F1("Cuong", printName)
f1.printName()

console.log("-----------This in class----------------")

class F2 {
    ten : string

    printNameClass() {
        console.log(`Tôi là ${this.ten}`)
    }
}

const f2 = new F2()
f2.ten = "Nguyen"
f2.printNameClass()