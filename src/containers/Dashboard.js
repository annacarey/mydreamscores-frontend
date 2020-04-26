import React from 'react';
import {connect} from 'react-redux';
import MenuBar from '../components/MenuBar'
import Graph from '../components/Graph'
import {coolColor, warmColor, mediumColor} from '../helpers/colors'
import Divider from '@material-ui/core/Divider';
import {getJournalEntriesActionCreator, getMyJournalEntriesActionCreator} from '../actionCreators'
import styled from 'styled-components'
import moment from 'moment'
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getAllJournalEntries()
        if (this.props.user.id !== "") {
            this.props.getMyJournalEntries(this.props.user.id)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            console.log("component did update in dashboard")
            if (this.props.user.id !== "") {
                this.props.getMyJournalEntries(this.props.user.id)
            }
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
        console.log('region in dashboard')
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then((res) => res.json())
        .then(locationData => {
            return locationData["results"][0]["address_components"][2]["long_name"] 
        })
    }

    render() {
        console.log("in dashboard", this.props.currentJournalEntry)
        console.log(this.props.myJournalEntries)
        // Check to make sure user has journal entries loaded
        const myJournalEntriesLoaded = this.props.myJournalEntries.length !== 0

        //My Data
        // const lastJournalEntrySentiment = this.props.location.state? this.props.location.state.sentiment : "N/A"
        let lastJournalEntrySentiment = "N/A";
        if (this.props.user.id!=="") {
            lastJournalEntrySentiment = myJournalEntriesLoaded? this.props.myJournalEntries.slice(0)[0].sentiment.toFixed(5) : this.props.currentJournalEntry.sentiment.toFixed(5)
        }
        const myWeeklyJournalEntryAverage = this.props.user.id!==""? this.getAverage(this.props.myJournalEntries, "weekly") : "N/A"
        const myAllTimeJournalEntryAverage = this.props.user.id!==""? this.getAverage(this.props.myJournalEntries, "all time"): "N/A"

        //Global data
        const dailyJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "daily")
        const weeklyJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "weekly")
        const allTimeJournalEntryAverage = this.getAverage(this.props.allJournalEntries, "all time")
               
        //Location data 

        const myRegionJournalEntries = this.props.allJournalEntries.filter(journalEntry => journalEntry.region === this.props.user.region)

        const dailyRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "daily")
        const weeklyRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "weekly")
        const allTimeRegionJournalEntryAverage = this.getAverage(myRegionJournalEntries, "all time")
               
        return (    
            <Wrapper>
                <MenuBar/>
                <CardWrapper>
                    <Header><strong>Dream Dashboard</strong></Header>
                    <RowHeader>
                        <h1>My Mood</h1>
                        
                    </RowHeader>
                    <Divider style={{marginLeft: "30px", marginRight: "15%"}}/>
                    <Row>
                        <DataSection backgroundColor={coolColor}>
                            <DataHeader>Most Recent</DataHeader>
                            <DataBody>{lastJournalEntrySentiment}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor={coolColor}>
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{myWeeklyJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor={coolColor}>
                            <DataHeader>All-time Average</DataHeader>
                            <DataBody>{myAllTimeJournalEntryAverage}</DataBody>
                        </DataSection>
                    </Row>
                    <RowHeader>
                        <h1>Global Mood</h1>
                    </RowHeader>
                    <Divider style={{marginLeft: "30px", marginRight: "15%"}}/>
                    <Row >
                        <DataSection backgroundColor={mediumColor}>
                            <DataHeader>Daily Average</DataHeader>
                            <DataBody>{dailyJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor={mediumColor}>
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{weeklyJournalEntryAverage}  </DataBody>
                        </DataSection>
                        <DataSection backgroundColor={mediumColor}>
                            <DataHeader>All Time Average</DataHeader>
                            <DataBody>{allTimeJournalEntryAverage}</DataBody>
                        </DataSection>
                    </Row>
                    <RowHeader>
                        <h1>Regional Mood: {this.props.user.region}</h1>
                    </RowHeader>
                    <Divider style={{marginLeft: "30px", marginRight: "15%"}}/>
                    <Row >
                        <Divider />
                        <DataSection backgroundColor={warmColor}>
                            <DataHeader>Daily Average</DataHeader>
                            <DataBody>{dailyRegionJournalEntryAverage} </DataBody>
                        </DataSection>
                        <DataSection backgroundColor={warmColor}>
                            <DataHeader>Weekly Average</DataHeader>
                            <DataBody>{weeklyRegionJournalEntryAverage}</DataBody>
                        </DataSection>
                        <DataSection backgroundColor={warmColor}>
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
        user: state.user.currentUser,
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
    padding-left: 30px;
    padding-right: 15%;
`
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`

const RowHeader = styled.div`
    width: 70%;
    padding-left: 30px;
    padding-right: 15%;
    font-size: 20px
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
    padding-left: 30px;
    padding-right: 15%;
    display: flex;
`

const DataSection = styled.div`
    height: 150px;
    width: 225px;
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
    font-size: 12px;
    align-self: flex-end;
    flex: 1;
    text-align: center;
`  

const DataBody = styled.div`
    font-size: 30px;
    position: absolute;
`


// color palette: https://coolors.co/88498f-4d9ca0-ede9e3-ff6542-4f3e4d

//Map: 
// https://www.react-simple-maps.io/examples/usa-counties-choropleth-quantize/
// https://github.com/zcreativelabs/react-simple-maps/issues/41

// JS scale https://gist.github.com/fpillet/993002
// line chart with size for bubbles (uber Vis)
// https://uber.github.io/react-vis/documentation/series-reference/heatmap-series
// Line Mark example https://github.com/uber/react-vis/blob/master/showcase/plot/linemark-chart.js