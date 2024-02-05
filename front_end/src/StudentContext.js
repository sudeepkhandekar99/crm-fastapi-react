import react, { useState, createContext } from 'react'

export const StudentContext = createContext();


export const StudentProvider = (props) => {
    const [students, setStudents] = useState({ "data": [] });

    return (
        <StudentContext.Provider value={[students, setStudents]}>
            {props.children}
        </StudentContext.Provider>
    );
}