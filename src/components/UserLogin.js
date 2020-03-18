import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import {getUserActionCreator} from '../actionCreators'

function UserLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        props.login(email, password).then(() => props.history.push("/dashboard"))
    }

    return (
        <form onSubmit = {handleSubmit}>
            <label>Email</label>
            <input onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} ></input>
            <br />
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} type="text" name="password" value={password} ></input>
            <br />
            <input type="submit" value="Login"></input>
        </form>
    )
    
}

const mdp = dispatch => {
    return {
        login: (email, password) => dispatch(getUserActionCreator(email, password))
    }
}

export default  withRouter(connect(null, mdp)(UserLogin))