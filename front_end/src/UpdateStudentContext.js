import react, { createContext, useState } from 'react'

export const UpdateContext = createContext();

export const UpdateStudentContextProvider = (props) => {

    const [updateStudentInfo, setUpdateStudentInfo] = useState({
        name: "",
        email: "",
        phone: 0,
        activity_details: ""
    })

    return (
        <UpdateContext.Provider value={[updateStudentInfo, setUpdateStudentInfo]}>
            {props.children}
        </UpdateContext.Provider>
    );
}