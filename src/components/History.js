import React, {useState} from 'react';
import {connect} from 'react-redux';
import MenuBar from './MenuBar'
import styled from 'styled-components'
import { withRouter } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import JournalEntry from '../components/JournalEntry'

function History(props) {
    // const journalEntrySample = {id: 839, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Maecenas volutpat blandit aliquam etiam erat. Mi tempus imperdiet nulla malesuada. Non arcu risus quis varius quam quisque id. Nisi lacus sed viverra tellus in. Massa vitae tortor condimentum lacinia quis. Ultricies lacus sed turpis tincidunt id aliquet risus. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Semper viverra nam libero justo laoreet sit amet. Sed vulputate odio ut enim blandit volutpat. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Amet consectetur adipiscing elit ut aliquam purus. Porttitor rhoncus dolor purus non enim praesent elementum. Diam maecenas sed enim ut sem viverra. Sagittis vitae et leo duis ut diam quam nulla. Risus ultricies tristique nulla aliquet. Ut pharetra sit amet aliquam. Eu augue ut lectus arcu bibendum at varius vel.",
    // zipcode: "10002", sentiment: 0.9753111163954107, magnitude: 0.6765265172856982, journal_id: 184, created_at: "2020-04-05T13:12:06.000Z", updated_at: "2020-03-16T13:12:06.000Z"}

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
        myJournalEntries: state.journal.myJournalEntries
    }
}

const mdp = dispatch => {
    return {
        // addJournalEntry: (content, zipcode, user) => dispatch(addJournalEntryActionCreator(content, zipcode, user))
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
`

export default withRouter(connect(msp, mdp)(History))