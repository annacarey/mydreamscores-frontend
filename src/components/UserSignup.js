import React from 'react';
import {connect} from 'react-redux';
import {signupUserActionCreator, updateJournalEntryRequest} from '../actionCreators'
import { withRouter } from "react-router-dom";

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
            <form onSubmit = {this.handleSubmit}>
                <label>Email </label>
                <input onChange={e => this.setState({email: e.target.value})} type="text" name="email" value={this.state.email} ></input>
                <br />
                <label>Phone Number </label>
                <input onChange={e => this.setState({phoneNumber: e.target.value})} type="text" name="password" value={this.state.phoneNumber} ></input>
                <br />
                <label>Password </label>
                <input onChange={e => this.setState({password: e.target.value})} type="text" name="password" value={this.state.password} ></input>
                <br />
                <input type="submit" value="Sign Up"></input>
            </form>
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