import React from 'react';
import UserLogin from '../components/UserLogin'
import Dashboard from './Dashboard'
import Welcome from '../components/Welcome'
import Journal from '../components/Journal'
import History from '../components/History'
import SentimentView from '../components/SentimentView'
import styled from 'styled-components'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {getRegionActionCreator} from '../actionCreators'

class UserContainer extends React.Component {

    render() {
        return (
            <Wrapper>
                <Switch>
                    <Route exact path ="/" render={ (props) => <Welcome {...props} /> } /> 
                    <Route exact path='/login' render={ () =><UserLogin /> } />
                    <Route exact path = '/dashboard' render={ (props) =><Dashboard {...props} /> }  />
                    <Route exact path='/journal' render={(props) => <Journal {...props}/>} />
                    <Route exact path = '/sentiment' render={ (props) =><SentimentView  {...props} /> }  />
                    <Route exact path = '/history' render={ (props) =><History {...props} /> }  />
                </Switch>
            </Wrapper>
        )
    }
}

const mdp = dispatch => {
    return {
        getRegion: zipcode => dispatch(getRegionActionCreator(zipcode))
    }
}

export default connect(null, mdp)(UserContainer)

const Wrapper = styled.section`
    height: 100%;
    width: 100%;
`