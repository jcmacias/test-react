import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route, Navigate
} from "react-router-dom";

import './App.css';
import Organization from './containers/Organization.js';
import Program from './containers/Program.js';
import OrganizationList from './containers/OrganizationList.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Organization />} />
          <Route path='/program' element={<Program />} />
          <Route path='/organizationList' element={<OrganizationList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
