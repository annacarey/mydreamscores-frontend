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
        zipcode: this.props.zipcode
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.signup(this.state)
        .then(user => this.props.updateJournalEntry(user.id, this.props.currentJournalEntry.id))
        .then(() => this.props.history.push("/dashboard"))
    }

    render() {
        return (
            <Form onSubmit = {this.handleSubmit}>
                <FormRow>
                    <ColumnHalf>
                        <label>Email: </label>
                        <br />
                        <input onChange={e => this.setState({email: e.target.value})} type="text" name="email" value={this.state.email} ></input>
                    </ColumnHalf>
                    <ColumnHalf>
                        <label>Phone Number: </label>
                        <br />
                        <input onChange={e => this.setState({phoneNumber: e.target.value})} type="text" name="password" value={this.state.phoneNumber} ></input>
                    </ColumnHalf>
                </FormRow>
                <FormRow>
                    <ColumnHalf>
                        <label>Password: </label>
                        <br />
                        <input onChange={e => this.setState({password: e.target.value})} type="text" name="password" value={this.state.password} ></input>
                    </ColumnHalf>
                    <ColumnHalf>
                        <label>Password Confirmation: </label>
                        <br />
                        <input onChange={e => this.setState({password: e.target.value})} type="text" name="password" value={this.state.password} ></input>
                    </ColumnHalf>
                </FormRow>
                <input className='btn' type="submit" value="Sign Up"></input>
            </Form>
        )
    }
}

const msp = state => {
    return {
        currentUser: state.user.currentUser,
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

const Form = styled.form`
	margin:0 auto;
    width: 60%;
    margin-left: 0;
    align-self: flex-start;
`
const FormRow = styled.section`
    width: 100%;
`

const ColumnHalf = styled.section`
    float: left;
	position: relative;
	width:50%;
	-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
`