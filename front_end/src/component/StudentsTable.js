import React, { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { StudentContext } from '../StudentContext';
import StudentRow from './Studentsrow'

const StudentsTable = () => {
    const [students, setStudents] = useContext(StudentContext);

    useEffect(() => {
        // Check if students.data is already populated
        if (students.data.length === 0) {
            fetch("http://localhost:8000/get_all_student")
                .then(resp => resp.json())
                .then(results => {
                    console.log(results);
                    setStudents({ "data": [...results.response] });
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [setStudents, students.data]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {students.data.map(students => (
                        <StudentRow
                            id = {students.id}
                            name = {students.name}
                            email = {students.email}
                            phone = {students.phone}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StudentsTable;
