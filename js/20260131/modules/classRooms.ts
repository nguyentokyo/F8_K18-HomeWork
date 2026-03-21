import { StudentI  } from './students'

interface ClassRoomI {
    addStudent(student: StudentI): void;
    removeStudent(studentId: number ): void;
    notify(message: string): void;
    postAnnouncement(message: string): void;
}


export class ClassRoom implements ClassRoomI {
    protected name: string;
    protected students: StudentI[] = [];

    constructor(name: string) {
        this.name = name;
    }

    getStudents(): StudentI[] {
        return this.students;
    }

    addStudent(student: StudentI): void {
        this.students.push(student);
    }

    removeStudent(studentID: number): void {
        const currentStudents = this.getStudents();
        // @ts-ignore
        const index = currentStudents.findIndex(student => student.getId() === studentID);
        if (index === -1) {
            throw new Error("Student not found");
        }

        currentStudents.splice(index, 1);
        this.students = currentStudents;
    }

    notify(message: string): void {
        const currentStudents = this.getStudents();
        currentStudents.forEach(student => student.updateMessage(message));
    }

    postAnnouncement(message: string): void {
        this.notify(message)
    }
}
