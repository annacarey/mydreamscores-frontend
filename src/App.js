import React from 'react';
import UserContainer from './containers/UserContainer'
import Welcome from './components/Welcome'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <UserContainer />
        <Route exact path ="/" component={Welcome}></Route>
      </Router>
    </div>
  );
}

export default App;
