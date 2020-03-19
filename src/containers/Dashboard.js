import React from 'react';
import {connect} from 'react-redux';
import Graph from '../components/Graph'
import SentimentGraph from '../components/SentimentGraph'
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

        if (this.props.currentUser.id !== "") {
            fetch(`http://localhost:3000/users/${this.props.currentUser.id}/journal-entries`)
            .then((res) => res.json())
            .then((myJournalEntries) => { 
                this.setState({myJournalEntries})
            })
        }   
    }


    render() { 
        return (    
            <div>
                <ButtonWrapper>
                    {this.props.currentUser.id !== "" && <Button>My Sentiment Data</Button>}
                    <Button>Global Sentiment Data</Button>
                    <Button>Coronavirus Stats</Button>
                </ButtonWrapper>

                <Wrapper>
                    <Graph allJournalEntries={this.state.allJournalEntries} myJournalEntries={this.state.myJournalEntries}>text</Graph>
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

    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly
`

const ButtonWrapper = styled.section`
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center
`
const Button = styled.button`
    border-radius: 4px;
    background-color: #4F3E4D;
    color: white;
    padding: 10px;
    margin: 2px;
    &:hover {
        background-color: white;
        color: #4F3E4D;
    }
`

export default connect(msp)(Dashboard)


//Things for NavBar
//Logout
//Redo journal
//Toggles

// color palette: https://coolors.co/88498f-4d9ca0-ede9e3-ff6542-4f3e4d