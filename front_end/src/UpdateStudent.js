import react, { useContext, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { UpdateContext } from './UpdateStudentContext'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { StudentContext } from './StudentContext';


const UpdateStudent = () => {
    const [updateStudentInfo, setUpdateStudentInfo] = useContext(UpdateContext)

    const updateForm = (e) => {
        setUpdateStudentInfo({ ...updateStudentInfo, [e.target.name]: e.target.value });
    };

    console.log("updateStudentInfo.id")
    console.log(updateStudentInfo)
    console.log("http://localhost:8000/update_student/" + updateStudentInfo['id'])

    const postData = async (e) => {
        e.preventDefault()

        const url = "http://localhost:8000/update_student/" + updateStudentInfo['id']

        const response = await fetch(url, {
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: updateStudentInfo['name'],
                phone: updateStudentInfo['phone'],
                email: updateStudentInfo["email"],
                activity_details: updateStudentInfo['activity_details']
            })
        })

        response.json().then(resp => {
            if (resp.status === 'success') {
                alert("Student updated");
            }
            else {
                alert("Failed to update student")
            }
        })

        setUpdateStudentInfo({
            name: "",
            phone: "",
            email: "",
            activity_details: ""
        })
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={postData}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            value={updateStudentInfo.name}
                            onChange={updateForm}
                            placeholder='Name'
                        />
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='number'
                            name='phone'
                            value={updateStudentInfo.phone}
                            onChange={updateForm}
                            placeholder='Phone'
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            name='email'
                            value={updateStudentInfo.email}
                            onChange={updateForm}
                            placeholder='Email'
                        />
                    </Form.Group>

                    <Form.Group controlId='activity_details'>
                        <Form.Label>Activity</Form.Label>
                        <Form.Control
                            type='text'
                            name='activity_details'
                            value={updateStudentInfo.activity_details}
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
    )
}

export default UpdateStudent