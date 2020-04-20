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

function SentimentView(props) {

    const marks = [ {value: -1, label: 'Negative (-1)'}, {value: -0.8,},
        { value: -0.6,}, {value: -0.4}, {value: -0.2 }, {value: 0, label: 'Neutral (0)'},
        {value: 0.2},{value: 0.4 }, {value: 0.6}, {value: 0.8}, {value: 1, label: 'Positive (1)'}];
    
    const useStyles = makeStyles({
        root: {
            '&$disabled': {
              color: 'black'
            },
        }, mark: {
            height: 7,
            color: 'white',
            width: 5
        }, markLabel: {
            color: 'black',
        },rail: {
            height: 7,
            opacity: 1
        },thumb: {
            color: 'black',
            backgroundColor: 'black',
            '&$disabled': {
                height: 30,
                width: 30,
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
 
 const sentiment = props.currentJournalEntry.sentiment

    return (
        <Wrapper>

            {props.user.id !== "" && <MenuBar />}
            <Top>
                <Header><strong>Your Sentiment Score is <Num>{sentiment.toFixed(5)}</Num> with magnitude of <Num>{props.currentJournalEntry.magnitude.toFixed(5)}</Num>.</strong></Header>
                <br></br>
                <div style={{width: "600px"}}>
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
                
            </Top>
            <Bottom>
                <BottomContentWrapper>
                    <Para>For more info on the sentiment analysis, go to  <a href="https://cloud.google.com/natural-language">Google's Cloud Natural Language API.</a> </Para>
                    {props.user.id !== ""? <DashboardButton onClick={() => props.history.push("/dashboard", {sentiment})}>Continue to Dashboard</DashboardButton> : null}
                    <SignUpBlock display={props.user.id === ""}>
                        <Para>Our tool is most helpful when you can track your sentiment over time.<br/>To return and journal again, sign up for an account below:</Para>
                        <UserSignup sentiment={sentiment} zipcode={props.zipcode}/>
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
        user: state.user.currentUser
    }
}

export default connect(msp)(SentimentView)


const DashboardButton = styled.button`
    padding: 10px;
    width: 220px;
    align-self: center;
    border-radius: 10px;
    border-style: none;
    font-size: 16px;
    margin: 10px 10px 10px 0px;
    background-color: black;
    color: white;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`
const Wrapper = styled.section` 
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: 16px;
`

const Top = styled.section`
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Para = styled.p` 
    margin-top: 50px;
`

const Num = styled.span`
    color: black;
`

const Header = styled.h3`
    font-size: 30px;
    color: grey;
`

const BottomContentWrapper = styled.section` 
    width: 50%;
    display: flex;
    flex-direction: column;
`
const Bottom = styled.div` 
    height: 66%;
    background-color: #F3F3F3;
    width: 100%;
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