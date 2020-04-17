import React, {useState} from 'react';
import styled from 'styled-components'
import { NavLink} from "react-router-dom";

function MenuBar(props) {

    const repeat = props.return

    return (
        <Wrapper>
            <Option><Link to="/dashboard" exact>Dashboard</Link></Option>
            <Option><Link to="/journal" exact>Daily Journal</Link></Option>
            <Option><Link to="/history" exact>History</Link> </Option>
            <Option><Link to="/sentiment" exact>View Sentiment</Link></Option>
            <Option><Link to="/" exact>Logout</Link></Option>
      </Wrapper>
    )
    
}

export default MenuBar


const Option = styled.div`
    cursor: pointer;
    margin: 20px;
`
const Wrapper = styled.div`
    display: flex;
    font-size: 16px;
    justify-content: flex-end;
`

const Link = styled(NavLink)`
    color: black;
    text-decoration: none;
    &:visited {
        color: black;
        
    }
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