import React from 'react';
import {connect} from 'react-redux';
import UserSignup from '../components/UserSignup'
import {Link} from 'react-router-dom'

function SentimentView(props) {
    return (
        <div>
            <p>Your Sentiment Score is <strong>{props.currentJournalEntry.sentiment}</strong>.</p>
            <p>This means x, y, z.</p>
            <p>Our tool is most helpful when you can track your sentiment over time. To return and journal again, sign up for an account below:</p>
            <UserSignup zipcode={props.zipcode}/>
            <br/>
            <p>Skip for now and view triends <Link to="/trends">>></Link></p>
        </div>
    )
    
}

const msp = state => {
    return {
        currentJournalEntry: state.journal.currentJournalEntry,
        user: state.user.currentUser
    }
}

export default connect(msp)(SentimentView)