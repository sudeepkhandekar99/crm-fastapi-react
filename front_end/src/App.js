import './App.css';
import react from 'react'
import NavBar from './component/NavBar';
import StudentsTable from './component/StudentsTable';
import { StudentProvider } from './StudentContext'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
  return (
    // <div>
    //   <Router>
    //     <NavBar />
    //     <Switch>
    //       <StudentsTable />
    //     </Switch>
    //   </Router>
    // </div>
    <div>
      <Router>
        <Switch>
          <StudentProvider>
            <NavBar />
            <div className='row'>
              <div className='col-sm-10 col-xm-12 mx-auto mt-4 mb-4'>
                <StudentsTable />
              </div>
            </div>
          </StudentProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
