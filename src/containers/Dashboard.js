import React from 'react';
import {connect} from 'react-redux';
import Graph from '../components/Graph.js'
import styled from 'styled-components'

class Dashboard extends React.Component {

    state = {
        loading: false,
        allJournalEntries: [],
        myJournalEntries: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/journal-entries')
        .then((res) => res.json())
        .then((allJournalEntries) => {
            this.setState({allJournalEntries})
        })

        fetch(`http://localhost:3000/users/${this.props.currentUser.id}/journal-entries`)
        .then((res) => res.json())
        .then((myJournalEntries) => {
          
            this.setState({myJournalEntries})
        })

    }

    render() { 
        return (    
            <div>
                <h1>Welcome to CoronavirusNow!</h1>
                <Wrapper>
                    <SentimentScore>{this.props.currentJournalEntry.sentiment}</SentimentScore>
                    <Graph myJournalEntries={this.state.myJournalEntries}>text</Graph>
                    <Graph2>text</Graph2>
                    <Settings>text</Settings>
                </Wrapper>
            </div>
        )
    }
}

const msp = state => {
    return {
        currentUser: state.user.currentUser,
        currentJournalEntry: state.journal.currentJournalEntry
    }
}

const Wrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly
`

const SentimentScore = styled.section`
    font-size: 100px;
    width: 50vw;
    height: 50vw;
`

const Graph2 = styled.section`
    background-color: purple;
    width: 50vw;
    height: 50vw;
`

const Settings = styled.section`
    background-color: blue;
    width: 50vw;
    height: 50vw;
`
export default connect(msp)(Dashboard)