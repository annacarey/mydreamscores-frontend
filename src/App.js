import React from 'react';
import UserContainer from './containers/UserContainer'
import styled from 'styled-components'

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Wrapper>
      <Router>
        <UserContainer />
      </Router>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
    height: 100%;
    width: 100%;
`