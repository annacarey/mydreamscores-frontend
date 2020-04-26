import React, {useState} from 'react';
import styled from 'styled-components'
import {NavLink, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutUser} from '../actionCreators'


function MenuBar(props) {

    const handleClick = () => {
        props.logout()
        props.history.push('/')
    }

    return (
        <Wrapper>
            <Option><Link to="/dashboard" exact>Dashboard</Link></Option>
            <Option><Link to="/journal" exact>Daily Journal</Link></Option>
            {props.user.id !== "" && <Option><Link to="/history" exact>History</Link> </Option>}
            <Option><Link to="/mood" exact>{props.user.id ===""? "Sign Up" : "View Mood"}</Link></Option>
            <Logout ><LogoutLink onClick ={handleClick}>{props.user.id ===""? "Home" : "Logout"}</LogoutLink></Logout>
      </Wrapper>
    )
}

const msp = state => {
    return {
        user: state.user.currentUser
    }
}


const mdp = dispatch =>{
    return {
        logout: () => dispatch(logoutUser())
    }
}

export default withRouter(connect(msp, mdp)(MenuBar))

const Option = styled.div`
    cursor: pointer;
    padding: 8px;
    padding-left: 5px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Wrapper = styled.div`
    display: flex;
    font-size: 12px;
    justify-content: flex-end;
`

const Link = styled(NavLink)`
    color: black;
    padding: 0px;
    text-decoration: none;
    &:visited {
        color: black;
    }
    &:hover {
        color: #A9A9A9;
    }
`
const LogoutLink = styled.button`
    color: white;
    text-decoration: none;
    width: 100%;
    font-size: 12px;
    text-align: center;
    border-radius: 0px;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    &:visited {
        color: white;
    }
`

// padding: 5px;
// width: 100px;
// border-radius: 10px;
// border-style: none;
// font-size: 16px;
// margin: 10px 10px 0 0px;
// background-color: black;
// color: white;
// cursor: pointer;

const Logout = styled.div`
    cursor: pointer;
    margin: 20px;
    margin-left: 5px;
    background-color: black;
    width: 100px;
    border-radius: 20px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`

// const HistoryButton = styled.button`
//     padding: 10px;
//     font-size: 16px;
//     margin: 10px 10px 10px 0px;
//     color: black;
//     background-color: white;
//     border-style: none;
//     cursor: pointer;
//     &:focus {
//         outline: none;
//     }
// `