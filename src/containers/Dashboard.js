import React from 'react';
import {connect} from 'react-redux';
import MenuBar from '../components/MenuBar'
import Graph from '../components/Graph'
import Divider from '@material-ui/core/Divider';
import {getJournalEntriesActionCreator, getMyJournalEntriesActionCreator} from '../actionCreators'
import styled from 'styled-components'
import moment from 'moment'
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {

    componentDidMount() {

        this.props.getAllJournalEntries()

        if (this.props.currentUser.id !== "") {
            this.props.getMyJournalEntries(this.props.currentUser.id)
        }

    }

    getAverage = (journalEntries, type) => {
        const today = new Date()
        const oneWeekAgo = today.setDate(today.getDate() - 7)
        let totalJournalEntries = journalEntries
        switch(type) {
            case "weekly":
                totalJournalEntries = journalEntries.filter(journalEntry => {
                    return Date.parse(new Date(journalEntry.created_at)) >= oneWeekAgo
                })
                break;
            case "daily":
                totalJournalEntries = journalEntries.filter(journalEntry => {
                    return moment(new Date(journalEntry.created_at)).format('MM/DD/YY') === moment(new Date()).format('MM/DD/YY')
                })
                break;
            case "all time":
                totalJournalEntries = journalEntries
                break;
        }
        return totalJournalEntries.reduce((sum,journalEntry2) =>  {
            return sum + journalEntry2.sentiment / totalJournalEntries.length
        }, 0).toFixed(5)
    }

    getRegion = (zipcode) =>{
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then((res) => res.json())
        .then(locationData => {
            return locationData["results"][0]["address_components"][2]["long_name"] 
        })
    }

    render() { 
        // Check to make sure user has journal entries loaded
        const myJournalEntriesLoaded = this.props.myJournalEntries.length !== 0

        //My Data
        // const lastJournalEntrySentiment = this.props.location.state? this.props.location.state.sentiment : "N/A"
        let lastJournalEntrySentiment = "N/A";
        if (this.props.currentUser.id!=="") {
            lastJournalEntrySentiment = myJournalEntriesLoaded? this.props.myJournalEntries.slice(0)[0].sentiment.toFixed(5) : this.props.currentJournalEntry.sentiment.toFixed(5)
        }
        const myWeeklyJournalEntryAverage = this.props.currentUser.id!==""? this.getAverage(this.props.myJournalEntries, "weekly") : "N/A"
        const myAllTimeJournalEntryAverage = this.props.currentUser.id!==""? this.getAverage(this.props.myJournalEntries, "all time"): "N/A"

        //Global data
        const dailyJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "daily")
        const weeklyJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "weekly")
        const allTimeJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "all time")
               
        //Location data 

        const myRegionJournalEntries = this.props.allJournalEntries.filter(journalEntry => this.getRegion(journalEntry.zipcode).then(region => region === this.props.region))

        const dailyRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "daily")
        const weeklyRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "weekly")
        const allTimeRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "all time")
               
        return (    
            <Wrapper>
                <MenuBar/>
                <CardWrapper>
                    <ButtonWrapper>
                        <JournalButton onClick={() => this.props.history.push("/journal", { return: true })}><strong>Go To Daily Journal</strong></JournalButton>
                        <HistoryButton onClick = {() => this.props.history.push("/history")}><strong>View History</strong></HistoryButton>
                        <LogoutButton onClick={() => this.props.history.push("/")}><strong>Logout</strong></LogoutButton>
                    </ButtonWrapper>
                    <Header><strong>Your Sentiment Dashboard</strong></Header>
                    <RowHeader>
                        <h1>My Sentiment</h1>
                        
                    </RowHeader>
                    <Divider style={{marginLeft: "15%", marginRight: "15%"}}/>
                    <Row>
                        <DataSection backgroundColor="#4B9EA5">
                            <DataHeader>Most Recent</DataHeader>
                            <DataBody>{lastJournalEntrySentiment}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#4B9EA5">
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{myWeeklyJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#4B9EA5">
                            <DataHeader>All-time Average</DataHeader>
                            <DataBody>{myAllTimeJournalEntryAverage}</DataBody>
                        </DataSection>
                    </Row>
                    <RowHeader>
                        <h1>Global Sentiment</h1>
                    </RowHeader>
                    <Divider style={{marginLeft: "15%", marginRight: "15%"}}/>
                    <Row >
                        <DataSection backgroundColor="#95CCD9">
                            <DataHeader>Daily Average</DataHeader>
                            <DataBody>{dailyJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#95CCD9">
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{weeklyJournalEntryAverage}  </DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#95CCD9">
                            <DataHeader>All Time Average</DataHeader>
                            <DataBody>{allTimeJournalEntryAverage}</DataBody>
                        </DataSection>
                    </Row>
                    <RowHeader>
                        <h1>Regional Sentiment: {this.props.region}</h1>
                    </RowHeader>
                    <Divider style={{marginLeft: "15%", marginRight: "15%"}}/>
                    <Row >
                        <Divider />
                        <DataSection backgroundColor="#F0C1AA">
                            <DataHeader>Daily Average</DataHeader>
                            <DataBody>{dailyRegionJournalEntryAverage} </DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#F0C1AA">
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{weeklyRegionJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor="#F0C1AA">
                            <DataHeader>All-time Average</DataHeader>
                            <DataBody>{allTimeRegionJournalEntryAverage} </DataBody>
                        </DataSection>
                    </Row>
                    {/* <Graph allJournalEntries={this.state.allJournalEntries} myJournalEntries={this.state.myJournalEntries}>text</Graph> */}
                </CardWrapper>
            </Wrapper>
        )
    }
}

const msp = state => {
    return {
        currentUser: state.user.currentUser,
        region: state.user.region,
        currentJournalEntry: state.journal.currentJournalEntry,
        myJournalEntries: state.journal.myJournalEntries,
        allJournalEntries: state.journal.allJournalEntries
    }
}

const mdp = dispatch => {
    return {
        getMyJournalEntries: userId => dispatch(getMyJournalEntriesActionCreator(userId)),
        getAllJournalEntries: () => dispatch(getJournalEntriesActionCreator())
    }
}

export default withRouter(connect(msp, mdp)(Dashboard))

const Header = styled.h1`
    font-size: 30px;
    width: 70%;
    padding-left: 15%;
    padding-right: 15%;
`
const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
`

const RowHeader = styled.div`
    width: 70%;
    padding-left: 15%;
    padding-right: 15%;
`

const CardWrapper = styled.section`
    position: relative;
    top: 20px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
`

const Row = styled.section`
    width: 70%;
    padding-left: 15%;
    padding-right: 15%;
    display: flex;
`

const DataSection = styled.div`
    height: 200px;
    width: 300px;
    flex-shrink: 0;
    background-color: ${props => props.backgroundColor};
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    margin: 20px 20px 20px 10px;
`

const DataHeader = styled.div`
    font-size: 20px;
    align-self: flex-end;
    flex: 1;
    text-align: center;
`  

const DataBody = styled.div`
    font-size: 40px;
    position: absolute;
`

const ButtonWrapper = styled.section`
    margin-top: 10px;
    top: 10px;
    margin-right: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end
`
const JournalButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin: 10px 10px 10px 0px;
    color: black;
    background-color: white;
    border-style: none;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`

const HistoryButton = styled.button`
    padding: 10px;
    font-size: 16px;
    margin: 10px 10px 10px 0px;
    color: black;
    background-color: white;
    border-style: none;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`

const LogoutButton = styled.button`
    padding: 10px;
    width: 130px;
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


// color palette: https://coolors.co/88498f-4d9ca0-ede9e3-ff6542-4f3e4d

//Map: 
// https://www.react-simple-maps.io/examples/usa-counties-choropleth-quantize/
// https://github.com/zcreativelabs/react-simple-maps/issues/41

// JS scale https://gist.github.com/fpillet/993002
// line chart with size for bubbles (uber Vis)
// https://uber.github.io/react-vis/documentation/series-reference/heatmap-series
// Line Mark example https://github.com/uber/react-vis/blob/master/showcase/plot/linemark-chart.js