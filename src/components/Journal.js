import React, {useState} from 'react';
import Timer from 'react-compound-timer'
import {addJournalEntryActionCreator} from '../actionCreators'
import {connect} from 'react-redux';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";

function Journal(props) {

    const [timer, setTimer] = useState(3000);

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.elements[0].value
        props.addJournalEntry(content, props.zipcode, props.currentUser).then(() => {
            props.currentUser.id ? props.history.push("/dashboard") : props.history.push("/sentiment")
        })
    }

    return (
        <div className="journal">
            <div className="timer">
                <p>Time Remaining: </p>  
                <Timer 
                initialTime={timer}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () => {
                            setTimer(0)
                        },
                    },
                ]}>
                {() => (
                    <React.Fragment>
                        <Timer.Minutes /> minutes
                        <Timer.Seconds /> seconds
                    </React.Fragment>
                )}
                </Timer>
            </div>
            <h3>Write for two minutes about how you are feeling today?</h3>
            <form onSubmit={handleSubmit}>
                <textarea 
                    rows={20}
                    cols={100}
                    disabled={timer===0}
                />
                <br></br>
                {timer===0? <SubmitOn type="submit" disabled={false} value="View Sentiment Score" /> : <SubmitOff type="submit" disabled={true} value="View Sentiment Score" />}
            </form>
        </div>
    )
    
}

const msp = state => {
    return {
        currentUser: state.user.currentUser,
        loading: state.journal.loading
    }
}

const mdp = dispatch => {
    return {
        addJournalEntry: (content, zipcode, user) => dispatch(addJournalEntryActionCreator(content, zipcode, user))
    }
}

const SubmitOff = styled.input`
        pointer-events: none;
        cursor: wait;
        background: #D3D3D3;
        color: #A9A9A9
    `
const SubmitOn = styled.input`
    pointer-events: auto;
    cursor: pointer;
    background: "white";
    color: "black"
`

export default withRouter(connect(msp, mdp)(Journal))