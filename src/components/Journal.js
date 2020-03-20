import React, {useState} from 'react';
import Timer from 'react-compound-timer'
import {addJournalEntryActionCreator} from '../actionCreators'
import {connect} from 'react-redux';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";

function Journal(props) {

    const [timer, setTimer] = useState(30000);

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.elements[0].value
        props.addJournalEntry(content, props.zipcode, props.currentUser).then(() => {
            props.currentUser.id ? props.history.push("/dashboard") : props.history.push("/sentiment")
        })
    }

    return (
        <Wrapper>
            <div className="timer">
                Time Remaining:
                <br></br>
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
                        <Timer.Minutes /> :   
                        <Timer.Seconds /> 
                    </React.Fragment>
                )}
                </Timer>
            </div>
            <h3>Write for two minutes about how you're feeling today...</h3>
            <form onSubmit={handleSubmit}>
                <TextArea 
                    rows={20}
                    disabled={timer===0}
                />
                <br></br>
                {timer===0? <SubmitOn type="submit" className ='btn' disabled={false} value="View Sentiment Score" /> : <SubmitOff type="submit" className='btn' disabled={true} value="View Sentiment Score" />}
            </form>
        </Wrapper>
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
    border-radius: 5px;
    `
const SubmitOn = styled.input`
    pointer-events: auto;
    cursor: pointer;
    background: "white";
    color: "black"
    border-radius: 5px;
`

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const TextArea = styled.textarea`
    border-radius: 5px;
    padding: 5px;
    font-size: 20px;
    width: 80%
`

export default withRouter(connect(msp, mdp)(Journal))