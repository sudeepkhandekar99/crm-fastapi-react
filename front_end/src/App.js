import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/NavBar';
import StudentsTable from './component/StudentsTable';
import { StudentProvider } from './StudentContext';
import AddStudent from './component/AddStudent';
import UpdateStudent from './UpdateStudent';
import { UpdateStudentContextProvider } from './UpdateStudentContext';

function App() {
  return (
    <div>
      <Router>
        <StudentProvider>
          <NavBar />
          <div className='row'>
            <div className='col-sm-10 col-xm-12 mx-auto mt-4 mb-4'>
              <UpdateStudentContextProvider>
                <Switch>
                  <Route exact path="/" component={StudentsTable} />
                  <Route exact path="/updateStudent" component={UpdateStudent} />
                  <Route exact path="/addstudent" component={AddStudent} />
                </Switch>
              </UpdateStudentContextProvider>
            </div>
          </div>
        </StudentProvider>
      </Router>
    </div>
  );
}

export default App;
