import React from 'react';
import Timer from 'react-compound-timer'
import {connect} from 'react-redux';
import styled from 'styled-components'
import {timesUpActionCreator, updateCurrentJournalEntry} from '../actionCreators'

class Journal extends React.Component {

    state = {
        journalEntry: ""
    }

    handleChange = (e) => {
        const newEntry = e.target.value
        this.setState(() => {return {journalEntry: newEntry}})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        updateCurrentJournalEntry(e.target.elements[0].value)
    }

    render() {
        return (
            
            <div className="journal">
                <div className="timer">
                    <p>Time Remaining: </p>  
                    <Timer 
                    initialTime={4000}
                    direction="backward"
                    checkpoints={[
                        {
                            time: 0,
                            callback: () => {
                                this.props.setTimesUp()
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
                <form onSubmit={this.handleSubmit}>
                    <textarea 
                        rows={20}
                        cols={100}
                        onChange={this.handleChange}
                        value={this.state.journalEntry}
                        disabled={this.props.timesUp? true : false}
                    />
                    <br></br>
                    {this.props.timesUp? <SubmitOn type="submit" disabled={false} value="Submit" /> : <SubmitOff type="submit" disabled={true} value="Submit" />}
                </form>
            </div>
        )
    }
}

const msp = state => {
    return {
        timesUp: state.journal.timesUp
    }
}

const mdp = dispatch => {
  return {
      setTimesUp: () => dispatch(timesUpActionCreator()),
      setUpdateJournalEntry: (content) => dispatch(updateCurrentJournalEntry(content))
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

export default connect(msp, mdp)(Journal)