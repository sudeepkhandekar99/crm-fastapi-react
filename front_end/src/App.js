import './App.css';
import react from 'react'
import NavBar from './component/NavBar';
import ProductsTable from './component/ProductsTable';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <ProductsTable />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
