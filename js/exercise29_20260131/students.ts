import { ClassRoom } from "./modules/classRooms";

export interface StudentI {
    getId(): number;
    getName(): string;
    setName(name: string): void;
    updateMessage(message: string): void;
}

class Student implements StudentI {
    protected id: number;
    protected name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id;
    }
    getName(): string {
        return this.name;
    }

    setName(name: string): string {
        return this.name = name
    }

    updateMessage(message: string): void {
        console.log(`Student ${this.name} : ${message}`);
    }
}

//
// interface ClassRoomI {
//     addStudent(student: StudentI): void;
//     removeStudent(studentId: number ): void;
//     notify(message: string): void;
//     postAnnouncement(message: string): void;
// }
//
//
// class ClassRoom implements ClassRoomI {
//     protected name: string;
//     protected students: StudentI[] = [];
//
//     constructor(name: string) {
//         this.name = name;
//     }
//
//     getStudents(): StudentI[] {
//         return this.students;
//     }
//
//     addStudent(student: StudentI): void {
//         this.students.push(student);
//     }
//
//     removeStudent(studentID: number): void {
//         const currentStudents = this.getStudents();
//         // @ts-ignore
//         const index = currentStudents.findIndex(student => student.getId() === studentID);
//         if (index === -1) {
//             throw new Error("Student not found");
//         }
//
//         currentStudents.splice(index, 1);
//         this.students = currentStudents;
//     }
//
//     notify(message: string): void {
//         const currentStudents = this.getStudents();
//         currentStudents.forEach(student => student.updateMessage(message));
//     }
//
//     postAnnouncement(message: string): void {
//         this.notify(message)
//     }
// }

const jsClass = new ClassRoom("Lớp JS Cơ Bản");
// console.log(jsClass);
const st1 = new Student(1, "An");
const st2 = new Student(2, "Bình");
const st3 = new Student(3, "Chi");

jsClass.addStudent(st1)
jsClass.addStudent(st2)
jsClass.addStudent(st3)
// console.log(jsClass.getStudents());
jsClass.postAnnouncement("Mai kiểm tra OOP!");