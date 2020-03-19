import React from 'react';
import styled from 'styled-components'
import moment from 'moment'
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import _ from 'lodash';

function Graph(props) {

    const myJournalEntryData = []
    props.myJournalEntries.forEach(journalEntry => {
        const dataObject = {mySentiment: journalEntry.sentiment, time: Date.parse(journalEntry.created_at), formatted_time: moment(Date.parse(journalEntry.created_at)).format('M/D/YY') }
        myJournalEntryData.push(dataObject)
    })

    // Accumulate the sentiments that were on the same day into an array of sentiments per date
    const allJournalEntryData = []
    props.allJournalEntries.forEach(journalEntry => {
        if (allJournalEntryData.some(journalEntryDataObject => {
            return journalEntryDataObject.time && journalEntryDataObject.formatted_time === moment(Date.parse(journalEntry.created_at)).format('M/D/YY')
        })) {
            const journalEntryDataObject = allJournalEntryData.find(journalEntryData => journalEntryData.formatted_time && journalEntryData.formatted_time === moment(Date.parse(journalEntry.created_at)).format('M/D/YY'))
            journalEntryDataObject.allSentiment.push(journalEntry.sentiment)
        } else {
            const dataObject = {allSentiment: [journalEntry.sentiment], time: Date.parse(journalEntry.created_at), formatted_time: moment(Date.parse(journalEntry.created_at)).format('M/D/YY') }
            allJournalEntryData.push(dataObject)
        }
    })

    // reduce the sentiment array for each date into an average
    const reducedAllJournalEntryData = allJournalEntryData.map(journalEntry => {
        journalEntry.allSentiment = journalEntry.allSentiment.reduce((a, b) => (a + b)) / journalEntry.allSentiment.length
        return journalEntry
    })

    const data = myJournalEntryData.concat(reducedAllJournalEntryData)

    
    const result = _(data)
    .groupBy('formatted_time')
    .map(_.spread(_.assign))
    .value()
    
    // add in null for missing data
    const parsedResult = result.map(journalEntryDataObject => {
        if (!journalEntryDataObject.mySentiment) {
            journalEntryDataObject.mySentiment = null
        }
        return journalEntryDataObject
    })

    console.log(parsedResult)

    const allData = parsedResult.sort((journalEntry1, journalEntry2) => journalEntry2.time - journalEntry1.time)

    return (
        <Wrapper>
            <LineChart 
                width={500} 
                height={350} 
                margin={{bottom: 35, right: 10}}
                data={allData}>
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="mySentiment" stroke="#88498F" />
                <Line type="monotone" dataKey="allSentiment" stroke="#4D9CA0" />
                <XAxis
                    dataKey="time"
                    name = 'Time'
                    type = 'number'
                    angle={-55}
                    textAnchor="end"
                    interval={0}
                    tickFormatter = {(unixTime) => moment(unixTime).format('M/D/YY')}
                    minTickGap = {0}
                    tickCount = {allData.length}
                    domain ={['dataMin', 'dataMax']}/>
                <YAxis name='Sentiment' />
            </LineChart>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    height: 50vw;
    outline: 1px solid green;
    padding-top: 50px;
`
export default Graph

// const myJournalEntries2 = [{"id":18,"content":"test1","zipcode":null,"sentiment":0.413056568845912,"magnitude":-0.8146495621597709,
// "journal_id":6,"created_at":"2020-03-16T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":19,"content":"test1","zipcode":null,"sentiment":0.38790124578633467,"magnitude":-0.7027293459262904,"journal_id":6, 
// "created_at":"2020-03-14T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":20,"content":"test1","zipcode":null,"sentiment":0.5679196231880461,"magnitude":0.3333697318880757,"journal_id":6,"created_at":"2020-03-13T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":21,"content":"test1","zipcode":null,"sentiment":-0.7304120552876403,"magnitude":0.09755326812305021,"journal_id":6,"created_at":"2020-03-12T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":22,"content":"test1","zipcode":null,"sentiment":-0.03227474144558484,"magnitude":-0.15758042261882932,"journal_id":6,"created_at":"2020-03-11T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":23,"content":"test1","zipcode":null,"sentiment":-0.4695777736999487,"magnitude":-0.5076187390514926,"journal_id":6,"created_at":"2020-03-09T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":24,"content":"test1","zipcode":null,"sentiment":0.8749460050722457,"magnitude":-0.9872780994005508,"journal_id":6,"created_at":"2020-03-08T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":25,"content":"test1","zipcode":null,"sentiment":-0.8026757315471589,"magnitude":-0.0032753680307011646,"journal_id":6,"created_at":"2020-03-06T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":26,"content":"test1","zipcode":null,"sentiment":-0.12891053666526942,"magnitude":-0.9810750924529315,"journal_id":6,"created_at":"2020-03-05T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":27,"content":"test1","zipcode":null,"sentiment":-0.6589273612175635,"magnitude":-0.3889435309876281,"journal_id":6,"created_at":"2020-03-04T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":28,"content":"test1","zipcode":null,"sentiment":0.7579784662676774,"magnitude":-0.3501007918898311,"journal_id":6,"created_at":"2020-03-02T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":29,"content":"test1","zipcode":null,"sentiment":-0.42970645077033387,"magnitude":-0.2349743424053392,"journal_id":6,"created_at":"2020-02-28T15:08:52.061Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":30,"content":"test1","zipcode":null,"sentiment":0.034473082303425606,"magnitude":0.3869002445343608,"journal_id":6,"created_at":"2020-02-27T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":31,"content":"test1","zipcode":null,"sentiment":-0.07051781704032822,"magnitude":0.9894679557711148,"journal_id":6,"created_at":"2020-02-23T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"}]

// const myJournalEntries = [{"id":18,"content":"test1","zipcode":null,"sentiment":0.413056568845912,"magnitude":-0.8146495621597709,
// "journal_id":6,"created_at":"2020-03-16T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":19,"content":"test1","zipcode":null,"sentiment":0.38790124578633467,"magnitude":-0.7027293459262904,"journal_id":6,
// "created_at":"2020-03-14T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"},
// {"id":20,"content":"test1","zipcode":null,"sentiment":0.5679196231880461,"magnitude":0.3333697318880757,"journal_id":6,"created_at":"2020-03-13T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"}, 
// {"id":30,"content":"test1","zipcode":null,"sentiment":0.034473082303425606,"magnitude":0.3869002445343608,"journal_id":6,"created_at":"2020-02-27T13:12:06.000Z","updated_at":"2020-03-16T13:12:06.000Z"}]
