import './App.css';
import react from 'react'
import NavBar from './component/NavBar';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <NavBar />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
