import React, {useState} from 'react';
import {connect} from 'react-redux';
import MenuBar from './MenuBar'
import styled from 'styled-components'
import { withRouter } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import JournalEntry from '../components/JournalEntry'
import { useEffect } from 'react';
import {getMyJournalEntriesActionCreator} from '../actionCreators'



function History(props) {

    useEffect(() => {
        props.getMyJournalEntries(props.user.id)
    }, [props.user.id]);

    return (
        <Wrapper>
            <MenuBar />
            <Header>My Journal Entries</Header>
            <Divider style={{marginLeft: "30px", marginRight: "15%"}}/>
            {/* <JournalEntry journalEntry={journalEntrySample}></JournalEntry> */}
            {props.myJournalEntries.map(journalEntry => {
                return <JournalEntry key={journalEntry.id} journalEntry={journalEntry} />
            })}
        </Wrapper>
    )
    
}

const msp = state => {
    return {
        myJournalEntries: state.journal.myJournalEntries,
        user: state.user.currentUser
    }
}

const mdp = dispatch =>{
    return {
        getMyJournalEntries: userId => dispatch(getMyJournalEntriesActionCreator(userId))
    }
}

const Header = styled.h1`
    font-size: 30px;
    padding: 0 20px 0 30px;
    margin: 20 0 20 0;
`

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: #F3F3F3;
    min-height: 100%;
`

export default withRouter(connect(msp, mdp)(History))