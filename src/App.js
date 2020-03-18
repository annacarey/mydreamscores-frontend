import React from 'react';
import UserContainer from './containers/UserContainer'

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <UserContainer />
      </Router>
    </div>
  );
}

export default App;
