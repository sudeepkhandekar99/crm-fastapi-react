import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { StudentContext } from '../StudentContext';

function NavBar() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useContext(StudentContext);
  const [originalData, setOriginalData] = useState([]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const filterStudent = async (e) => {
    e.preventDefault();

    if (search === "") {
      // If search is empty, revert to original data
      setStudents({ "data": [...originalData] });
    } else {
      // If search is not empty, filter students
      const filteredStudents = originalData.filter(student => student.name.toLowerCase() === search.toLowerCase());
      setStudents({ "data": [...filteredStudents] });
    }

    setSearch(""); // Clear the search input
  }

  useEffect(() => {
    // Fetch and set the original data initially
    const fetchOriginalData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get_all_student");
        const results = await response.json();
        setOriginalData([...results.response]);
        setStudents({ "data": [...results.response] });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOriginalData();
  }, [setStudents]);

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link to="/addstudent" className="btn btn-outline-secondary">Add Student</Link>
          </Nav>
          <Form className="d-flex" onSubmit={filterStudent}>
            <Form.Control value={search} onChange={updateSearch} type="text" placeholder="Search" className="me-2" />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
