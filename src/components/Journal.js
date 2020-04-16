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
        const zipcode = props.currentUser.id !== ""? props.currentUser.zipcode : props.zipcode
        props.addJournalEntry(content, zipcode, props.currentUser).then(() => {
            console.log("in journal before push")
            props.currentUser.id ? props.history.push({pathname: "/sentiment", state: { return: true }}) : props.history.push({pathname: "/sentiment", state: { return: false}})
        })
    }

    return (
        <Wrapper loading={props.loading}>
            <FormWrapper>
                <TimerBlock><strong>Time Remaining:</strong> &ensp;
                                <div style={{color:'grey'}}>
                                <strong>
                                <Timer 
                                initialTime={timer}
                                formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
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
                                    <React.Fragment >
                                        <Timer.Minutes />:   
                                        <Timer.Seconds /> 
                                    </React.Fragment>
                                )}
                                </Timer> 
                                </strong>
                                </div>
                    </TimerBlock>
                <Form onSubmit={handleSubmit}>
                
                    <Header>Write for two minutes about how you're feeling today...</Header>
                    <TextArea 
                        rows={20}
                        disabled={timer===0}
                        loading={props.loading? 1 : undefined}
                    />
                    <br></br>
                    {timer===0? <SubmitOn type="submit" className ='btn' disabled={false} value="View Sentiment Score" /> : <SubmitOff type="submit" className='btn' disabled={true} value="View Sentiment Score" />}
                </Form>
            </FormWrapper>
        </Wrapper>
    )
    
}

const msp = state => {
    return {
        currentUser: state.user.currentUser,
        region: state.user.region,
        loading: state.journal.loading
    }
}

const mdp = dispatch => {
    return {
        addJournalEntry: (content, zipcode, user) => dispatch(addJournalEntryActionCreator(content, zipcode, user))
    }
}

const TimerBlock = styled.div` 
    margin: 0;
    padding-bottom: 60px;
    padding-top: 20px;
    font-size: 30px;
    display: flex;
`

const Header = styled.h1`
    font-size: 20px;
    margin: 0;
    padding-top: 20px;
    padding-bottom: 20px;
`

const SubmitOff = styled.input`
    pointer-events: none;
    cursor: wait;
    background: #D3D3D3;
    color: #A9A9A9;
    font-size: 16px;
    border-radius: 10px;
    margin: 10px 10px 10px 0px;
    width: 250px;
    `

const SubmitOn = styled.input`
    pointer-events: auto;
    cursor: pointer;
    font-size: 16px;
    background-color: black;
    margin: 10px 10px 10px 0px;
    color: white;
    border-radius: 10px;
    width: 250px;
    &:focus {
        outline: none;
    }
`

const Form = styled.form` 
    justify-content: center;

`

const FormWrapper = styled.div`
    width: 60vw;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Wrapper = styled.section`
    cursor: ${props => props.loading? 'wait' : 'default'};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    height: 100vh;
    width: 100vw;
    background-color: #F3F3F3;
`

const TextArea = styled.textarea`
    cursor: ${props => props.loading? 'wait' : 'default'};
    border-style: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    width: 100%;
    &:focus {
        outline: none;
    }
`

export default withRouter(connect(msp, mdp)(Journal))