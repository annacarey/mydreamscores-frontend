import React from 'react';
import {connect} from 'react-redux';
import UserSignup from '../components/UserSignup'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar'
import {coolColor, warmColor, mediumColor} from '../helpers/colors'

function SentimentView(props) {
    console.log(props)
    console.log(props.myJournalEntries)

    let sentiment = 0
    if (props.myJournalEntries!==[]) {
        sentiment = props.currentJournalEntry.sentiment ===0? props.myJournalEntries.slice(0)[0].sentiment : props.currentJournalEntry.sentiment
    }
    const markerColor = sentiment >=0? coolColor : warmColor

    const marks = [ {value: -1, label: 'Negative (-1)'}, {value: -0.8,},
        { value: -0.6,}, {value: -0.4}, {value: -0.2 }, {value: 0, label: 'Neutral (0)'},
        {value: 0.2},{value: 0.4 }, {value: 0.6}, {value: 0.8}, {value: 1, label: 'Positive (1)'}];
    
    const useStyles = makeStyles({
        root: {
            fontSize: 10,
            '&$disabled': {
              color: mediumColor
            },
        }, mark: {
            height: 5,
            color: 'white',
            width: 4,
            fontSize: 10
        }, markLabel: {
            color: 'black',
            fontSize: 10
        },rail: {
            height: 5,
            opacity: 1
        },thumb: {
            color: markerColor,
            backgroundColor: markerColor,
            '&$disabled': {
                height: 25,
                width: 25,
                marginTop: -12,
                marginLeft: -12,}
        },
        track: {
        
        },
          disabled: {},
    })

    function ValueLabelComponent(props) {
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
      }
      
      ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        open: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired,
      };

    
 const classes = useStyles();
 
    return (
        <Wrapper>

            {props.user.id !== "" && <MenuBar />}
            <Top>
                <Header><strong>Your Mood Score is <Num>{sentiment.toFixed(5)}</Num> with magnitude of <Num>{props.currentJournalEntry.magnitude.toFixed(5)}</Num>.</strong></Header>
                <br></br>
                <div style={{width: "500px"}}>
                    <Slider disabled
                        className='Slider'
                        ValueLabelComponent={ValueLabelComponent}
                        classes={{
                            root: classes.root, 
                            mark: classes.mark,
                            track: classes.track,
                            rail: classes.rail,
                            markLabel: classes.markLabel,
                            thumb: classes.thumb,
                            disabled: classes.disabled,
                        }}
                        step={0.1}
                        marks = {marks}
                        min={-1}
                        max={1}
                        defaultValue= {Number(sentiment.toFixed(5))}
                        valueLabelDisplay="on"
                    ></Slider>
                </div>
                <MoodPara>Mood is calculcated using <a  target="_blank" href="https://cloud.google.com/natural-language">Google's Natural Language API</a>, which uses machine learning to identify the prevailing emotional attitude within text. Your mood is expressed by a score between -1 (negative) and 1 (positive) and magnitude, which indicates the overall strength of emotion.</MoodPara>
            </Top>
            <Bottom>
                <BottomContentWrapper>
                    {props.user.id !== ""? <DashboardButton onClick={() => props.history.push("/dashboard", {sentiment})}>Continue to Dashboard</DashboardButton> : null}
                    <SignUpBlock display={props.user.id === ""}>
                        <Para>Our tool is most helpful when you can track your mood over time.<br/>To return and journal again, sign up for an account below:</Para>
                        <UserSignup sentiment={sentiment} />
                        <br/>
                        <Link to="/dashboard">Skip for now and view triends >></Link>
                    </SignUpBlock>
                </BottomContentWrapper>
            </Bottom>
        </Wrapper>
    )
    
}

const msp = state => {
    return {
        currentJournalEntry: state.journal.currentJournalEntry,
        user: state.user.currentUser,
        myJournalEntries: state.journal.myJournalEntries
    }
}

export default connect(msp)(SentimentView)


const DashboardButton = styled.button`
    padding: 10px;
    width: 180px;
    align-self: center;
    border-radius: 10px;
    border-style: none;
    font-size: 12px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`
const Wrapper = styled.section` 
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
`

const Top = styled.section`
    width: 90%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
`

const Para = styled.p` 
    margin-top: 20px;
`

const MoodPara = styled.p` 
    margin-top: 30px;
    margin-bottom: 40px;
    width: 70%;
    text-align: center;
`

const Num = styled.span`
    color: black;
`

const Header = styled.h3`
    font-size: 25px;
    color: grey;
    text-align: center
`

const BottomContentWrapper = styled.section` 
    width: 50%;
    display: flex;
    flex-direction: column;
`
const Bottom = styled.div` 
    background-color: #F3F3F3;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding-bottom: 30px;
`

const SignUpBlock = styled.div`
    display: ${props => props.display ? "initial" : "none"};
`