import React, { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { StudentContext } from '../StudentContext';
import StudentRow from './StudentsRow'

const StudentsTable = () => {
    const [students, setStudents] = useContext(StudentContext);

    const handleDelete = (id) => {
        fetch("http://127.0.0.1:8000/delete_student/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(result => {
            setStudents(prevStudents => {
                if (result.status === "success") {
                    const filteredStudents = prevStudents.data.filter((student) => student.id !== id);
                    return { "data": [...filteredStudents] };
                } else {
                    alert("Product deletion failed");
                    return prevStudents; // Return the unchanged state
                }
            });
    
            alert("Product deleted");
        })
        .catch(error => {
            console.error("Error deleting product:", error);
        });
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_all_student")
            .then(resp => {
                return resp.json();
            }).then(results => {
                setStudents({ "data": [...results.response] })
            })
    }, [])

    console.log(students.data)

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.data.map(students => (
                        <StudentRow
                            key={students.id}
                            id={students.id}
                            name={students.name}
                            email={students.email}
                            phone={students.phone}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StudentsTable;
