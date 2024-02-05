import react from 'react'

const StudentRow = ({ id, name, email, phone }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button className='btn btn-outline-info btn-sm ml-1 mr-2'>Update</button>
                <button className='btn btn-outline-success btn-sm mr-2'>Activity</button>
                <button className='btn btn-outline-danger btn-sm mr-2'>Delete</button>
            </td>
        </tr>
    );
}

export default StudentRow