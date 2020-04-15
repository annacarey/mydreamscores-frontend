import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import styled from 'styled-components'
import {getUserActionCreator} from '../actionCreators'

function UserLogin(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        props.login(email, password).then((user) => {
            if (!user.error) {
                props.history.push('/dashboard')
            }
        })
    }

    return (
        <Wrapper>
            <Form onSubmit = {handleSubmit}>
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} ></Input>
                <br />
                <Input placeholder="Password" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password} ></Input>
                <br />
                {props.error}
                <Signup type="submit" value="Login"></Signup>
            </Form>
            
        </Wrapper>
    )
}

const msp = state => {
    return {
        error: state.user.error,
        user: state.usercurrentUser
    }
}

const mdp = dispatch => {
    return {
        login: (email, password) => dispatch(getUserActionCreator(email, password))
    }
}

export default  withRouter(connect(msp, mdp)(UserLogin))

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F3F3F3;
`

const Form = styled.form`
    width: 250px;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 16px;
    margin: 10px 10px 10px 0px;
    &:focus {
        outline: none;
    }
`

const Signup = styled.input`
    width: 60%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 16px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`