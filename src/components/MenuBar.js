import React, {useState} from 'react';
import styled from 'styled-components'
import { NavLink} from "react-router-dom";
import {connect} from 'react-redux';

function MenuBar(props) {

    return (
        <Wrapper>
            <Option><Link to="/dashboard" exact>Dashboard</Link></Option>
            <Option><Link to="/journal" exact>Daily Journal</Link></Option>
            <Option><Link to="/history" exact>History</Link> </Option>
            <Option><Link to="/sentiment" exact>View Sentiment</Link></Option>
            <Logout ><LogoutLink to="/" exact>{props.user.id ===""? "Home" : "Logout"}</LogoutLink></Logout>
      </Wrapper>
    )
}

const msp = state => {
    return {
        user: state.user.currentUser
    }
}

export default connect(msp)(MenuBar)


const Option = styled.div`
    cursor: pointer;
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const Wrapper = styled.div`
    display: flex;
    font-size: 16px;
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
const LogoutLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    &:visited {
        color: white;
    }
`

const Logout = styled.div`
    cursor: pointer;
    margin: 20px;
    margin-left: 5px;
    background-color: black;
    width: 130px;
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