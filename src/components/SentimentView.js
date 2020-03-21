import React from 'react';
import {connect} from 'react-redux';
import UserSignup from '../components/UserSignup'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';


function SentimentView(props) {

    const marks = [ {value: -1, label: '-1 (negative)'}, {value: -0.8,},
        { value: -0.6,}, {value: -0.4}, {value: -0.2 }, {value: 0, label: '0 (neutral)'},
        {value: 0.2},{value: 0.4 }, {value: 0.6}, {value: 0.8}, {value: 1, label: '1 (positive)'}];
    
    const useStyles = makeStyles({
        root: {
            '&$disabled': {
              color: 'black'
            },
        },
        mark: {
            height: 7,
            color: 'white',
            width: 5
        }, 
        markLabel: {
            color: 'black',
        },
        rail: {
            height: 7,
            opacity: 1
        },
        thumb: {
            color: 'black',
            backgroundColor: 'black',
            '&$disabled': {
                height: 30,
                width: 30,
                marginTop: -12,
                marginLeft: -12,
            }
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
            <p>Your Sentiment Score is <strong>{props.currentJournalEntry.sentiment}</strong> with magnitude of <strong>{props.currentJournalEntry.magnitude}</strong> .</p>
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
                    defaultValue= {props.currentJournalEntry.sentiment}
                    valueLabelDisplay="on"
                ></Slider>
            </div>
            <p>For more info on the sentiment analysis, go to  <a href="https://cloud.google.com/natural-language">Google's Cloud Natural Language API.</a> </p>
            <p>Our tool is most helpful when you can track your sentiment over time. To return and journal again, sign up for an account below:</p>
            <UserSignup zipcode={props.zipcode}/>
            <br/>
            <Link to="/dashboard">Skip for now and view triends >></Link>
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

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 20px;
`

// const Line = styled.section` 
//     width: 800px;
//     height: 10px;
//     border-radius: 5px;
//     background-color: blue;
//     display: flex;
//     justify-content: space-between;
// `

// const Dot = styled.section`
//     width: 3px;
//     height: 40px;
//     background-color: black;
//     display: flex;
//     align-items: flex-end;
//     font-size: 10px;
// ` <Line>
// <Dot>-1.0</Dot>
// <Dot>-0.9</Dot>
// <Dot>-0.8</Dot>
// <Dot>-0.7</Dot> 
// <Dot>-0.6</Dot>
// <Dot>-0.5</Dot> 
// <Dot>-0.4</Dot> 
// <Dot>-0.3</Dot> 
// <Dot>-0.2</Dot> 
// <Dot>-0.1</Dot> 
// <Dot>0</Dot> 
// <Dot>0.1</Dot> 
// <Dot>0.2</Dot> 
// <Dot>0.3</Dot>
// <Dot>0.4</Dot>
// <Dot>0.5</Dot>  
// <Dot>  0.6</Dot> 
// <Dot>  0.7</Dot> 
// <Dot>  0.8</Dot> 
// <Dot>  0.9</Dot> 
// <Dot>1.0</Dot> 
// </Line>
