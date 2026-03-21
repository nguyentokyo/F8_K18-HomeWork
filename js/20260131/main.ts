import { ClassRoom } from './modules/classRooms'
import { Student } from './modules/students'


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