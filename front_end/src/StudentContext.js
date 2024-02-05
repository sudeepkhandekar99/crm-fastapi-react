import React, { useState, createContext, useEffect } from 'react';

export const StudentContext = createContext();

export const StudentProvider = (props) => {
    const [students, setStudents] = useState({ "data": [] });

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_all_student")
            .then(resp => resp.json())
            .then(results => {
                setStudents({ "data": [...results.response] });
            })
            .catch(error => {
                console.error("Error fetching student data:", error);
            });
    }, []); // The empty dependency array ensures that this effect runs only once.

    return (
        <StudentContext.Provider value={[students, setStudents]}>
            {props.children}
        </StudentContext.Provider>
    );
};