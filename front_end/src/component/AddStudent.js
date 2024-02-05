import react, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

const AddStudent = () => {

    const [studentInfo, setStudentInfo] = useState(
        {
            name: "",
            email: "",
            phone: "", 
            activity: ""
        }
    )

    const updateForm = (e) => {
        setStudentInfo(
            { ...studentInfo, [e.target.name]: e.target.value }
        )
    }

    const postData = async (e) => {
        e.preventDefault();
        console.log(studentInfo)

        const url = "http://localhost:8000/add_student/" + studentInfo['activity']

        const response = await fetch(
            url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "name": studentInfo['name'],
                "email": studentInfo['email'],
                "phone": studentInfo['phone']
            })
        });
        response.json().then(response => {
            if (response.status === 'success') {
                alert("Student added successfully")
            } else {
                alert("Failed to add student")
            }
        });
        setStudentInfo({
            name: "",
            email: "",
            phone: "",
            activity: ""
        });
    }


    return (
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId='Name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            value={studentInfo.name}
                            onChange={updateForm}
                            placeholder='Student Name'
                        />
                    </Form.Group>

                    <Form.Group controlId='Email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            name='email'
                            value={studentInfo.email}
                            onChange={updateForm}
                            placeholder='Email'
                        />
                    </Form.Group>

                    <Form.Group controlId='Phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='number'
                            name='phone'
                            value={studentInfo.phone}
                            onChange={updateForm}
                            placeholder='Phone Number'
                        />
                    </Form.Group>

                    <Form.Group controlId='Activity'>
                        <Form.Label>Activity</Form.Label>
                        <Form.Control
                            type='text'
                            name='activity'
                            value={studentInfo.activity}
                            onChange={updateForm}
                            placeholder='Activity'
                        />
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddStudent

