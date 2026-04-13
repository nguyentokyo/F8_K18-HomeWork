import { useState } from 'react'

function Table() {

    const headers = [
        {
            value: 'id',
            text: 'ID',
            style: {
                textAlign: 'center'
            }
        },
        {
            value: 'name',
            text: 'Ten',
            style: {
                color: 'red'
            }
        },
        {
            value: 'age',
            text: 'Tuoi'
        },
        {
            value: 'class',
            text: 'Lop'
        },
        {
            value: 'address',
            text: 'Dia Chi'
        },
        {
            value: 'action',
            text: ''
        }
    ]

    const students = [
        { id: 1, name: "Nguyen Van A", age: 15, class: "10A1", address: "Ha Noi" },
        { id: 2, name: "Tran Thi B", age: 16, class: "10A2", address: "Hai Phong" },
        { id: 3, name: "Le Van C", age: 15, class: "10A1", address: "Da Nang" },
        { id: 4, name: "Pham Thi D", age: 17, class: "11A1", address: "Ha Noi" },
        { id: 5, name: "Hoang Van E", age: 16, class: "10A3", address: "Nam Dinh" },
        { id: 6, name: "Do Thi F", age: 15, class: "10A2", address: "Thai Binh" },
        { id: 7, name: "Bui Van G", age: 17, class: "11A2", address: "Hai Duong" },
        { id: 8, name: "Vu Thi H", age: 16, class: "10A3", address: "Ha Noi" },
        { id: 9, name: "Dang Van I", age: 15, class: "10A1", address: "Bac Ninh" },
        { id: 10, name: "Ngo Thi K", age: 17, class: "11A1", address: "Ha Nam" }
    ];

    const [studentList, setStudentList] = useState(students);

    const renderHeader = () => {
        return  headers.map((item, index) => (
           <th key={index}>{item.text}</th>
        ))
    }

    const renderBody = () => {
        return  studentList.map((student, index) => (
            <tr key={index}>
                {
                    headers.map((header, index) => {
                        if (header.value === 'action') {
                            return (
                                <td key={index}>
                                    <button onClick={() => onEdit(student.id)}>Edit</button>
                                    <button onClick={() => onDelete(student.id)}>Delete</button>
                                </td>
                            )
                        }

                        return (
                            <td key={index} style={header.style}>
                                {student[header.value]}
                            </td>
                        )
                    })
                }
            </tr>
        ))
    }

    const onEdit = (id) => {
        // console.log(id)
        const newName = prompt("input new name");
        const newClass = prompt("input new class");

        if (!newName && !newClass) return;

        const newList = studentList.map(student => {
            if (student.id === id) {
                return { ...student, name: newName, class: newClass };
            }
            return student;
        });

        setStudentList(newList);
        console.log(students);
    }

    const onDelete = (id) => {
        // console.log('delete',id)
        const newStudentList = studentList.filter(s => s.id !== id);
        setStudentList(newStudentList);
        console.log(newStudentList);
    }

    return (
        <>
            <table width='100%' cellPadding={0} cellSpacing={0} border={1}>
                <thead>
                    <tr>
                        { renderHeader() }
                    </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}

export default Table

