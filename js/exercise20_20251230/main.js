// QUESTION
// Task 1: You are managing a class list.
// Follow the steps below to see how JS handles arrays in memory.
// Step 1: Create an array named classA containing the names: "An", "Binh", "Chi".
// Step 2: Create a variable named classB and assign it the value of classA (classB = classA).
// Step 3: Change the first element of classB to "An Updated".
// Step 4: Use console.log(classA) to check the original array.
// Why was the name "An" in classA changed even though you only modified classB?
// Explain using the concept of Memory Addresses (e.g., 0x01).

// ANSWER
const classA = ["An", "Binh", "Chi"];

const classB = classA;

classB[0] = "An Updated";
console.log('------------TASK 1---------------')
console.log('classA : ' , classA);
console.log('classB : ' , classB);

// When classB is assigned to classA, JS does not copy the array’s data. Instead, it copies the memory address of the array.
// As a result, both classA and classB point to the same memory location, for example 0x01.
// When the first element of classB is modified, JS updates the data stored in the array at memory address 0x01, specifically the element at index 0.
// Because both variables reference the same memory location, classA is also updated.

// メモ
// classB に classA を代入すると、JS は配列のデータ自体をコピーするのではなく、配列が格納されている メモリ上のアドレスをコピーします。
// そのため、classA と classB は同じメモリ領域（例：0x01）を参照することになります。
// classB の先頭要素を変更すると、JS はメモリ上のアドレス 0x01 に存在する配列の index 0 の要素 を更新します。
// 両方の変数が同じメモリ領域を参照しているため、classA も同様に変更されます。

//-----------------------------------------------------------------

// Task 2:
// Follow the JS code
// let x = "10";
// let y = 2;
// console.log(x + y);      // Result 1
// console.log(x - y);      // Result 2
// console.log(x * "3");    // Result 3
// console.log("Hello" - y);// Result 4
// Requirements:
//     1. Explain why the addition (+) results in "102" while the subtraction (-) results in 8.
//     2. What does the result NaN in the last calculation mean? Why did it happen?

let x = "10";
let y = 2;

console.log('------------TASK 2---------------')
// ①
console.log(x + y)
// ②
console.log(x - y)
// ③
console.log(x * "3");
// ④
console.log("Hello" - y);

// ANSWER
// In JS, the + operator can be used for both numeric addition and string concatenation.
// If one of the operands is a string, JS converts the other operand into a string and performs string concatenation.
// ①：Since x is the string "10", y is converted to the string "2"　⇒  "102".
// In contrast, the -, *, and / operators are used only for numeric operations.
// Therefore, JS converts the operands to numbers before performing the calculation.
// ②：The string "10" is converted to the number 10　⇒ 10 - 2 = 8.

// NaN stands for Not-a-Number, which means the value is not a valid number.
// In the expression "Hello" - y, the - operator requires both operands to be numbers, so JS attempts to convert "Hello" into a number.
// However, the string "Hello" cannot be converted into a valid number, so the result of the calculation is NaN.


//JS では、+ 演算子は数値の加算と文字列の連結の両方に使用されます。
// いずれか一方のオペランドが文字列の場合、JS はもう一方のオペランドを文字列に型変換し、文字列の連結を行います。
// ①：そのため、x が文字列 "10" の場合、y は文字列 "2" に変換され、結果は "102" になります。
// 一方で、-、*、/ 演算子は数値演算にのみ使用されます。
// このため、JS は演算前にオペランドを数値に型変換します。
// ②：文字列 "10" は数値 10 に変換され、10 - 2 = 8 となります。
//
// NaN は Not-a-Number の略で、数値として有効ではないことを表します。
// "Hello" - y の計算では、- 演算子は数値演算を行うため、
// JS は "Hello" を数値に型変換しようとしますが
// "Hello" 文字列は数値に変換できないため、計算結果は NaN になります。

//-----------------------------------------------------------------

// Task 3
// Write a code snippet to check if a student is eligible to join the Programming Club.
const students = [
    {
        name: "An",
        age: 9,
        isVip: false,
        mathScore: 10
    }
    ,
    {
        name: "Hoa",
        age: 9,
        isVip: true,
        mathScore: 10
    }
    ,
    {
        name: "Hai",
        age: 10,
        isVip: false,
        mathScore: 8
    }
    ,
    {
        name: "Nam",
        age: 6,
        isVip: true,
        mathScore: 7
    }
];

console.log('------------TASK 3---------------')

let canEnter = students[0].isVip === true || (students[0].age >= 10 && students[0].mathScore > 7)
console.log(students[0] , '　⇒　Check Out：' ,  canEnter)

canEnter = students[1].isVip === true || (students[1].age >= 10 && students[1].mathScore > 7)
console.log(students[1] , '　⇒　Check Out：' ,  canEnter)

canEnter = students[2].isVip === true || (students[2].age >= 10 && students[2].mathScore > 7)
console.log(students[2] , '　⇒　Check Out：' ,  canEnter)

canEnter = students[3].isVip === true || (students[3].age >= 10 && students[3].mathScore > 7)
console.log(students[3] , '　⇒　Check Out：' ,  canEnter)


// Logic Question: Is !(age < 10) mathematically the same as age >= 10?
// ANSWER : !(age < 10) === age >= 10
// !(age < 10) means not less than 10, which is equivalent to greater than 9, or 10 and above.
// age >= 10 also means 10 and above.


// Task 4:
// Objects can have "nested" data. Analyze the code below carefully.
//     const laptop = {
//     brand: "Dell",
//     price: 1000,
//     spec: { ram: "8GB", ssd: "256GB" }
// };
//
// const myLaptop = laptop;
// myLaptop.brand = "Apple";
//
// const mySpec = laptop.spec;
// mySpec.ram = "16GB";
//
// console.log(laptop.brand);
// console.log(laptop.spec.ram);
// Question: Before running the code, predict the values of laptop.brand and laptop.spec.ram. Explain why the changes made to myLaptop and mySpec affected the original laptop object.

console.log('------------TASK 4---------------')
const laptop = {
    brand: "Dell",
    price: 1000,
    spec: { ram: "8GB", ssd: "256GB" }
};

const myLaptop = laptop;
myLaptop.brand = "Apple";

const mySpec = laptop.spec;
mySpec.ram = "16GB";

console.log(laptop.brand);
console.log(laptop.spec.ram);

// ANSWER
// laptop.brand = Apple
// laptop.spec.ram = 16GB

// myLaptop and mySpec only copy the reference of the laptop object and the nested spec object, so they both point to the same memory location.
// Therefore, when myLaptop.brand or mySpec.ram is modified, the data in the original laptop object is also updated.
//
// myLaptop と mySpec は、laptop オブジェです。laptopの中にも spec オブジェクトの 参照をコピーしているだけなので、同じメモリ領域を参照しています。
// そのため、myLaptop.brand や mySpec.ram を変更すると、元の laptop オブジェクトのデータも変更されますはず。


