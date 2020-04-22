import React, {useState} from 'react';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";
import moment from 'moment'
import ClampLines from 'react-clamp-lines';
import {coolColor, warmColor} from '../helpers/colors'
import '../App.css';

function JournalEntry(props) {

    return (
        <Card>
            <RightSection>
                <Header>{moment(props.journalEntry.created_at).format('MMMM Do, YYYY')}</Header>
                <Para>
                    <ClampLines
                        text={props.journalEntry.content}
                        lines={10}
                        ellipsis="..."
                        moreText="More"
                        lessText="Less"
                        innerElement="p"
                        />
                </Para>
            </RightSection>
            <LeftSection>
                <ScoreSection backgroundColor={props.journalEntry.sentiment >= 0? coolColor : warmColor}>
                    <Para2>Mood Score</Para2>
                    <Score><strong>{props.journalEntry.sentiment.toFixed(5)}</strong></Score>
                </ScoreSection>
            </LeftSection>
        </Card>
    )
    
}

const Header = styled.h3`
    font-size: 30px;
    margin: 0;
    width: 100%;
    padding-bottom: 20px;
`

const Score = styled.div`
    font-size: 40px;
    margin: 0;
    position: absolute;
`

const Para = styled.p`
    font-size: 14px;
    margin: 0;
    text-align: justify;
`
const Para2 = styled.p`
    font-size: 14px;
    flex: 1;
    text-align: center;
    margin: 0;
    margin-bottom: 70px;
`

const RightSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 65%;
    min-width: 250px;
    padding-left: 40px;
`
const ScoreSection = styled.section`
    background-color: ${props => props.backgroundColor};
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    min-width: 190px;
    height: 100%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 30px;
`

const LeftSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    width: 35%;
    justify-content: center;
    align-content: center;
    
`

const Card = styled.section`
    display: flex;
    flex-direction: row-reverse;
    padding: 40px;
    width: 70vw;
    margin-left: 30px;
    margin: 20px;
    background-color: white;
    border-radius: 5px;
    min-width: 600px;
`

export default JournalEntry