import React from 'react';
import UserContainer from './containers/UserContainer'
import styled from 'styled-components'
import {setError, getUserSuccess} from './actionCreators'
import {connect} from 'react-redux';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {

  componentDidMount() {
    const userId = localStorage.userId
    if (userId){
      console.log("got here")
      fetch("http://localhost:3000/auto-login", {
        headers: {
          "Authorization": userId
        }
      })
      .then(res => res.json())
      .then(user => {
        if (user.errors) {
          this.props.setError(user.errors)
        } else {
          console.log(user)
          this.props.login(user)
        }
      })
    }
  }

  render() {
    return (
      <Wrapper>
        <Router >
          <UserContainer />
        </Router>
      </Wrapper>
    );
  }
}

const mdp = dispatch => {
  return {
    setError: error => dispatch(setError(error)),
    login: user => dispatch(getUserSuccess(user))
  }
}
export default connect(null, mdp)(App);

const Wrapper = styled.section`
    height: 100vh;
    width: 100vw;
`