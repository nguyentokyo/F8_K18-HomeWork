// 1 Variable Declaration
const name = 'nguyen'
console.log(name)

const age = 20;
console.log(age)

const isStudent = true;
console.log(isStudent)


let a = 5;
let b = 10;
let c = a + b

a = c - a
b = c - b

console.log(a)
console.log(b)

// const / let / var
// Q :  const khác let ở điểm?
// A :  Điểm khác nhau quan trọng nhất
//      const : không thể gán lại giá trị
//      let   : có thể gán lại giá trị
//      const : không gán lại object khác, nhưng thay đổi được giá trị bên trong object
//      let   : gán lại object khác được và thay đổi được giá trị bên trong

// Q :  Khi nào nên dùng const?
// A :  khi mình ko muốn gắn lại giá trị khác cho biến thì mình dùng const
//      thường dùng const trong Hằng số , function
//      khi thực hiện phép tính Counter, vòng lặp loop, trạng thái kết quả thì ko nên dùng const

// Q :  Đoạn code sau đúng hay sai? Giải thích:
//      "const x = 10;
//      x = 20;"
// A :  Sai
//      vì khi dùng const thì giá trị của biến x không thể đc gán lại.


// Q : Xác định kiểu dữ liệu của các giá trị sau (ghi comment):
// A :  100                     --> number
//      100	                    --> number
// 	    TRUE	                --> boolean
// 	    [1, 2, 3]	            --> array
//  	{ name: "An", age: 20 }	--> object
// 	    null                    --> null
// 	    undefined               --> undefined

const students = {
    name: 'nguyen',
    age: 20,
    scores: [100, 90, 80]
}

console.log(students)


// 🟡 Phần 4: Ép kiểu (Type casting)

let x = "1000"
// console.log(typeof x)
x = Number(x)
console.log(x)

let y = 1000
y = String(y)
console.log(y)

let w = true
w = String(w)
console.log(w)

// 🟡 Phần 5: Truthy / Falsy (tư duy logic)
// Dự đoán kết quả (true / false):
// Boolean(0) --> false
// Boolean(1) --> true
// Boolean("") --> false
// Boolean("hello") --> true
// Boolean(null) --> false
// Boolean([]) --> true

// 🟡 Phần 6: Array & bộ nhớ (liên hệ sơ đồ RAM)
// Cho mảng:
//     const numbers = [4, 3, 1, 5, 1];
//     In phần tử đầu tiên
//     In phần tử cuối cùng

const numbers = [4, 3, 1, 5, 1];

let first = numbers[0]
let last = numbers[4]

console.log(first)
console.log(last)

// Vì sao khi gán: const a = numbers;
// thì a và numbers lại liên quan đến cùng một vùng nhớ?

// khi khai báo mảng numbers, mảng được lưu vào một vùng nhớ trong RAM
// khi đó biến numbers giữ địa chỉ trỏ tới vùng nhớ đó
// khi gán const a = numbers, biến a chỉ sao chép địa chỉ
// nên a và numbers cùng trỏ tới một vùng nhớ













