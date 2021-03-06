import React from 'react';
import {connect} from 'react-redux';
import {signupUserActionCreator, updateJournalEntryRequest} from '../actionCreators'
import { withRouter } from "react-router-dom";
import styled from 'styled-components'

class UserSignup extends React.Component {

    state = {
        email: "",
        phoneNumber: "",
        password: "",
        region: this.props.user.region,
        passwordConfirmation: "",
        okToContact: false,
        zipcode: this.props.user.zipcode
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.signup(this.state)
        .then(response => {
            if (!response.error) {
                this.props.updateJournalEntry(response.user.id, this.props.currentJournalEntry.id)
                localStorage.token = response.token
            }}) 
        .then(() => {
            if (this.props.user.id !=="") {
                this.props.history.push("/dashboard", {sentiment: this.props.sentiment})
            }
        })
    }

    render() {

        return (
            <Form autocomplete = "off" onSubmit = {this.handleSubmit}>
                <input autocomplete="false" name="hidden" type="text" style={{display: "none"}}/>
                <Input autocomplete="off" placeholder="Email..." onChange={e => this.setState({email: e.target.value})} type="text" name="email" value={this.state.email} />
                <Input autocomplete="off" placeholder="Phone Number..." onChange={e => this.setState({phoneNumber: e.target.value})} type="text"  value={this.state.phoneNumber} />
                <Input autocomplete="off" placeholder="Password..." onChange={e => this.setState({password: e.target.value})} type="password" name="password" value={this.state.password} />
                <Input autocomplete="off" placeholder="Confirm Password..." onChange={e => this.setState({passwordConfirmation: e.target.value})} type="password" name="password" value={this.state.passwordConfirmation} />
                {this.props.error && this.props.error.length > 1? this.props.error.map(error=><P>{error}</P>) : <P>{this.props.error}</P>}
                <Checkbox>
                    <label><input onChange={e => this.setState({okToContact: e.target.checked})} type="checkbox" id="contactOptIn"></input>Opt in to receive SMS and email reminders.</label>
                </Checkbox>
                <Signup type="submit" value="Sign Up"></Signup>
            </Form>
        )
    }
}

const msp = state => {
    return {
        user: state.user.currentUser,
        error: state.user.error,
        currentJournalEntry: state.journal.currentJournalEntry
    }
}

const mdp = dispatch => {
    return {
        signup: (userInfo) => dispatch(signupUserActionCreator(userInfo)),
        updateJournalEntry: (userId, journalEntryId) => dispatch(updateJournalEntryRequest(userId, journalEntryId))
    }
}

export default  withRouter(connect(msp, mdp)(UserSignup))

const P = styled.p`
    color: red;
    margin: 0;
`

const Input = styled.input`
    width: 40%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    &:focus {
        outline: none;
    }
`

const Signup = styled.input`
    width: 30%;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`
const Form = styled.form`
    margin-top: 20px;
    width: 100%;
`
const Checkbox = styled.div`
    width: 100%;
    padding: 10px 10px 10px 0px;
`