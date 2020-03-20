import React from 'react';
import {connect} from 'react-redux';
import UserSignup from '../components/UserSignup'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { IgrLinearGaugeModule } from 'igniteui-react-gauges';
import { IgrLinearGauge } from 'igniteui-react-gauges';


function SentimentView(props) {
    return (
        <Wrapper>
            <p>Your Sentiment Score is <strong>{props.currentJournalEntry.sentiment}</strong> with magnitude of <strong>{props.currentJournalEntry.magnitude}</strong> .</p>
            <IgrLinearGauge width="700px"
                   height="30px"
                   minimumValue = {5}
                   maximumValue = {55}
                   value = {43}>
                <IgrLinearGraphRange startValue={0}
                                    endValue={15}
                                    brush="red"/>
                <IgrLinearGraphRange startValue={15}
                                    endValue={30}
                                    brush="yellow"/>
                <IgrLinearGraphRange startValue={30}
                                    endValue={55}
                                    brush="green"/>
            </IgrLinearGauge>
            <p>Sentiment is cacluclated with <a href="https://cloud.google.com/natural-language">Google's Cloud Natural Language API.</a></p>
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

//linear gauge component:
// https://www.infragistics.com/products/ignite-ui-react/react/components/linear-gauge.html