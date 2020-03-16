import React from 'react';
import {connect} from 'react-redux';

function Dashboard(props) {
    return (    
        <div>
            <p>Dashboard</p>
            <p>{props.currentUser && props.currentUser.email}</p>
        </div>
        
    )
}

const msp = (state) => {
    console.log(state)
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(msp)(Dashboard)